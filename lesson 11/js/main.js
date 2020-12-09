/**
 * DATE FOOTER
 *
 */
document.getElementById("updated").innerHTML = todayDate();

function todayDate() {
    let today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[today.getMonth()];
    let day = days[today.getDay()];
    let dayDate = today.getDate();
    let year = today.getFullYear();
    return day + ", " + dayDate + " " + month + " " + year;
}

/**
 * NAVIGATION BAR TOGGLE
 *
 */
function toggleMenu() {
    if (document.getElementsByClassName("nav-bar")[0].classList === "navigation") {
        document.getElementsByClassName("nav-bar")[0].classList.toggle("responsive");
        document.getElementById("nav-toggle").innerHTML = "&#x2715";
    } else {
        document.getElementsByClassName("nav-bar")[0].classList.toggle("responsive");
        document.getElementById("nav-toggle").innerHTML = "&#9776 Menu";
    }

}

/*
* FRIDAYS BANNER
*
* */
function displayBanner() {
    document.getElementById("friday-banner").style.display = "block";
}

try {
    let currentDate = new Date;
    let currentDay = currentDate.getDay();
    if (currentDay === 5) {
        displayBanner();
    }
} catch (e) {
    alert("Error with code or your browser does not support Locale.")
}

/*
* WEATHER IMAGES GALLERY
*
* */
const images = document.querySelectorAll("img[data-src]");

const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 50px 0px"
};

const loadImages = (img) => {
    img.setAttribute('src', img.getAttribute('data-src'));
    img.onload = () => {
        img.removeAttribute('data-src');
    };
}

if ("IntersectionObserver" in window) {
    const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach((entries) => {
            if (!entries.isIntersecting) {

            } else {
                loadImages(entries.target);
                imgObserver.unobserve(entries.target);
            }
        });
    }, imgOptions);

    images.forEach(image => {
        imgObserver.observe(image);
    });
} else {
    let imagesToLoad;
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}

/*
* STORM CENTER RATING
*
* */
function stormRating(rating) {
    document.getElementById("rating-num").innerHTML = rating;
}