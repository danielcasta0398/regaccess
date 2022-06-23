const userObject = {
    users:[]
}

let UserObjLS= localStorage.getItem("UserObject");
let UserJSONParse=JSON.parse(UserObjLS);

if (!UserObjLS)
{
    localStorage.setItem("UserObject", JSON.stringify(userObject));
}


const login = (e) =>{
    e.preventDefault()
    const userId = document.getElementById('userId').value

    if (userObject.users.length == 0) {        
        alertLogin()
    }

    console.log(userId);
    
}

const register = () =>{
    document.querySelector('.login-form').innerHTML = `  
      <div class="register-form">
        <h3>Registrate</h3>
        
        <div>
            <label><i class="fa-solid fa-address-card"></i></label>
            <input 
                type="text"
                placeholder="Nombres"
                id="name"            
            >
        </div>       
        <div>
            <label><i class="fa-solid fa-address-card"></i></label>
            <input 
            type="text"
            placeholder="Apellidos"
            id="lastName"
            >          
        </div>  
        <div>
        <label><i class="fa-solid fa-envelope"></i></label>
         <input 
            type="email" 
            placeholder="Correo"
            id="email"
         >           
        </div> 
        <button onclick="registerInfo(event)">Registrarse</button>
        <p>¿Tienes un registro? <a onclick="register()">Iniciar Sesion</a></p>
      </div>    `
    console.log('register');
}


const registerInfo = (e) => {
    e.preventDefault()
    const user = {  
        userId: '',     
        name: '',
        lastName: '',
        email: '',
        horaEntrada: '',
        horaSalida: '',
       
    }
    const name = document.getElementById('name').value    
    const lastName = document.getElementById('lastName').value     
    const email = document.getElementById('email').value
    const id = `${name[0]}${lastName[0]}${Math.floor(Math.random() * (10000 - 1000) +1000)}`  
   
    user.name = name
    user.lastName = lastName
    user.email = email
    user.userId = id

    UserJSONParse.users.push(user);
   localStorage.setItem("UserObject", JSON.stringify(UserJSONParse))
   document.getElementById('name').value = ""
   document.getElementById('lastName').value = ""
   document.getElementById('email').value = ""

   let divIdMessage= document.createElement("div")
       divIdMessage.setAttribute("class", "register-message")
       divIdMessage.innerText= `Su ID es: ${id}`
    
   let divReg= document.querySelector(".register-form"); 
   divReg.insertAdjacentElement("beforebegin", divIdMessage) 
   console.log(divReg)
   

}

//Esta funcion nos da un alert de que no encuentra informacion

const alertLogin = () => {
    document.querySelector('.message-login').style.display = 'block';
    setTimeout( () => {
        document.querySelector('.message-login').style.display = '';
    }, 3000 )
}


