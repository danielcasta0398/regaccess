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
            //window.location.href= "accessControl.html"

            let indexLogedIn= arrayUserID.indexOf(userId);
            let nameToPrint= reviewUsers[indexLogedIn].name.toLowerCase();
            let nametoPrintFormat= nameToPrint.replace(/\b\w/g, l => l.toUpperCase())
            document.querySelector('.main-container').innerHTML = `  
            <div class="menu">
                <h3><p>¡Bienvenido</p><p>${nametoPrintFormat}!</p></h3>
                <input type="hidden" readonly id="hidden" value="${indexLogedIn}">
                <div class="userInfo">
                <button class="menu-button" onclick="registerTimeEntrance()">Registrar Entrada</button>
                <button class="menu-button" onclick="registerTimeLeave()">Registrar Salida</button>  
                <button class="menu-button" onclick="historyReg()">Historial de Registros</button>
                </div>
                <div> 
                <p><a href="index.html">Cerrar Sesión</a></p>

            </div>`
        }
    }
    
}


const register = () =>{

    document.querySelector('.main-container').innerHTML = `  
      <div class="register-form">
        <h3>Registrate</h3>
        
        <form class="register-form"><div>
            <label><i class="fa-solid fa-address-card"></i></label>
            <input 
                type="text"
                placeholder="Nombres"
                id="name"
                minlength="3"
                required
                autocomplete="off"   
                onkeypress="13"      
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
            autocomplete="off"
            onkeypress="13"
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
            autocomplete="off"
            onkeypress="13"
         >         
        </div> 
        <button onclick="registerInfo(event)">Registrarse</button> 
        <p>¿Tienes un registro? <a href="index.html">Iniciar Sesion</a></p>
      </div></form>`
   
}


const registerInfo = (e) => {
    e.preventDefault()
    const user = {  
        userId: '',     
        name: '',
        lastName: '',
        email: '',
        fecha:[],
        horaEntrada:[],
        horaSalida:[],
       
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

    let reviewEmail= document.querySelector('#email').value.toLowerCase();
        console.log(reviewEmail)
            let returnIdInfo= UserJSONParse.users;
            let emailArray=[];

            for (let i=0; i<returnIdInfo.length; i++)
            {
                emailArray.push(returnIdInfo[i].email)
                console.log(emailArray)
            }
            let comparaEmail=emailArray.indexOf(reviewEmail)
            console.log(comparaEmail)
    
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
        else if(comparaEmail != -1)
        
        {
            if (!document.querySelector('.emptyInput-Message'))
        {          
            let messageEmail=document.querySelector('#email').parentElement
            messageEmail.insertAdjacentHTML('afterend', `<div class="emptyInput-Message"><p>Este email ya se encuentra registrado.</p></div>`);
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
        localStorage.setItem("UserObject", JSON.stringify(UserJSONParse))
        document.getElementById('name').value = ""
        document.getElementById('lastName').value = ""
        document.getElementById('email').value = ""

        let divIdMessage= document.createElement("div")
            divIdMessage.setAttribute("class", "register-message")
        let regSucces= document.querySelector('.main-container')
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
const registerTimeEntrance = () => {

let monthList= ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre',    'Diciembre'];
let currentTime = new Date();
let displayDay= currentTime.getUTCDate();
let monthIndex= currentTime.getUTCMonth();
let displayMonth= monthList[monthIndex]
let displayYear= currentTime.getUTCFullYear();
let displayHours= currentTime.getHours();
let displayMinutes= currentTime.getMinutes();

    if (displayHours <10)
        {
            displayHours= `0${displayHours}`
        }
    else if (displayMinutes <10)
        {
        displayMinutes= `0${displayMinutes}`
    }
  

let regTime=`${displayHours}:${displayMinutes}`;
let regDate= `${displayDay}-${displayMonth}-${displayYear}`;
    let userIndex= document.getElementById('hidden').value;
    let reviewUsers= UserJSONParse.users[userIndex]
    
    let reviewHoraEntrada= reviewUsers.horaEntrada
    let arrayUserHoraEntrada=reviewHoraEntrada;
    let reviewHoraSalida= reviewUsers.horaSalida
    let arrayUserHoraSalida= reviewHoraSalida
        
    let reviewFecha= reviewUsers.fecha;
    let arrayUserFecha= reviewFecha;
        if (arrayUserFecha.indexOf(regDate) == -1)
        {
        arrayUserFecha.push(regDate);
        arrayUserHoraEntrada.push(regTime)
        arrayUserHoraSalida.push('Registro Pendiente')
        localStorage.setItem("UserObject", JSON.stringify(UserJSONParse))

        let displayRegMessage= document.querySelector('.main-container')
        displayRegMessage.innerHTML= `<div class="succesfulRef"><p>Entrada registrada por ${reviewUsers.userId}</p>
                                                                <p>Hora y fecha: ${regTime} / ${regDate}</p>
                                        </div>
                                        <div>
                                        <input type="hidden" id="userId" value=${reviewUsers.userId}>
                                        <button onclick="login(event)">Volver</button>
                                        </div>`
        }
        else{
            let displayRegMessage= document.querySelector('.main-container')
        displayRegMessage.innerHTML= `<div class="succesfulRef"><p>Ya existe una entrada en esta fecha</p>
                                                                
                                        </div>
                                        <div>
                                        <input type="hidden" id="userId" value=${reviewUsers.userId}>
                                        <button onclick="login(event)">Volver</button>
                                        </div>`
        }
        


}

const registerTimeLeave = () => {

    let monthList= ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre',    'Diciembre'];
let currentTime = new Date();
let displayDay= currentTime.getUTCDate();
let monthIndex= currentTime.getUTCMonth();
let displayMonth= monthList[monthIndex]
let displayYear= currentTime.getUTCFullYear();
let displayHours= currentTime.getHours();
let displayMinutes= currentTime.getMinutes();


    if (displayHours <10)
        {
            displayHours= `0${displayHours}`
        }
    else if (displayMinutes <10)
        {
        displayMinutes= `0${displayMinutes}`
    }
    

let regTime=`${displayHours}:${displayMinutes}`;
let regDate= `${displayDay}-${displayMonth}-${displayYear}`;

    let userIndex= document.getElementById('hidden').value;
    let reviewUsers= UserJSONParse.users[userIndex]
    let reviewHoraSalida= reviewUsers.horaSalida
    let arrayUserHoraSalida=reviewHoraSalida;
        
    let reviewFecha= reviewUsers.fecha;
    let indexHoraSalida=reviewFecha.indexOf(regDate)
        if (arrayUserHoraSalida[indexHoraSalida] == 'Registro Pendiente')
    {
       arrayUserHoraSalida[indexHoraSalida]=regTime
        localStorage.setItem("UserObject", JSON.stringify(UserJSONParse))

        let displayRegMessage= document.querySelector('.main-container')
        displayRegMessage.innerHTML= `<div class="succesfulRef"><p>Salida registrada por ${reviewUsers.userId}</p>
                                                                <p>Hora y fecha: ${regTime} / ${regDate}</p>
                                        </div>
                                        <div>
                                        <input type="hidden" id="userId" value=${reviewUsers.userId}>
                                        <button onclick="login(event)">Volver</button>
                                        </div>`      
    }
    else
    {
            let displayRegMessage= document.querySelector('.main-container')
        displayRegMessage.innerHTML= `<div class="succesfulRef"><p>Ya existe una salida en esta fecha</p>
                                                                
                                        </div>
                                        <div>
                                        <input type="hidden" id="userId" value=${reviewUsers.userId}>
                                        <button onclick="login(event)">Volver</button>
                                        </div>`
    }  

}

const historyReg =() => {
    let userIndex= document.getElementById('hidden').value;
    let reviewUsers= UserJSONParse.users[userIndex]
    let revUserHistDate=reviewUsers.fecha
    let reviewUserHistoryEntrance= reviewUsers.horaEntrada
    let reviewUserHistoryLeave= reviewUsers.horaSalida
    let displayHistory= document.querySelector('.main-container')
        displayHistory.innerHTML= `<div><h2>Historial de Registros</h2></div>
        <div class="userHistory">
        <table>
        <tbody class="hora">
        <tr>
        <td><h4>Entrada</h4></td>
        <td class="trDate"><h3>Fecha</h3></td>
        <td><h4>Salida</h4></td>
        </tr>
        </tbody>
        </table>
        <input type="hidden" id="userId" value=${reviewUsers.userId}>
        </div>
        <div><button onclick="login(event)">Volver</button></div>
        `
        for (let i=0; i<reviewUserHistoryEntrance.length; i++)
        {
            document.querySelector('.hora').insertAdjacentHTML('beforeEnd', `<tr><td>${reviewUserHistoryEntrance[i]}</td><td class="trDate">${revUserHistDate[i]}</td><td>${reviewUserHistoryLeave[i]}</td></tr>`)
        }  

}

const forgottenID =()=> {
    document.querySelector('.main-container').innerHTML=`
    <div class="menu">
    <form><label><h3>Ingresa tu email</h3></label>
    <input id="forgot" autocomplete="off" type="text" onkeypress="13" required>                                       
    <button onclick="returnID(event)">Recuperar ID</button></form>
    <p><a href="index.html">Volver al inicio</a></p>` 
   
}

const returnID = (e) => {
    e.preventDefault()
    let forgotID= document.getElementById('forgot').value.toLowerCase();
    let returnIdInfo= UserJSONParse.users;
    let emailArray=[];

    for (let i=0; i<returnIdInfo.length; i++)
    {
        emailArray.push(returnIdInfo[i].email)
    }
     let comparaEmail=emailArray.indexOf(forgotID)
     if (comparaEmail != -1)
     {
    document.querySelector('.main-container').innerHTML= `<p>Su ID es: ${UserJSONParse.users[comparaEmail].userId}</p>
        <a href="index.html"><button>Iniciar Sesión</button></a>`
     }
     else
     {
        document.querySelector('.main-container').innerHTML= `<p>La dirección de email no está registrada con ningún ID</p>
        <button onclick="forgottenID()">Volver</button>`
     }
}