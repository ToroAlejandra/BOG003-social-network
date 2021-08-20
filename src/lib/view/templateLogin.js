import { loginGoogle, loginWithPasswordEmail} from '../index.js';

export const login = () => {

  const divLogin = document.createElement('div');

  const viewLogin =
    `<a href="#/">Inicia Sesión</a>
    <a href="#/signin">Registrate</a>
     <input type="email" id="loginEmail" placeholder="E-mail">
     <input type="password" name="" id="loginPass" placeholder="Contraseña">
     <button id='loginEmailAndPass'href="#/home"> Login </button>
     <button id='loginGoogle'> Login Google </button>
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
    console.log('Email');
    loginWithPasswordEmail(userEmail,userPassword);
   }); 


  return divLogin;
};

