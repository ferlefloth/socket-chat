const miFormulario = document.querySelector("form")
miFormulario.addEventListener("submit",env=>{

    env.preventDefault()
    const formData = {}

    for(let el of miFormulario.elements){
        if(el.name.length > 0 ){
            formData[el.name] = el.value
        }
    }

    fetch("http://localhost:8080/api/auth/login",{
        method: 'POST',
        body: JSON.stringify(formData),
        headers:{ 'Content-Type': 'application/json'}
    }).then(res =>res.json())
    .then(({msg, token}) => {
        
        if(msg){
            return console.error(msg)
        }
        console.log('todo OK ')
        localStorage.setItem('token',token)
    })
    .catch(err => {
        console.log('el error es: ' + err)
    })
    console.log(formData)
})


function handleCredentialResponse(response) {
    // console.log('TODO EL RESPONSE ES: ' + JSON.stringify(response))
     const body= {id_token: response.credential}

     //token: id_token
    //console.log('id_token:' + response.credential);
       
    fetch('http://localhost:8080/api/auth/google',{
         method:'POST',
         headers:{
             'Content-Type':'application/json'
         },
         body: JSON.stringify(body)
     })
         .then(res => res.json())
         .then(({token}) => {
            
           localStorage.setItem('token',token) //  se guarda el token en el local storage
         })
         .catch(err => {console.log('el error es: ' + JSON.stringify(err))})
 }

 const button = document.getElementById('google_signout')
 button.onclick= ()=>{
     console.log(google.accounts.id)
     google.accounts.id.disableAutoSelect()

     google.accounts.id.revoke(localStorage.getItem('token'),done=>{
         localStorage.clear();
         location.reload();
     })

 }