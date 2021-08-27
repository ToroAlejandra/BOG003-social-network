
export const validDate = (date) => {

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let yearOfBirth = date.split('-');

    currentYear = currentYear - parseInt(yearOfBirth[0]);
    console.log(currentYear);
    if(currentYear>=100 || currentYear < 12){
        return true;

    } else {
        return false;
    }
} 