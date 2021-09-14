/** Funcion para validar fecha  */
export const validDate = (date) => {
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const yearOfBirth = date.split('-');

  currentYear -= parseInt(yearOfBirth[0], 10);
  currentYear = currentYear >= 100 || currentYear < 12;
  return currentYear;
};
