import { login } from './view/templateLogin.js';
import { signin } from './view/templateSignin.js';
import { nFound } from './view/template404NotFound.js';
import { home } from './view/templateHome.js';
/** Contenedor general */
const containerRoot = document.getElementById('root');
/** Objeto que contiene los template segun el hash */
const objectRoute = {
  '#/': login,
  '#/signin': signin,
  '#/home': home,
};
/** añadir y mostrar el template al contenedor general */
const showTemplate = (hash) => {
  containerRoot.innerHTML = '';
  const component = objectRoute[hash]();
  containerRoot.appendChild(component);
};
/** Se muestra el template si la ruta esta dentro del objeto */
export const changeRoute = (hash) => {
  if (Object.keys(objectRoute).includes(hash)) {
    return showTemplate(hash);
  } /** Si la ruta no esta definida en el objeto mostrar el template 404 not found */
  containerRoot.innerHTML = '';
  return containerRoot.appendChild(nFound());
};
