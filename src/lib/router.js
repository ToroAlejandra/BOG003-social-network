import { login } from './view/templateLogin.js';
import { signin } from './view/templateSignin.js';
import { nFound } from './view/template404NotFound.js';
import { home } from './view/templateHome.js';
const containerRoot = document.getElementById('root');
const objectRoute = {
  '#/': login(),
  '#/signin': signin(),
  '#/home': home()
};
const showTemplate = (hash) => {
  
  containerRoot.innerHTML = '';

  //const notFound = nFound(); //sale el error de appendChild pedir ayuda con esto "Para appenChild";
  const callHash = containerRoot.appendChild(objectRoute[hash]);
  };

export const changeRoute = (hash) => {
  if (Object.keys(objectRoute).includes(hash)){
    return showTemplate(hash);
  } 
  else {
    containerRoot.innerHTML = '';
    return containerRoot.appendChild(nFound());
  }
};
