const { Socket } = require('socket.io');
const { comprobarJWT } = require('../helpers');
const {ChatMensajes}= require('../models')

const chatMensajes = new ChatMensajes() // una vez que se levanta el servidor, como esta instancia de chat mensajes está en el socketController, se instancia por una única vez

const socketController = async (socket = new Socket(), io)=>{ // Acá borrar la instancia del newSocket(), solo se usa para que el vscode pueda mostrarme las opciones de las funciones mientras codeo
    
    const token = socket.handshake.headers['x-token'];
    const usuario = await comprobarJWT(token)

    if(!usuario){
        return socket.disconnect();
    }

    //Agregar el usuario conectado
    chatMensajes.conectarUsuario(usuario)
    
    io.emit('usuarios-activos',chatMensajes.usuariosArr) //el ío es para todos losqeu esten conectados
    socket.emit('recibir-mensajes', chatMensajes.ultimosDiez)
    
    socket.on('disconnect',()=>{
        chatMensajes.desconectarUsuario(usuario.id)
        io.emit('usuarios-activos',chatMensajes.usuariosArr)
    })

    socket.on('enviar-mensaje', ({uid, mensaje})=>{
        
        chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje)
        io.emit('recibir-mensajes', chatMensajes.ultimosDiez)
    })

}

module.exports ={
    socketController
}