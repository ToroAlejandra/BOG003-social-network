import { login } from './view/templateLogin.js';
import { signin } from './view/templateSignin.js';
import { home } from './view/templateHome.js';

const showTemplate = (hash) => {
  const containerRoot = document.getElementById('root');
  containerRoot.innerHTML = '';

  switch (hash) {
    case '#/':
      containerRoot.appendChild(login());
      break;
    case '#/signin':
      containerRoot.appendChild(signin());
      break;
    default:
      containerRoot.innerHTML = '<h2>No existe</h2>';
  }
};
export const changeRoute = (hash) => {
  if (hash === '#/') {
    return showTemplate(hash);
  } else if (hash === '#/login') {
    return showTemplate(hash);
  } else {
    return showTemplate(hash);
  }
};
