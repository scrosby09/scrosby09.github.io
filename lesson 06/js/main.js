/***
 * DATE FOOTER
 */
document.getElementById("updated").innerHTML = todayDate();
function todayDate() {
    let today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    let month = months[today.getMonth()];
    let day = days[today.getDay()];
    let dayDate = today.getDate();
    let year = today.getFullYear();
    return  day + ", " + dayDate + " " + month + " " + year;
}

/***
 * NAV TOGGLE
 */
function toggleMenu ()  {
    if (document.getElementsByClassName("nav-bar")[0].classList === "navigation"){
        document.getElementsByClassName("nav-bar")[0].classList.toggle("responsive");
        document.getElementById("nav-toggle").innerHTML= "&#x2715";
    } else {
        document.getElementsByClassName("nav-bar")[0].classList.toggle("responsive");
        document.getElementById("nav-toggle").innerHTML= "&#9776 Menu";
    }

}

/***
 * BANNER FOR FRIDAYS
 */
document.getElementById("banner-friday").innerHTML = banner();
function banner() {
    let today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[today.getDay()];
    if (day === "Friday") {
        document.getElementById("banner-friday").style.display="flex";
    } else {
        document.getElementById("banner-friday").style.display="none";
    }
    return "Saturday = Preston Pancakes in the Park!  9:00 a.m. Saturday at the city park pavilion."
}