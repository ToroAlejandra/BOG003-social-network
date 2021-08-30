import { getCurrentUser, loginGoogle, loginWithPasswordEmail, setPersistence} from '../utils/firebaseIndex.js';
/** Crear div que contiene template de login*/
export const login = () => {
  const divLogin = document.createElement('div');
  divLogin.setAttribute('class', 'divLogin');
  let viewLogin = `
  <div class='logo-login'>
  <h1>Visibles</h1>
  <img class='logo' src='./images/protest.svg'></img>
  </div>
    <div class='section-login'>    
     <div class='input-group'>
      <input type='email' id='loginEmail' placeholder='E-mail'> 
      <input type='password' name='' id='loginPass' placeholder='Contraseña'>
     </div>
     <button class='btn-register' id='loginEmailAndPass'> Inicia sesión </button>
     <div class= "msj-error-date-none" id='mesage-error-login'>
     <img class= 'bx-errorMesage' src= './images/error_outline.png'></img><p id='unverifiedEmail'></p>
     </div>
     <div class='line'>
        <div class='line-one'>
        </div>
        <p>o ingresa con</p>
        <div class='line-two'>
        </div>
     </div>
     <img src= './images/logo-google.png' id='loginGoogle'></img>
        <div class='link-account'>
         <p> ¿No tienes cuenta? </p><a href='#/signin'>Regístrate</a>
    </div>
    </div> 
    `;
  divLogin.innerHTML = viewLogin;
  //probar si el usuari esta activo
 // getCurrentUser();
  setPersistence();
  const btnGoogle = divLogin.querySelector('#loginGoogle');
  btnGoogle.addEventListener('click', () => {
    loginGoogle();
  });
  /** Este evento ejecuta el ingreso del usuario con correo y contraseña */
  const btnEmailAndPass = divLogin.querySelector('#loginEmailAndPass');
  btnEmailAndPass.addEventListener('click', () => {
    let userPassword = document.querySelector('#loginPass').value;
    let userEmail = document.querySelector('#loginEmail').value;
    let loginWithPassEmail = loginWithPasswordEmail(userEmail, userPassword)
      .then((res) => {
        /**res(response) hace referencia a la respuesta de la promesa */
        /**Si el email fue verificado el usuario ingresa a home */
        if (res.user.emailVerified) {
         window.location.hash = '#/home';
        } else {
          /**Si el email no es verificado se envia mensaje de aviso usuario para que verifique el correo */
          document.querySelector('#mesage-error-login').classList.remove('msj-error-date-none');
          document.querySelector('#mesage-error-login').classList.add('msj-error-date-show');
          document.querySelector('#unverifiedEmail').innerHTML = 'Verifica tu correo para poder ingresar';
        }
      })
      /**Objeto de errores de validación del login */
      .catch((error) => {
        let objectErrorLogin = {
          'auth/wrong-password': 'Contraseña incorrecta',
          'auth/too-many-requests':
            'Has excedido el número de intentos permitidos',
          'auth/user-not-found': 'El usuario no existe, verifica tu correo',
          'auth/invalid-email': 'Por favor ingresa un correo válido',
          'auth/internal-error':
            'Ha ocurrido un error inesperado, por favor intenta nuevamente',
        };
        let errorCode = error.code;
        let errorMessage = error.message;
        /** Se valida el error segun el objeto y se envia mensaje al usuario */
        if (Object.keys(objectErrorLogin).includes(errorCode)) {
          document.querySelector('#mesage-error-login').classList.remove('msj-error-date-none');
          document.querySelector('#mesage-error-login').classList.add('msj-error-date-show');
          document.querySelector('#unverifiedEmail').innerHTML = objectErrorLogin[errorCode];

        } else {
          /** Si no se encuentra el error en el objeto y se envia un mensaje por defecto */
          document.querySelector('#mesage-error-login').classList.remove('msj-error-date-none');
          document.querySelector('#mesage-error-login').classList.add('msj-error-date-show');
          document.querySelector('#unverifiedEmail').innerHTML = objectErrorLogin['auth/internal-error'] + ' ' + errorCode;
        }
      });
      document.querySelector('#mesage-error-login').classList.add('msj-error-date-none');
      document.querySelector('#mesage-error-login').classList.remove('msj-error-date-show');
      document.querySelector('#loginPass').value = '';
      document.querySelector('#loginEmail').value = '';
  });
  return divLogin;
};
