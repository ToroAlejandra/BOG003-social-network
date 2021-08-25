/** Crear div que contiene template de home*/
export const home = () => {
  const divHome = document.createElement('div');
  const viewHome =
    `<h1>Home</h1>`
  divHome.innerHTML = viewHome;
  return divHome;
}