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
            const rentals = jsonObject['rentals'];

            for (let i = 0; i < rentals.length; i++) {
                //Create section/Image
                let card = document.createElement('div');
                card.setAttribute('class', 'rentalDiv')
                let image = document.createElement('img');
                image.setAttribute('src', './images/' + rentals[i].picture);
                image.setAttribute('alt', rentals[i].name);
                image.setAttribute('class', 'rentalImage');

                //Create div for rental picture
                let detail = document.createElement('section');
                detail.setAttribute('class', 'rentalDetail')

                let name = document.createElement('h4');
                name.textContent = rentals[i].name;

                let capacity = document.createElement('p');
                capacity.textContent = "Max person(s): " + rentals[i].capacity;
                let rental_price_4hours = document.createElement('p');
                rental_price_4hours.textContent = rentals[i].rental_price_4hours;

                let rental_price_6hours = document.createElement('p');
                rental_price_6hours.textContent = rentals[i].rental_price_6hours;

                let rental_price_allday = document.createElement('p');
                rental_price_allday.textContent = rentals[i].rental_price_allday;

                //Add elements into section
                card.appendChild(image);
                card.appendChild(detail);
                detail.appendChild(name);
                detail.appendChild(capacity);
                detail.appendChild(rental_price_4hours);
                detail.appendChild(rental_price_6hours);
                detail.appendChild(rental_price_allday);
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
                    return;
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

/*Slide Show*/
let slideIndex = 1;
showSlides(slideIndex);

/* Next/previous controls*/
function plusSlides(n) {
    showSlides(slideIndex += n);
}

/* Thumbnail image controls*/
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
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
            let reset = 0;
            for (let i = 0; i < locationList.length; i++) {
                let forecastDay = locationList[i].dt_txt;
                if (forecastDay.substr(11, 19) === '18:00:00') {
                    reset++
                    /*Get correct forecastDay for forecast*/
                    /*Display as Month/Day*/
                    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    let forecastDate = parseFloat((forecastDay[5] + forecastDay[6]) - 1);
                    let date = forecastDay[8] + forecastDay[9];
                    let month = monthList[forecastDate];
                    let fullDate = month + " " + date;
                    let dateElement = 'date' + reset;
                    document.getElementById(dateElement).innerHTML = fullDate;

                    /*Get description*/
                    let weather = locationList[i].weather[0].description;
                    let description = weather.charAt(0).toUpperCase() + weather.slice(1);
                    let weather_description = 'condition' + reset;
                    document.getElementById(weather_description).innerHTML = description;

                    /*Get temp-max*/
                    let high_temp = Math.round(locationList[i].main.temp_max) + " &#176;F";
                    let forecast_high = 'day' + reset + '_weather';
                    document.getElementById(forecast_high).innerHTML = high_temp;

                    /*Icon for weather*/
                    const weather_image = 'https://openweathermap.org/img/w/' + locationList[i].weather[0].icon + '.png';
                    let forecast_icon = 'weather_icon' + reset;
                    document.getElementById(forecast_icon).setAttribute('src', weather_image);
                    document.getElementById(forecast_icon).setAttribute('alt', description);
                }
            }
        });
}