// Este es el punto de entrada de tu aplicacion

import { login } from './lib/view/templateLogin.js';
import { changeRoute } from './lib/router.js';

let init = () => {
  document.getElementById('root').appendChild(login()); 
  if (window.location.hash !== ''){
    changeRoute(window.location.hash);
  }

  window.addEventListener('hashchange', () => {
    console.log(window.location.hash);
    changeRoute(window.location.hash);
  });
};
window.addEventListener('load', init);