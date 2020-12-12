/**
 * FOOTER DATE */
document.getElementById("modified").innerHTML = "Last updated: " + document.lastModified;

/**
 * NAVIGATION TOGGLE MENU */
function toggleMenu() {
    if (document.getElementsByClassName("navMenu")[0].classList === "navigation") {
        document.getElementsByClassName("navMenu")[0].classList.toggle("responsive");
        document.getElementById("ham").innerHTML = "&#x2715";
    } else {
        document.getElementsByClassName("navMenu")[0].classList.toggle("responsive");
        document.getElementById("ham").innerHTML = "&#9776 Menu";
    }

}

/**
 * BUILD RENTALS BOOKINGS AND LISTINGS */
function getVehicleData() {
    const rentalsData = 'https://raw.githubusercontent.com/scrosby09/scrosby09.github.io/master/final_project/data/rentals.json';

    fetch(rentalsData)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {
            console.table(jsonObject);
            const rentals = jsonObject['rentals'];

            // BUILD CONTENT AND HTML ELEMENTS
            for (let i = 0; i < rentals.length; i++) {
                // Build Rental Listing and Images
                let card = document.createElement('div');
                card.setAttribute('class', 'rentalsListing')
                let image = document.createElement('img');
                image.setAttribute('src', './images/' + rentals[i].picture);
                image.setAttribute('alt', rentals[i].name);
                image.setAttribute('class', 'rentalImage');

                // Build Rental Bookings Content
                let detail = document.createElement('div');
                detail.setAttribute('class', 'rentalVehicle')

                let name = document.createElement('h4');
                name.textContent = rentals[i].rental_name;

                let capacity = document.createElement('p');
                capacity.textContent = "Max Person Capacity: " + rentals[i].rental_capacity;

                let rental_price_4hours = document.createElement('p');
                rental_price_4hours.textContent = rentals[i].rental_price_4hours;

                let rental_price_6hours = document.createElement('p');
                rental_price_6hours.textContent = rentals[i].rental_price_6hours;

                let rental_price_allday = document.createElement('p');
                rental_price_allday.textContent = rentals[i].rental_price_allday;

                // Matchup data and send
                card.appendChild(image);
                card.appendChild(detail);
                detail.appendChild(name);
                detail.appendChild(capacity);
                detail.appendChild(rental_price_4hours);
                detail.appendChild(rental_price_6hours);
                detail.appendChild(rental_price_allday);
                document.getElementById('rentals').appendChild(card);
            }
        });
}

/**
 * BUILD RENTALS IMAGES */
function loadImages() {
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
 * CONFIG RENTALS DAYS VALUE */
function configDaysValue(rental_days) {
    document.getElementById("rental_days_value").innerHTML = rental_days;
}

/**
 * BUILD WEATHER TODAY DISPLAY */
function getWeatherToday() {
    const weather_api = "https://api.openweathermap.org/data/2.5/weather?id=3530103&units=imperial&APPID=4a734b6bccba91cbab2bd77dba07fc5c";
    fetch(weather_api)
        .then((response) => response.json())
        .then((current_weather) => {

            let high_temp = current_weather.main.temp_max;
            let low_temp = current_weather.main.temp_min;
            let temp_now = current_weather.main.temp;
            let feels_like = current_weather.main.feels_like;
            document.getElementById("today").innerText = current_weather.weather[0].main;
            document.getElementById("temp_now").innerHTML = Math.round(temp_now) + "&deg;F Right Now";
            document.getElementById("feels_like").innerText = Math.round(feels_like) + "&deg;F";
            document.getElementById("high_low").innerHTML = Math.round(high_temp) + "&deg;F High / " + Math.round(low_temp) + "&deg;F Low";
            document.getElementById("humidity").innerHTML = current_weather.main.humidity + "&percnt;";
        });
}

/**
 * BUILD WEATHER FORECAST DISPLAY */
function getWeatherForecast() {
    const forecast_api = "https://api.openweathermap.org/data/2.5/forecast?id=3530103&units=imperial&APPID=4a734b6bccba91cbab2bd77dba07fc5c";
    fetch(forecast_api)
        .then((response) => response.json())
        .then((weather_forecast) => {

            //console.log(weather_forecast);
            for (let i = 0; i < weather_forecast.list.length; i++) {
                let check_date = weather_forecast.list[i].dt_txt;
                if (check_date.includes("18:00:00")) {
                    // Build Daily Forecast
                    let daily_forecast = document.createElement("div");
                    daily_forecast.className = "forecast-day card2";

                    // Format and Append Day Forecast
                    let full_date = new Date(weather_forecast.list[i].dt_txt);
                    let date_selection = {
                        weekday: 'long'
                    };
                    let date_forecast = full_date.toLocaleDateString("en-US", date_selection);
                    let day_forecast = document.createElement("div");
                    day_forecast.className = "day-forecasts";
                    day_forecast.innerText = date_forecast;
                    daily_forecast.appendChild(day_forecast);

                    // Build Weather Content
                    let weather = document.createElement("div");
                    weather.className = "weather";

                    // Append Weather Icon
                    let weather_icon = document.createElement("img");
                    weather_icon.setAttribute('src', 'https://openweathermap.org/img/w/' + weather_forecast.list[i].weather[0].icon + '.png');
                    weather_icon.setAttribute('alt', weather_forecast.list[i].weather[0].description);
                    weather.appendChild(weather_icon);

                    // Append High-Low Temp
                    let temp = document.createElement("p");
                    temp.innerHTML = Math.round(weather_forecast.list[i].main.temp) + "%F";
                    weather.appendChild(temp);

                    //Append Daily Forecast and Weather
                    daily_forecast.appendChild(weather);

                    //Output To HTML
                    document.getElementById("fiveday-forecast").appendChild(daily_forecast);
                }
            }
        });
}