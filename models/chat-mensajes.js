
class ChatMensajes{

    constructor(){
        this.mensajes = []
        this.usuarios = {}
    }

    get ultimosDiez (){
        this.mensajes = this.mensajes.splice(0,10)
        return this.mensajes
    }

    get usuariosArr(){
        return Object.values( this.usuarios )
    }

    enviarMensaje( uid, nombre, mensaje){
        this.mensajes.unshift(new Mensaje(uid,nombre,mensaje) )
    }

    conectarUsuario(usuario){
        this.usuarios[usuario.id]= usuario
    }

    desconectarUsuario(id){
        delete this.usuarios[id]; // borra una propiedad el delete
    }
}
class Mensaje{
    constructor(uid,nombre,mensaje ){
        this.uid = uid;
        this.nombre = nombre;
        this.mensaje = mensaje;
    }
}

module.exports= ChatMensajes