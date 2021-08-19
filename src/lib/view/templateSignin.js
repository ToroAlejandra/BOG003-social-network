import { loginGoogle,signUpWithEmailPassword,sendLink } from '../index.js';

export const signin = () => {
  const divSignin = document.createElement('div');

  const viewSignin = `
    <h1>registro</h1>
    <a href="#/">Inicia Sesión</a>
     <a href="#/signin">Registrate</a>
     <input type="email" id="inputEmail" placeholder="E-mail">
     <input type="password" name="" id="inputPass" placeholder="Contraseña">
     <button id='signinEmail'> Regístrate </button>
     <button id='signinGoogle'> Login Google </button>
    `;
  divSignin.innerHTML = viewSignin;

  const btnSigninGoogle = divSignin.querySelector('#signinGoogle');

  btnSigninGoogle.addEventListener("click", () => {
    console.log('Signin');
    loginGoogle();
  });

  const btnSigninEmail = divSignin.querySelector('#signinEmail');

  btnSigninEmail.addEventListener("click", () => {
    console.log('Signin');
    sendLink();
  });


  return divSignin;
};
