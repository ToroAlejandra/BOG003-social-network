import { loginGoogle,signUpWithEmailPassword,sendLink,getCurrentUser} from '../index.js';

export const signin = () => {
  const divSignin = document.createElement('div');

  const viewSignin = `
    <h1>registro</h1>
    <a href="#/">Inicia Sesión</a>
     <input type="email" id="inputEmail" placeholder="E-mail">
     <input type="password" name="" id="inputPass" placeholder="Contraseña">
     <button id='signinEmail'> Regístrate </button>
     <button id='signinGoogle'> Login Google </button>
     <button id='currentUser'> usuario </button>
     `;
  divSignin.innerHTML = viewSignin;

  const btnSigninGoogle = divSignin.querySelector('#signinGoogle');

  btnSigninGoogle.addEventListener("click", () => {
    console.log('Signin');
    loginGoogle();
  });

  const btnCurrent = divSignin.querySelector('#currentUser');

  btnCurrent.addEventListener("click", () => {
    getCurrentUser();
  });
  const btnSigninEmail = divSignin.querySelector('#signinEmail');
  btnSigninEmail.addEventListener("click", () => {
    let userPassword = document.querySelector("#inputPass").value; 
    let userEmail = document.querySelector("#inputEmail").value;
    console.log('Signin');
    signUpWithEmailPassword(userEmail,userPassword);
   });
   return divSignin;
};
