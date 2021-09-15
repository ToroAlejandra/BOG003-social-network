/** Crear div que contiene template de notFound */
export const nFound = () => {
  const divnFound = document.createElement('div');
  const viewnFound = `
  <div class = 'body-notFound'>
    <div id='img-notFound'> </div>
    <p>Página no encontrada</p>
    <a href="#/">Regresar al inicio</a>
  </div>
      
      `;
  divnFound.innerHTML = viewnFound;
  return divnFound;
};
