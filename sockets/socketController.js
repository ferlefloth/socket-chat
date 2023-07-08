const { Socket } = require('socket.io')

const socketController = (socket = new Socket())=>{ // Acá borrar la instancia del newSocket(), solo se usa para que el vscode pueda mostrarme las opciones de las funciones mientras codeo
    
    console.log('cliente conectado', socket.id)

}

module.exports ={
    socketController
}