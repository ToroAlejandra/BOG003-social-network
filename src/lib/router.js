import { login } from './view/templateLogin.js';
import { signin } from './view/templateSignin.js';
import { nFound } from './view/template404NotFound.js';

const showTemplate = (hash) => {
  const containerRoot = document.getElementById('root');
  containerRoot.innerHTML = '';

  /* switch (hash) {
     case '#/':
       containerRoot.appendChild(login());
       break;
     case '#/signin':
       containerRoot.appendChild(signin());
       break;
     default:
       containerRoot.innerHTML = '<h2>No existe</h2>';
   }*/

  const objectRoute = {
    '#/': login(),
    '#/signin': signin()
  }
  const notFound = nFound(); //sale el error de appendChild pedir ayuda con esto "Para appenChild";

  const callHash = containerRoot.appendChild(objectRoute[hash]) ||  containerRoot.appendChild(notFound);
  console.log(callHash);

};


export const changeRoute = (hash) => {
  if (hash === '#/') {
    return showTemplate(hash);
  } else if (hash === '#/signin') {
    return showTemplate(hash);
  } else {
    return showTemplate(hash);
  }
};
