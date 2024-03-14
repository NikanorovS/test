export function setCurrentDate() {
    var currentDateElement = document.getElementById('currentDate');
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    if (month < 10) {
        month = '0' + month;
    }
    var formattedDate = day + '.' + month + '.' + year;
    currentDateElement.textContent += formattedDate;
}