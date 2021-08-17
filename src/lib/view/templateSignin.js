export const signin = () => {
  const divSignin = document.createElement('div');

  const viewSignin = `
    <h1>registro</h1>
    <a href="#/">Inicia Sesión</a>
     <a href="#/signin">Registrate</a>
    `;
  divSignin.innerHTML = viewSignin;
  return divSignin;
};
