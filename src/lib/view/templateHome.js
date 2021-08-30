import {signOut} from '../utils/firebaseIndex.js'

/** Crear div que contiene template de home*/
export const home = () => {
  const divHome = document.createElement('div');
  const viewHome =
    `<h1>Home</h1>
    <button class='btn-register' id='logOut'> Cierra sesión </button>
    `
  divHome.innerHTML = viewHome;

  let btnLogOut = divHome.querySelector('#logOut');
  btnLogOut.addEventListener('click', () => {
    signOut();
    window.location.hash = '#/';

  })

  return divHome;
}