import { loginGoogle, loginWithPasswordEmail} from '../utils/firebaseIndex.js';

export const login = () => {

  const divLogin = document.createElement('div');

  const viewLogin =
    `<a href="#/">Inicia Sesión</a>
    <a href="#/signin">Registrate</a>
     <input type="email" id="loginEmail" placeholder="E-mail">
     <input type="password" name="" id="loginPass" placeholder="Contraseña">
     <button id='loginEmailAndPass'> Login </button>
     <button id='loginGoogle'> Login Google </button>
     <h3 id='unverifiedEmail'></h3>
    `
  divLogin.innerHTML = viewLogin;

  const btnGoogle = divLogin.querySelector('#loginGoogle');

  btnGoogle.addEventListener("click", () => {
      loginGoogle();
  });

  const btnEmailAndPass = divLogin.querySelector('#loginEmailAndPass');
  btnEmailAndPass.addEventListener("click", () => {
    let userPassword = document.querySelector("#loginPass").value; 
    let userEmail = document.querySelector("#loginEmail").value;
    let loginWithPassEmail = loginWithPasswordEmail(userEmail,userPassword)
    .then((res) => {
      if (res.user.emailVerified){
        window.location.hash = "#/home";
        console.log(res.user.emailVerified);
      } else {
         document.querySelector("#unverifiedEmail").innerHTML = 'Verifica tu correo para poder ingresar';
      }      
    }) 
    .catch((error) => {
      const objectErrorLogin = {
        'auth/wrong-password': 'Contraseña incorrecta',
        'auth/too-many-requests' : 'Has excedido el número de intentos permitidos',
        'auth/user-not-found': 'El usuario no existe, verifica tu correo',
        'auth/invalid-email': 'Por favor ingresa un correo válido',
        'auth/internal-error': 'Ha ocurrido un error inesperado, por favor intenta nuevamente'
      };
      let errorCode = error.code;
      let errorMessage = error.message;

      if (Object.keys(objectErrorLogin).includes(errorCode)){
        document.querySelector("#unverifiedEmail").innerHTML = objectErrorLogin[errorCode] ;
      } else {
        document.querySelector("#unverifiedEmail").innerHTML = objectErrorLogin['auth/internal-error'] + " " + errorCode;
      }
  });

   }); 
  return divLogin;
};

