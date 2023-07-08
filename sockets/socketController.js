const { Socket } = require('socket.io');
const { comprobarJWT } = require('../helpers');

const socketController = async (socket = new Socket())=>{ // Acá borrar la instancia del newSocket(), solo se usa para que el vscode pueda mostrarme las opciones de las funciones mientras codeo
    
    const token = socket.handshake.headers['x-token'];
    const usuario = await comprobarJWT(token)

    if(!usuario){
        return socket.disconnect();
    }
    console.log('Se conectó ', usuario.nombre)
}

module.exports ={
    socketController
}