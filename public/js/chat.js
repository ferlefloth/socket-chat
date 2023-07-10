

let usuario = null;
let socket  = null;
//Referencias HTML

const txtUid=document.querySelector("#txtUid");
const txtMensaje=document.querySelector("#txtMensaje");
const ulUsuarios=document.querySelector("#ulUsuarios");
const ulMensajes=document.querySelector("#ulMensajes");
const btnSalir=document.querySelector("#btnSalir");


const  validarJWT = async ()=>{

    const token = localStorage.getItem('token') || "";

    if( token.length <= 10 ){
        window.location = 'index.html'
        throw new Error("No hay token en el servidor")
    }
    
    const res = await fetch('http://localhost:8080/api/auth',{
        headers: {'x-token': token}
    });

    const { usuario: userDb, token: tokenDb} = await res.json()
    //console.log(userDb, tokenDb)
    localStorage.setItem('token', tokenDb);
    usuario = userDb

    document.title = usuario.nombre

    await conectarSocket()
}   

const conectarSocket = async ()=>{
    
    socket = io({
        'extraHeaders':{
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect',()=>{
        console.log('Sockets online')
    })

    socket.on('disconnect',(payload)=>{
        console.log('usuarios desconectados '+ payload)
    })

    socket.on('recibir-mensajes', dibujarMensajes ) //mando la función 

    socket.on('usuarios-activos', (payload)=>{
         dibujarUsuarios(payload)
    })

    socket.on('mensaje-privado', ()=>{
        //TODO
    })
}

const dibujarUsuarios = (usuarios = [])=>{

    let usersHtml = ''
    usuarios.forEach(({nombre, uid}) =>{
        usersHtml += `
        <li>
            <p>
                <h5 class="text-success">${ nombre }</h5>
                <span class="fs-6 text-muted">${ uid }</span>
            </p>
        </li>
        
        `
    })
    ulUsuarios.innerHTML = usersHtml
}

const dibujarMensajes = (mensajes = [])=>{

    let mensajesHtml = ''
    mensajes.forEach(({nombre, mensaje}) =>{
        mensajesHtml += `
        <li>
            <p>
                <span class="text-primary">${ nombre }</span>
                <span>${ mensaje }</span>
            </p>
        </li>
        
        `
    })
    ulMensajes.innerHTML = mensajesHtml

}

txtMensaje.addEventListener( 'keyup' , ( ev ) => { //keyCode es un valor que viene en el evento del botón. Determina cual fue la técla que se presionó
        const keyCode = ev.keyCode;
        const mensaje = txtMensaje.value
        const uid = txtUid.value

        if( keyCode !== 13 ){ return; }
        if (mensaje.length === 0 ){ return; }

        socket.emit('enviar-mensaje', {mensaje,uid}) //es buena práctica enviar un objeto, para poder handlear en el futuro otros posibles datos a enviar al back
        txtMensaje.value= ''
})


const main = async ()=>{

    await validarJWT();



}

main();

