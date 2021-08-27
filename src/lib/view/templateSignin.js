import {
  loginGoogle,
  signUpWithEmailPassword,
  sendLink,
  setDataUser,
} from "../utils/firebaseIndex.js";

import { validDate } from '../index.js';

/**Crear el div que contiene el template de signin (Registro)*/
export const signin = () => {
  const divSignin = document.createElement("div");
  divSignin.setAttribute("class", "divSignin");
  const viewSignin = `
    <div class="headSignin">
      <img class="logo" src="./images/protest.svg"></img>
    </div>
    <div class="section-signin">
      <div class="input-group">
        <input type="email" id="inputEmail" placeholder="E-mail">
        <input type="text" id="inputName" placeholder="Nombre">
        <input type="text" id="inputNameUser" placeholder="Nombre de usuario">
        <input type="text" id="gender" placeholder="Género">
        <p> Fecha de nacimiento</p><input type="date" id="date">
        <div id="msj-error-date" class="msj-error-date-none">
          <img src= "./images/bx-x-circle.svg" id='iconError'></img><p id="errorDate"> </p>
        </div>
        <input type="password" name="" id="inputPass" placeholder="Contraseña">
        <input type="password" name="" id="inputPassConfirm" placeholder="Confirma tu contraseña">
          </div>
          <div id= "msj-verified" class= "msj-verified">
          <img class= "bx-mail" src= "./images/bx-mail-send.png"></img><p>¡Registro exitoso! Te hemos enviado un correo de verificación para tu ingreso</p>
          </div>
        <button class="btn-register" id='signinEmail'> Regístrate </button>
        <div class="line">
        <div class="line-one">
        </div>
        <p>o ingresa con</p>
        <div class="line-two">
        </div>
        </div>  
        <img src= "./images/logo-google.png" id='signinGoogle'></img>
        <div class="link-account">
         <p> ¿Ya tienes cuenta?</p><a href="#/">Inicia sesión</a>
        </div> 
        <h3 id='errorMesageSignin'></h3>
    </div>
        `;

  divSignin.innerHTML = viewSignin;

  
  const btnSigninGoogle = divSignin.querySelector("#signinGoogle");
  btnSigninGoogle.addEventListener("click", () => {
    loginGoogle();
  });
  /*console.log('ingresa al if blur')
   userPassword.addEventListener("focus", (event) => {
     event.target.style.background = "pink";
     /*if (userPassword.length < 6) {
       document.querySelector("#errorMesageSignin").innerHTML = "La contraseña es muy débil";
     }
   }*/
  /**Este evento permite al usuario el registro mediante correo y contraseña*/
  const btnSigninEmail = divSignin.querySelector("#signinEmail");
  btnSigninEmail.addEventListener("click", () => {
    document.querySelector("#errorMesageSignin").innerHTML = "";
    let userPassword = document.querySelector("#inputPass").value;
    let userEmail = document.querySelector("#inputEmail").value;
    let userPasswordConfirm = document.querySelector("#inputPassConfirm").value;
    let date = document.querySelector("#date").value;

    document.querySelector("#msj-error-date").classList.remove("msj-error-date-none");
    document.querySelector("#msj-error-date").classList.add("msj-error-date-show");

    if (date === "" || date === null || date.length < 10 ){
      document.querySelector('#errorDate').innerHTML = "No puedes ingresar un campo vacío";
    } else if (validDate(date)) {
    
      document.querySelector('#errorDate').innerHTML = "Por favor ingresa una fecha válida";
    } 

    if (userPassword === userPasswordConfirm) {
      /** Usamos el metodo signUpWithEmailPassword para ingresar con usuario y contraseña*/
      signUpWithEmailPassword(userEmail, userPassword)
        .then((userCredential) => {
          // Signed in
          let user = userCredential.user;
      
          /**Si el usuario no está verificado enviar el link de confirmación*/
          if (user.emailVerified === false) {
            let inputName = document.querySelector("#inputName").value;
            sendLink(inputName);
            document.querySelector("#msj-verified").classList.remove("msj-verified");
            document.querySelector("#msj-verified").classList.add("show-msj");
            setDataUser(
              user,
              document.querySelector("#inputName").value,
              document.querySelector("#inputNameUser").value,
              document.querySelector("#gender").value,
              document.querySelector("#date").value
            );
          }
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          /**Objeto de errores de registro*/
          const objectErrorSignin = {
            "auth/weak-password":
              "Contraseña débil, escribe al menos seis caracteres.",
            "auth/too-many-requests":
              "Has excedido el número de intentos permitidos.",
            "auth/email-already-in-use":
              "Esta cuenta ya está registrada, inicia sesión o verifica tu correo.",
            "auth/email-already-exists":
              "Esta cuenta ya está registrada, inicia sesión o verifica tu correo.",
            "auth/invalid-email": "Por favor ingresa un correo válido.",
            "auth/internal-error":
              "Ha ocurrido un error inesperado, por favor intenta nuevamente.",
          };
          /**Si es un caso de los que se encuentra en el objeto envia el mensaje de error*/
          if (Object.keys(objectErrorSignin).includes(errorCode)) {
            document.querySelector("#errorMesageSignin").innerHTML =
              objectErrorSignin[errorCode];
          } else {
            /**Error por defecto en caso de que no sea ninguno de los incluidos en el objeto*/
            document.querySelector("#errorMesageSignin").innerHTML =
              objectErrorSignin["auth/internal-error"] + " " + errorCode;
          }
          // ..
        });
    } else {
      document.querySelector("#errorMesageSignin").innerHTML =
        "La contraseña no coincide";
    }
    document.querySelector("#foot").classList.remove("foot");
    document.querySelector("#foot").classList.add("foot-two");
  });

  return divSignin;
};

