import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';

const app = new Elysia();
const prisma = new PrismaClient();

// Definición de las interfaces para los tipos de datos esperados
interface RegistrarUsuario {
    nombre: string;
    correo: string;
    clave: string;
    descripcion?: string;
}

interface BloquearUsuario {
    correo: string;
    clave: string;
    correo_bloquear: string;
}

interface MarcarCorreo {
    correo: string;
    clave: string;
    id_correo_favorito: number;
}

interface DesmarcarCorreo {
    correo: string;
    clave: string;
    id_correo_favorito: number;
}

interface LoginRequestBody {
    correo: string;
    clave: string;
}

interface VerFavoritos {
    correo: string;
    clave: string;
}

interface EnviarCorreo {
    correo: string;
    clave: string;
    destinatario: string;
    asunto: string;
    mensaje: string;
}   

//Comprobar si esta abierto el puerto
app.get('/', () => {
    return 'PUERTO ABIERTO PELAO';
});

//Endpoint de registro
app.post('/api/registrar', async ({ body }) => { //Ruta HTTP POST para /api/registrar y acceder al 'body' de la solicitud
    const { nombre, correo, clave, descripcion } = body as RegistrarUsuario; //Extraer los campos de la solicitud a nuestra interfaz
    const usuario = await prisma.usuario.create({ //Nuevo registro en nuestra tabla Usuario
    data: { nombre, correo, clave, descripcion }}); 
    return { estado: 200, mensaje: 'Usuario registrado correctamente' }; //Operacion exitosa
});

//Endpoint de bloqueo
app.post('/api/bloquear', async ({ body }) => {
    const { correo, clave, correo_bloquear } = body as BloquearUsuario;
    try {
        // Verificar las credenciales del "Administrador"
        const usuario = await prisma.usuario.findUnique({where:{correo: correo},});
        if (!usuario || usuario.clave !== clave) {
            return {
                status: 400,
                json: { mensaje: 'Credenciales incorrectas' }
            };
        }

        // Verificar si el usuario que vamos a bloquear existe
        const usuarioBloquear = await prisma.usuario.findUnique({where:{correo: correo_bloquear},});
        if (!usuarioBloquear) {
            return {
                status: 400,
                json: { mensaje: 'El usuario a bloquear no existe' }
            };
        }

        // Bloquear al usuario y actualizarlo en la tabla
        await prisma.usuario.update({where:{correo:correo_bloquear},data:{bloqueado: true}});
        return {
            status: 200,
            json: { mensaje: 'Usuario bloqueado correctamente' }
        };

        //Catch ante cualquier otro error Ya que esta peticion solo se puede haacer desde administrador
    } catch (error) {
        console.error('Error bloqueando al usuario:', error);
        return {
            status: 500,
            json: { mensaje: 'Error del servidor' }
        };
    }
});

//Endpoint de marcar fav
app.post('/api/marcarcorreo', async ({ body }) => {
    // Verificar las credenciales del usuario
    const { correo, clave, id_correo_favorito } = body as { correo: string; clave: string; id_correo_favorito: number };
    const usuario = await prisma.usuario.findUnique({where:{correo:correo}});

    if (usuario && usuario.clave === clave) { //Buscar correo especifico del usuario
        const correoFavorito = await prisma.correo.findUnique({
            where: {
                id_usuarioId: {
                    id: id_correo_favorito,
                    usuarioId: usuario.id
                }
            }
        });

        if (correoFavorito) { //Actualiza el correo como favorito en la tabla CORREO
            await prisma.correo.update({
                where: {
                    id_usuarioId: {
                        id: id_correo_favorito,
                        usuarioId: usuario.id
                    }
                },
                data: {
                    favorito: true
                }
            });
            return { estado: 200, mensaje: 'Correo marcado como favorito' }; //Manejo de errores 
        } else {
            return { estado: 404, mensaje: 'Correo no encontrado' };
        }
    } else {
        return { estado: 400, mensaje: 'Credenciales incorrectas' };
    }
});

//Endpoint de desmarcar fav
app.delete('/api/desmarcarcorreo', async ({ body }) => {
    const { correo, clave, id_correo_favorito } = body as DesmarcarCorreo;

    try {
        // Verificar las credenciales
        const usuario = await prisma.usuario.findUnique({where:{correo:correo},});

        if (!usuario || usuario.clave !== clave) {
            return {
                status: 400,
                json: { mensaje: 'Credenciales incorrectas' }
            };
        }

        // Verificar que el correo a desmarcar pertenece al usuario
        const correoFavorito = await prisma.correo.findUnique({
            where: {
                id_usuarioId: {
                    id: id_correo_favorito,
                    usuarioId: usuario.id
                }
            }
        });

        if (!correoFavorito) {
            return {
                status: 400,
                json: { mensaje: 'El correo no existe o no pertenece al usuario' }
            };
        }

        // Desmarcar el correo como favorito
        const correoActualizado = await prisma.correo.update({
            where: {
                id_usuarioId: {
                    id: id_correo_favorito,
                    usuarioId: usuario.id
                }
            },
            data: { favorito: false }
        });
        //Manejo de errores
        return {
            status: 200,
            json: { mensaje: 'Correo desmarcado como favorito', correo: correoActualizado }
        };
    } catch (error) {
        console.error('Error desmarcando el correo:', error);
        return {
            status: 500,
            json: { mensaje: 'Error del servidor' }
        };
    }
});

//Endpoint de ver favoritos
app.get('/api/favoritos', async ({ query }) => {
    const { correo, clave } = query as unknown as VerFavoritos;

    try {
        // Verificar las credenciales
        const usuario = await prisma.usuario.findUnique({
            where: { correo: correo },
        });

        if (!usuario || usuario.clave !== clave) {
            return {
                estado: 400,
                mensaje: 'Credenciales incorrectas',
            };
        }

        // Obtener correos favoritos
        const favoritos = await prisma.correo.findMany({
            where: {
                usuarioId: usuario.id,
                favorito: true
            }
        });

        if (favoritos.length === 0) {
            return {
                estado: 200,
                mensaje: 'No hay correos favoritos'
            };
        }
        //Manejo de rrores
        return {
            estado: 200,
            favoritos: favoritos
        };
    } catch (error) {
        return {
            estado: 500,
            mensaje: 'Error del servidor',
        };
    }
});

//ingreso de usuario
app.post('/api/login', async ({ body }) => {
    const { correo, clave } = body as LoginRequestBody;

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { correo: correo },
        });

        if (usuario && usuario.clave === clave) {
            return {
                estado: 200,
                mensaje: 'Credenciales correctas',
            };
        } else {
            return {
                estado: 400,
                mensaje: 'Credenciales incorrectas',
            };
        }
    } catch (error) {
        return {
            estado: 500,
            mensaje: 'Error del servidor',
        };
    }
});

app.post('/api/enviarcorreo', async ({ body }) => {
    const { correo, clave, destinatario, asunto, mensaje } = body as EnviarCorreo;

    try {
        // Verificar las credenciales del remitente
        const usuario = await prisma.usuario.findUnique({
            where: { correo: correo },
        });

        if (!usuario || usuario.clave !== clave) {
            return {
                status: 400,
                json: { mensaje: 'Credenciales incorrectas' }
            };
        }

        // Verificar si el remitente está bloqueado
        if (usuario.bloqueado) {
            return {
                status: 403,
                json: { mensaje: 'Usuario bloqueado. No puede enviar correos.' }
            };
        }

        // Verificar que el destinatario existe
        const destinatarioUsuario = await prisma.usuario.findUnique({
            where: { correo: destinatario },
        });

        if (!destinatarioUsuario) {
            return {
                status: 400,
                json: { mensaje: 'El destinatario no existe' }
            };
        }

        // Crear el correo con el usuarioId del destinatario
        const nuevoCorreo = await prisma.correo.create({
            data: {
                id: await prisma.correo.count({ where: { usuarioId: destinatarioUsuario.id } }) + 1,
                usuarioId: destinatarioUsuario.id, // ID del destinatario
                asunto,
                contenido: mensaje,
                favorito: false,
            },
        });

        return {
            status: 200,
            json: { mensaje: 'Correo enviado correctamente', correo: nuevoCorreo }
        };
    } catch (error) {
        console.error('Error enviando el correo:', error);
        return {
            status: 500,
            json: { mensaje: 'Error del servidor' }
        };
    }
});

// Iniciar serv
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});