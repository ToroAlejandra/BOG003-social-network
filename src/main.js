// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';
import { login } from './lib/view/templateLogin.js';
import { changeRoute } from './lib/router.js';

const init = () => {
  document.getElementById('root').innerHTML = login();
  window.addEventListener('hashchange', () => {
    myFunction();
    console.log(window.location.hash);
    changeRoute(window.location.hash);
  });
};
window.addEventListener('load', init);
