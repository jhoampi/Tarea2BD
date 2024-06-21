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

// EP info
app.get('/api/informacion/:correo', async ({ params }) => {
    const usuario = await prisma.usuario.findUnique({
    where: { correo: params.correo },
    select: { nombre: true, correo: true, descripcion: true }
    });
    return usuario ? { estado: 200, ...usuario } : { estado: 400, mensaje: 'Usuario no encontrado' };
});

// EP marcar fav
app.post('/api/marcarcorreo', async ({ body }) => {
    const { correo, clave, id_correo_favorito } = body as MarcarCorreo;
    const correoFavorito = await prisma.correo.update({
    where: { id: id_correo_favorito },
    data: { favorito: true }
    });
    return { estado: 200, mensaje: 'Correo marcado como favorito' };
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

// Iniciar serv
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});