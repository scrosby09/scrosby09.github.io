//Toggle Menu Start
function toggleMenu() {
    document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
}

//Current Date Updated Start
const daynames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const d = new Date();
const dayName = daynames[d.getDay()];
const monthName = months[d.getMonth()];
const year = d.getFullYear();
const fulldate = `${dayName}, ${d.getDate()} ${monthName} ${year}`;
document.getElementById("updated").textContent = fulldate;


//Pancake Display Banner 

const banner = document.getElementById('banner');
if (d.getDay() == 5) {
    banner.style.display = 'block';
}
else {
    banner.style.display = 'none';
}

function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("hide");
}

function date() {
    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var d = new Date();
    var weekday = d.getDay();
    var dayOfMonth = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();

    var fullDate = weekdays[weekday] + ', ' + dayOfMonth + " " + months[month] + " " + year;
    document.getElementById("modified").innerHTML = fullDate;

    if (weekday === 5) {
        document.getElementById("announcements").innerHTML = "Saturday = Preston Pancakes in the Park!  9:00 a.m. Saturday at the city park pavilion.";
        document.getElementById("announcements").style.display = "block";
    }
}