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




// Ruta main
app.get('/', () => {
    return 'Hello, World!';
});

// EP registro
app.post('/api/registrar', async ({ body }) => {
    const { nombre, correo, clave, descripcion } = body as RegistrarUsuario;
    const usuario = await prisma.usuario.create({
    data: { nombre, correo, clave, descripcion }
    });
    return { estado: 200, mensaje: 'Usuario registrado correctamente' };
});

// EP bloqueo
app.post('/api/bloquear', async ({ body }) => {
    const { correo, clave, correo_bloquear } = body as BloquearUsuario;
    const usuario = await prisma.usuario.updateMany({
    where: { correo: correo_bloquear },
    data: { bloqueado: true }
    });
    return { estado: 200, mensaje: 'Usuario bloqueado correctamente' };
});
4
// EP info
app.get('/api/informacion/:correo', async ({ params }) => {
    console.log(`Buscando usuario con correo: ${params.correo}`); // Debugging

    const usuario = await prisma.usuario.findUnique({
        where: { correo: params.correo },
        select: { nombre: true, correo: true, descripcion: true }
    });

    console.log(`Resultado de la búsqueda: ${JSON.stringify(usuario)}`); // Debugging

    return usuario
        ? { estado: 200, ...usuario }
        : { estado: 400, mensaje: 'Usuario no encontrado' };
    });


// EP marcar fav
app.post('/api/marcarcorreo', async ({ body }) => {
    const { correo, clave, id_correo_favorito } = body as { correo: string; clave: string; id_correo_favorito: number };
    
    const usuario = await prisma.usuario.findUnique({
        where: { correo: correo }
    });

    if (usuario && usuario.clave === clave) {
        const correoFavorito = await prisma.correo.findUnique({
            where: {
                id_usuarioId: {
                    id: id_correo_favorito,
                    usuarioId: usuario.id
                }
            }
        });

        if (correoFavorito) {
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
            return { estado: 200, mensaje: 'Correo marcado como favorito' };
        } else {
            return { estado: 404, mensaje: 'Correo no encontrado' };
        }
    } else {
        return { estado: 400, mensaje: 'Credenciales incorrectas' };
    }
});


// EP desmarcar fav
app.delete('/api/desmarcarcorreo', async ({ body }) => {
    const { correo, clave, id_correo_favorito } = body as DesmarcarCorreo;
    const correoFavorito = await prisma.correo.update({
    where: { id: id_correo_favorito },
    data: { favorito: false }
    });
    return { estado: 200, mensaje: 'Correo desmarcado como favorito' };
});

//EP ver favoritos
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


// Iniciar serv
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});