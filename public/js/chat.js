

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

    socket.on('recibir-mensajes', ()=>{
        //TODO
    })

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

const main = async ()=>{

    await validarJWT();



}

main();

