/**
 * FOOTER DATE */
document.getElementById("updated").innerHTML = "Last updated: " + document.lastModified;

/**
 * NAVIGATION TOGGLE MENU */
function toggleMenu() {
    if (document.getElementsByClassName("navMenu")[0].classList === "navMenu") {
        document.getElementsByClassName("navMenu")[0].classList.toggle("responsive");
        document.getElementById("ham").innerHTML = "&#x2715";
    } else {
        document.getElementsByClassName("navMenu")[0].classList.toggle("responsive");
        document.getElementById("ham").innerHTML = "&#9776 Menu";
    }
}

/**
 * CONFIG RENTALS DAYS VALUE */
function configDaysValue(rental_days) {
    document.getElementById("rental_days_value").innerHTML = rental_days;
}

/**
 * BUILD RENTALS BOOKINGS AND LISTINGS */
function getRentalData() {
    const rentalsData = 'https://raw.githubusercontent.com/scrosby09/scrosby09.github.io/master/final_project/data/rentals.json';
    fetch(rentalsData)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {
            console.table(jsonObject);
            const rent = jsonObject['rent'];

            for (let i = 0; i < rent.length; i++) {
                //Create section/Image
                let card = document.createElement('div');
                card.setAttribute('class', 'rentalDiv')
                let image = document.createElement('img');
                image.setAttribute('src', './Images/' + rent[i].picture);
                image.setAttribute('alt', rent[i].name);
                image.setAttribute('class', 'rentalImage');

                //Create div for rental picture
                let detail = document.createElement('section');
                detail.setAttribute('class', 'rentalDetail')
                let name = document.createElement('h4');
                name.textContent = rent[i].name;
                let capacity = document.createElement('p');
                capacity.textContent = "Max person(s): " + rent[i].person;
                let reserveFull = document.createElement('p');
                reserveFull.textContent = rent[i].reservprices_full;
                let reserveHalf = document.createElement('p');
                reserveHalf.textContent = rent[i].reservprices_half;
                let walkFull = document.createElement('p');
                walkFull.textContent = rent[i].walkprices_full;
                let walkHalf = document.createElement('p');
                walkHalf.textContent = rent[i].walkprices_half;

                //Add elements into section
                card.appendChild(image);
                card.appendChild(detail);
                detail.appendChild(name);
                detail.appendChild(capacity);
                detail.appendChild(reserveFull);
                detail.appendChild(reserveHalf);
                detail.appendChild(walkFull);
                detail.appendChild(walkHalf);
                document.getElementById('rental').appendChild(card);
            }
        });
}

/**
 * BUILD RENTALS IMAGES */
function getRentalImages() {
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
        imagesToLoad.forEach((img) => {
            loadImages(img);
        });
    }
}

/**
 * HOMEPAGE RENTAL CAROUSEL */
let init_carousel = 1;
rentalCarousel(init_carousel);

function advanceDisplay(n) {
    rentalCarousel(init_carousel += n);
}

function currentDisplay(n) {
    rentalCarousel(init_carousel = n);
}

function rentalCarousel(n) {
    let i;
    const displayRental = document.getElementsByClassName("scoots_rental_item");
    const displayDots = document.getElementsByClassName("carousel_dot");
    if (n > displayRental.length) {
        init_carousel = 1
    }
    if (n < 1) {
        init_carousel = displayRental.length
    }
    for (i = 0; i < displayRental.length; i++) {
        displayRental[i].style.display = "none";
    }
    for (i = 0; i < displayDots.length; i++) {
        displayDots[i].className = displayDots[i].className.replace(" active", "");
    }
    displayRental[init_carousel - 1].style.display = "block";
    displayDots[init_carousel - 1].className += " active";
}

/**
 * BUILD WEATHER TODAY DISPLAY */
function getWeather() {
    const weatherAPI = "https://api.openweathermap.org/data/2.5/weather?id=3530103&units=imperial&APPID=4a734b6bccba91cbab2bd77dba07fc5c";
    fetch(weatherAPI)
        .then((response) => response.json())
        .then((currentWeather) => {
            console.log(currentWeather);
            let highTemp = currentWeather.main.temp_max;
            let lowTemp = currentWeather.main.temp_min;
            let currentTemp = currentWeather.main.temp;
            let windSpeed = currentWeather.wind.speed;
            document.getElementById("weather_now").innerText = currentWeather.weather[0].main;
            document.getElementById("high_low").innerHTML = Math.round(highTemp) + " &deg;F / " + Math.round(lowTemp) + " &deg;F";
            document.getElementById("current_temp").innerHTML = Math.round(currentTemp) + " &deg;F";
            document.getElementById("humidity").innerHTML = currentWeather.main.humidity + " &percnt;";
            document.getElementById("wind_speed").innerText = Math.round(windSpeed) + "mph";
        });
}

/**
 * BUILD WEATHER FORECAST DISPLAY */
function getForecast() {
    const forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?id=3530103&units=imperial&APPID=4a734b6bccba91cbab2bd77dba07fc5c";
    fetch(forecastAPI)
        .then((response) => response.json())
        .then((location) => {
            console.log(location);
            const locationList = location.list;
            let counter = 0;
            for (let i = 0; i < locationList.length; i++) {
                let forecastDay = locationList[i].dt_txt;
                if (forecastDay.substr(11, 19) === '18:00:00') {
                    counter++
                    /*Get correct forecastDay for forecast*/
                    /*Display as Month/Day*/
                    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    let monthDate = parseInt((forecastDay[5] + forecastDay[6]) - 1);
                    let date = forecastDay[8] + forecastDay[9];
                    let month = months[monthDate];
                    let fullDate = month + " " + date;
                    let dateElement = 'date' + counter;
                    document.getElementById(dateElement).innerHTML = fullDate;

                    /*Get description*/
                    let discriptionLower = locationList[i].weather[0].description;
                    let discription = discriptionLower.charAt(0).toUpperCase() + discriptionLower.slice(1);
                    let discriptionElement = 'condition' + counter;
                    document.getElementById(discriptionElement).innerHTML = discription;

                    /*Get temp-max*/
                    let temp = Math.round(locationList[i].main.temp_max) + " &#176;F";
                    let tempElement = 'day' + counter + '_weather';
                    document.getElementById(tempElement).innerHTML = temp;

                    /*Icon for weather*/
                    const imagesrc = 'https://openweathermap.org/img/w/' + locationList[i].weather[0].icon + '.png';
                    let imageElement = 'weather_icon' + counter;
                    document.getElementById(imageElement).setAttribute('src', imagesrc);
                    document.getElementById(imageElement).setAttribute('alt', discription);
                }
            }
        });
}