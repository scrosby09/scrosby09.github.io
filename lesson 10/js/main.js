/**
 * STORM CENTER RATING
 */
function stormRating(rating) {
    document.getElementById("rating-num").innerHTML = rating;
}

/**
 * DATE FOOTER
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

/**
 * FRIDAYS BANNER
 */
document.getElementById("banner-friday").innerHTML = banner();

function banner() {
    let today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[today.getDay()];
    if (day === "Friday") {
        document.getElementById("banner-friday").style.display = "flex";
    } else {
        document.getElementById("banner-friday").style.display = "none";
    }
    return "Saturday = Preston Pancakes in the Park!  9:00 a.m. Saturday at the city park pavilion."
}

/**
 * GALLERY IMAGES
 */
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

/**
 * TOWN CARDS GALLERY
 */
const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.table(jsonObject);
        const towndata = jsonObject['towns'];
        const featuredTowns = ["Fish Haven", "Soda Springs", "Preston"];
        for (let i = 0; i < towndata.length; i++) {
            if (featuredTowns.includes(towndata[i].name)) {

                // Create necessary HTML elements
                let newCard = document.createElement('div');
                let contentBlock = document.createElement('div');
                let townName = document.createElement('h3');
                let townMotto = document.createElement('p');
                let yearFounded = document.createElement('p');
                let currentPop = document.createElement('p');
                let avgRainfall = document.createElement('p');
                let townPhoto = document.createElement('img');

                // Assign names to HTML elements
                newCard.className = 'towns-card-gallery card';
                newCard.id = towndata[i].name.toLowerCase().replace(' ', '_');
                contentBlock.className = 'town-info card';
                townMotto.className = 'town-slogan';

                //Add content to appropriate HTML elements.
                townName.textContent = towndata[i].name;
                townMotto.textContent = towndata[i].motto;
                yearFounded.textContent = "Year Founded: " + towndata[i].yearFounded;
                currentPop.textContent = "Population: " + towndata[i].currentPopulation;
                avgRainfall.textContent = "Annual Rain Fall: " + towndata[i].averageRainfall;
                townPhoto.setAttribute('src', "images/" + towndata[i].photo);
                townPhoto.setAttribute('alt', "A picture from somewhere in " + towndata[i].name + ".")

                //Add town info to new card content.
                newCard.appendChild(contentBlock);
                newCard.appendChild(townPhoto);
                contentBlock.appendChild(townName);
                contentBlock.appendChild(townMotto);
                contentBlock.appendChild(yearFounded);
                contentBlock.appendChild(currentPop);
                contentBlock.appendChild(avgRainfall);

                //Output card to HTML document.
                document.getElementById('town-cards').appendChild(newCard);
            }
        }
    })

/**
 * WINDCHILL FUNCTION
 */
document.getElementById("windChill").innerHTML = windChill();

function windChill() {
    // Temperature Variables
    let windSpeed;
    let highTemperature;
    let highNum = document.getElementById("highNum").textContent;
    let high1 = parseInt(highNum[6]);
    let high2 = parseInt(highNum[7]);
    let temp = [];

    // Check-Validate Number
    if (typeof high1 == 'number') {
        temp.push(high1);
    } else {
        console.log("Not a valid number");
    }
    if (typeof high2 == 'number') {
        temp.push(high2);
    } else {
        console.log("Not a valid number");
    }

    // Calculate Temperature
    if (temp.length === 2) {
        highTemperature = parseInt("" + temp[0] + temp[1]);
    } else {
        highTemperature = temp[0];
    }

    // Windspeed Variables
    let wind = document.getElementById("windSpeed").textContent;
    let w = parseInt(wind[12]);
    let w2 = parseInt(wind[13]);
    let winds = [];

    // Check-Validate Number
    if (typeof w == 'number') {
        winds.push(w);
    } else {
        console.log("Not a valid number");
    }
    if (typeof w2 == 'number') {
        winds.push(w2);
    } else {
        console.log("Not a valid number");
    }

    // Calculate Windspeed
    if (winds.length === 2) {
        windSpeed = parseInt("" + winds[0] + winds[1]);
    } else {
        windSpeed = winds[0];
    }

    // Calculate Windchill
    let windchill = 35.74 + (0.6215 * highTemperature) - (35.75 * Math.pow(windSpeed, .16)) + (0.4275 * highTemperature * Math.pow(windSpeed, .16));
    windchill = Math.round(windchill);

    // Return
    if (highTemperature <= 50 && windSpeed > 3) {
        return "<b>Wind Chill: </b>" + windchill + " &#176F";
    } else {
        return "<b>Wind Chill: </b>" + "N/A";
    }
}