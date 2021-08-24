import { loginGoogle, signUpWithEmailPassword, sendLink, getCurrentUser } from '../utils/firebaseIndex.js';

export const signin = () => {
  const divSignin = document.createElement('div');

  const viewSignin = `
    <h1>registro</h1>
    <a href="#/">Inicia Sesión</a>
     <input type="email" id="inputEmail" placeholder="E-mail">
     <input type="text" id="inputName" placeholder="Nombre">
     <input type="text" id="inputNameUser" placeholder="Nombre de usuario">
     <input type="text" id="gender" placeholder="Género">
     <input type="date" id="date" placeholder="Fecha de nacimiento">
     <input type="password" name="" id="inputPass" placeholder="Contraseña">
     <input type="password" name="" id="inputPassConfirm" placeholder="Confirma tu contraseña">
     <button id='signinEmail'> Regístrate </button>
     <button id='signinGoogle'> Login Google </button>
     <button id='currentUser'> usuario </button>
     <h3 id='errorMesageSignin'></h3>
     `;
  divSignin.innerHTML = viewSignin;

  const btnSigninGoogle = divSignin.querySelector('#signinGoogle');

  btnSigninGoogle.addEventListener("click", () => {
    loginGoogle();
  });

  const btnCurrent = divSignin.querySelector('#currentUser');

  btnCurrent.addEventListener("click", () => {
    getCurrentUser();
  });


  /*console.log('ingresa al if blur')
   userPassword.addEventListener("focus", (event) => {
     event.target.style.background = "pink";
     /*if (userPassword.length < 6) {
       document.querySelector("#errorMesageSignin").innerHTML = "La contraseña es muy débil";
     }
 
   }*/

  const btnSigninEmail = divSignin.querySelector('#signinEmail');

  btnSigninEmail.addEventListener("click", () => {
    document.querySelector("#errorMesageSignin").innerHTML = "";
    let userPassword = document.querySelector("#inputPass").value;
    let userEmail = document.querySelector("#inputEmail").value;
    let userPasswordConfirm = document.querySelector("#inputPassConfirm").value;

    if ((userPassword === userPasswordConfirm)) {
      signUpWithEmailPassword(userEmail, userPassword)
        .then((userCredential) => {
          // Signed in
          let user = userCredential.user;
          console.log(user);
          //Si el usuario no está verificado enviar el link de confirmación
          if (user.emailVerified === false) {
            let inputName = document.querySelector("#inputName").value;
            sendLink(inputName);
          }

          const uid = user.uid;
          db.collection("users").doc(uid).set({
            name: document.querySelector("#inputName").value,
            user: document.querySelector("#inputNameUser").value,
            gender: document.querySelector("#gender").value,
            date: document.querySelector("#date").value

          })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;

          const objectErrorSignin = {
            'auth/weak-password': 'Contraseña débil, escribe al menos seis caracteres.',
            'auth/too-many-requests': 'Has excedido el número de intentos permitidos.',
            'auth/email-already-in-use': 'Esta cuenta ya está registrada, inicia sesión o verifica tu correo.',
            'auth/email-already-exists': 'Esta cuenta ya está registrada, inicia sesión o verifica tu correo.',
            'auth/invalid-email': 'Por favor ingresa un correo válido.',
            'auth/internal-error': 'Ha ocurrido un error inesperado, por favor intenta nuevamente.'
          };
          if (Object.keys(objectErrorSignin).includes(errorCode)) {
            document.querySelector("#errorMesageSignin").innerHTML = objectErrorSignin[errorCode];
          } else {
            document.querySelector("#errorMesageSignin").innerHTML = objectErrorSignin['auth/internal-error'] + " " + errorCode;
          }
          // ..
        });
    } else {
      document.querySelector("#errorMesageSignin").innerHTML = "La contraseña no coincide";
    }



  });


  return divSignin;
};
