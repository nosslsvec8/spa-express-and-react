function getCurrentDateForDB() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();

    return `${dateFormatInt(dd)}/${dateFormatInt(mm)}/${dateFormatInt(yyyy)}`;
}

function dateFormatInt(int) {
    return (int < 10) ? `0${int}` : int;
}

export default getCurrentDateForDB;
