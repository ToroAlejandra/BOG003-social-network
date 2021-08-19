import { loginGoogle } from '../index.js';

export const login = () => {

  const divLogin = document.createElement('div');

  const viewLogin =
    `<a href="#/">Inicia Sesión</a>
     <a href="#/signin">Registrate</a>
     <button id='loginGoogle'> Login Google </button>
    `
  divLogin.innerHTML = viewLogin;

  const btn = divLogin.querySelector('#loginGoogle');

  btn.addEventListener("click", () => {
    console.log('hola');
    loginGoogle();
  })
 

  return divLogin;
};

