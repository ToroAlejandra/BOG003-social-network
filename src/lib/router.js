import { login } from './view/templateLogin.js';
import { signin } from './view/templateSignin.js';
import { nFound } from './view/template404NotFound.js';
const containerRoot = document.getElementById('root');
const showTemplate = (hash) => {
  
  containerRoot.innerHTML = '';

  const objectRoute = {
    '#/': login(),
    '#/signin': signin()
  }
  //const notFound = nFound(); //sale el error de appendChild pedir ayuda con esto "Para appenChild";

  const callHash = containerRoot.appendChild(objectRoute[hash]) ||  containerRoot.appendChild(nFound());
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
