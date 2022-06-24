const userObject = {
    users:[]
}


let UserObjLS= localStorage.getItem("UserObject");
let UserJSONParse=JSON.parse(UserObjLS);

if (!UserObjLS)
{
    localStorage.setItem("UserObject", JSON.stringify(userObject));
    window.location.reload()
}


const login = (e) =>{
    e.preventDefault()
    const userId = document.getElementById('userId').value
    const userIdLength= userId.length
    if (!userId)
    {    
        if (!document.querySelector('.message-login')) //Validamos que no esté vacio el input
        {    
        let messageLoginRequired= document.getElementById('userId').parentElement
        messageLoginRequired.insertAdjacentHTML('beforebegin', '<div class="message-login">Debes ingresar tu ID</div>')
        setTimeout ( () => {
            document.querySelector('.message-login').remove();}
            ,4000)
        }
    }
    else if (userIdLength < 6) //Validamos que el total de digitos sea 6
    {
        
       if (!document.querySelector('.message-login')) 
       {     
       let messageLoginRequired= document.getElementById('userId').parentElement
        messageLoginRequired.insertAdjacentHTML('beforebegin', '<div class="message-login">El ID debe contener 6 digitos. Ej: AB1234</div>')
        setTimeout ( () => {
            document.querySelector('.message-login').remove();}
            ,4000)
       }
    }

    else 
    {   
        let reviewUsers= UserJSONParse.users //Trae el Objeto del LS
        let arrayUserID=[];
        for (let i=0; i<reviewUsers.length; i++) //Recorre el objeto
        {
            
            arrayUserID.push(reviewUsers[i].userId) //Inserta todos los userId en un array
        }

        if (arrayUserID.indexOf(userId) == -1) // Si el ID ingresado no coincide, arroja mensaje.
        {
            if (!document.querySelector('.message-login')) 
            {        
                let messageLoginRequired= document.getElementById('userId').parentElement
                messageLoginRequired.insertAdjacentHTML('beforebegin', '<div class="message-login">El ID no existe</div>')
                setTimeout ( () => {
                    document.querySelector('.message-login').remove();}
                    ,4000)
                    
            }
        }

        else //Si ID coincide con algun indice de LS, redirecciona a accesControl.html (Inicia la Sesión)
        {           
            window.location.href= "accessControl.html"
        }
    }
    
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
                minlength="3"
                required           
            >
            
        </div>
        <div>
            <label><i class="fa-solid fa-address-card"></i></label>
            <input 
            type="text"
            placeholder="Apellidos"
            id="lastName"
            minlength="3"
            required
            >          
        </div>  
        <div>
        <label><i class="fa-solid fa-envelope"></i></label>
         <input 
            type="email" 
            placeholder="Correo"
            id="email"
            pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
            required
            minlength="6"
         >           
        </div> 
        <button onclick="registerInfo(event)">Registrarse</button>
        <p>¿Tienes un registro? <a href="index.html">Iniciar Sesion</a></p>
      </div>    `
   
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
    const name = document.getElementById('name').value.toUpperCase() //Obtenemos el valor del input en mayúsculas
    const lastName = document.getElementById('lastName').value.toUpperCase() //Obtenemos el valor del input en mayúsculas
    const email = document.getElementById('email').value.toLowerCase() //Obtenemos el valor del input en minúsculas
    const id = `${name[0]}${lastName[0]}${Math.floor(Math.random() * (10000 - 1000) +1000)}`  

    if (!name) //Valida que el input no esté vacio
    {
     
        if (!document.querySelector('.emptyInput-Message')) //Valida que el mensaje no exista, para no generarlo multiples veces
        {
            let messageName=document.querySelector('#name').parentElement
         
            messageName.insertAdjacentHTML('afterend', `<div class="emptyInput-Message"><p>Debe ingresar su nombre.</p></div>`); //Inserta un DIV con un mensaje de alerta
            setTimeout( () => {
               document.querySelector('.emptyInput-Message').remove(); //Elimina el mensaje de alerta despues del tiempo indicado
            } , 2000 )
        }       
    }
     
    if (!lastName)
    {
        if (!document.querySelector('.emptyInput-Message'))
        {
            let messageLastName=document.querySelector('#lastName').parentElement
            messageLastName.insertAdjacentHTML('afterend', `<div class="emptyInput-Message"><p>Debe ingresar su apellido.</p></div>`);
            setTimeout( () => {
                document.querySelector('.emptyInput-Message').remove();
             } , 2000 )
        }
    }
    
    if (!email)
    {
        if (!document.querySelector('.emptyInput-Message'))
        {
            let messageEmail=document.querySelector('#email').parentElement
            messageEmail.insertAdjacentHTML('afterend', `<div class="emptyInput-Message"><p>Debe ingresar un email válido.</p></div>`);
            setTimeout( () => {
                document.querySelector('.emptyInput-Message').remove();
             } , 2000 )
            }
    }

    
    else 
    {
        user.name = name
        user.lastName = lastName
        user.email = email
        user.userId = id.toUpperCase()

        UserJSONParse.users.push(user);
        console.log(UserJSONParse)
        localStorage.setItem("UserObject", JSON.stringify(UserJSONParse))
        document.getElementById('name').value = ""
        document.getElementById('lastName').value = ""
        document.getElementById('email').value = ""

        let divIdMessage= document.createElement("div")
            divIdMessage.setAttribute("class", "register-message")
        let regSucces= document.querySelector('.login-form')
            regSucces.action.value= ''
            regSucces.innerHTML= `<p>Su ID es: ${id}</p>
        <a href="index.html"><button>Iniciar Sesión</button></a>`
    }
  
}

//Esta funcion nos da un alert de que no encuentra informacion

/*const alertLogin = () => {
    document.querySelector('.message-login').style.display = 'block';
    setTimeout( () => {
        document.querySelector('.message-login').style.display = '';
    }, 3000 )
  
}*/