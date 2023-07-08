

let usuario = null;
let socket  = null;

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
}   


const main = async ()=>{

    await validarJWT();



}

main();

