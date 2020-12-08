/*
* NAVIGATION BAR TOGGLE
*
* */
function toggleMenu() {
    document.getElementsByClassName("nav-bar")[0].classList.toggle("menu-open");
}

/*
* FOOTER DATE
*
* */
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

/*
* FRIDAYS BANNER
*
* */

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

const townIDs = [{
    name: 'fish-haven',
    id: '5585010'
}, {
    name: 'preston',
    id: "5604473"
}, {
    name: 'soda-springs',
    id: '5607916'
}];

// MATCH TOWN ID PATHNAME
function matchTownId() {
    const pathName = window.location.pathname;
    for (let i = 0; i < townIDs.length; i++) {
        let townName = townIDs[i].name;
        if (pathName.includes(townName)) {
            return townIDs[i].id;
        }
    }
}

const townID = matchTownId();
const appID = "4a734b6bccba91cbab2bd77dba07fc5c";
const unit = "imperial";
const currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?id=" + townID + "&units=" + unit + "&APPID=" + appID;
const weatherForecastAPI = "https://api.openweathermap.org/data/2.5/forecast?id=" + townID + "&units=" + unit + "&APPID=" + appID;

// FETCH CURRENT WEATHER DATA
fetch(currentWeatherAPI)
    .then((response) => response.json())
    .then((weatherToday) => {
        let max_temp = weatherToday.main.temp_max;
        let min_temp = weatherToday.main.temp_min;
        let current_temp = weatherToday.main.temp;
        let wind_speed = weatherToday.wind.speed;

        document.getElementById("current-conditions").innerText = weatherToday.weather[0].main;
        document.getElementById("high-temp").innerHTML = Math.round(max_temp) + "&deg;F / " + Math.round(min_temp) + "&deg;F";
        document.getElementById("current-temp").innerHTML = Math.round(current_temp) + "&deg;F";
        document.getElementById("wind-chill").innerHTML = calcWindChill(current_temp, wind_speed);
        document.getElementById("humidity").innerHTML = weatherToday.main.humidity + "&percnt;";
        document.getElementById("wind-speed").innerText = Math.round(wind_speed) + "mph";
    });

// WINDCHILL
const calcWindChill = (current_temp, wind_speed) => {
    let wind_chill = 'N/A';
    if (current_temp <= 50 && wind_speed > 3.0) {
        wind_chill = 35.74 + 0.6215 * current_temp - 35.75 * Math.pow(wind_speed, 0.16) + 0.4275 * current_temp * Math.pow(wind_speed, 0.16);
        return Math.round(wind_chill) + "&deg;F";
    } else {
        return wind_chill;
    }
}

// FETCH WEATHER FORECAST DATA
fetch(weatherForecastAPI)
    .then((response) => response.json())
    .then((weatherForecast) => {

        //console.log(weatherForecast);
        for (let i = 0; i < weatherForecast.list.length; i++) {
            let check_date = weatherForecast.list[i].dt_txt;
            if (check_date.includes("18:00:00")) {

                //Create day wrapper
                let forecast_day = document.createElement("div");
                forecast_day.className = "day-weather-forecast";

                //Format and append Weekday
                let forecast_date = new Date(weatherForecast.list[i].dt_txt);
                let forecast_option = {
                    weekday: 'long'
                };
                let weekDay = forecast_date.toLocaleDateString("en-US", forecast_option);
                let dayOfWeek = document.createElement("div");
                dayOfWeek.className = "day-of-week";
                dayOfWeek.innerText = weekDay;
                forecast_day.appendChild(dayOfWeek);

                //Create weather detail wrapper
                let weather = document.createElement("div");
                weather.className = "weather";

                //Create and append image to weather detail wrapper
                let weatherIcon = document.createElement("img");
                weatherIcon.setAttribute('src', 'https://openweathermap.org/img/w/' + weatherForecast.list[i].weather[0].icon + '.png');
                weatherIcon.setAttribute('alt', weatherForecast.list[i].weather[0].description);
                weather.appendChild(weatherIcon);

                //Create and append high/low to weather detail wrapper
                let temp = document.createElement("p");
                temp.innerHTML = Math.round(weatherForecast.list[i].main.temp) + "&deg;F";
                weather.appendChild(temp);

                //Append weather info to day wrapper
                forecast_day.appendChild(weather);

                //Output new day in weather-forecast
                document.getElementById("fiveday_forecast").appendChild(forecast_day);
            }
        }
    });

// FETCH TOWN DATA JSON
const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.table(jsonObject);
        const towndata = jsonObject['towns'];
        const display_towns = ["Fish Haven", "Soda Springs", "Preston"];
        for (let i = 0; i < towndata.length; i++) {
            if (display_towns.includes(towndata[i].name)) {

                // Create necessary HTML elements
                let town_card = document.createElement('div');
                let contentBlock = document.createElement('div');
                let townName = document.createElement('h3');
                let townMotto = document.createElement('p');
                let yearFounded = document.createElement('p');
                let currentPop = document.createElement('p');
                let avgRainfall = document.createElement('p');
                let townPhoto = document.createElement('img');

                // Assign names to HTML elements
                town_card.className = 'town-cards card';
                town_card.id = towndata[i].name.toLowerCase().replace(' ', '_');
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
                town_card.appendChild(contentBlock);
                town_card.appendChild(townPhoto);
                contentBlock.appendChild(townName);
                contentBlock.appendChild(townMotto);
                contentBlock.appendChild(yearFounded);
                contentBlock.appendChild(currentPop);
                contentBlock.appendChild(avgRainfall);

                //Output card to HTML document.
                document.getElementById('town-cards').appendChild(town_card);
            }
        }
    })

// SLUGIFY TOWN NAME
function matchupTowns() {
    const path_name = window.location.pathname;
    const slug_extension = path_name.split("/")[2];
    const slug_town = slug_extension.split(".")[0];
    return slug_town.replace('-', ' ');
}

const matchTown = matchupTowns();

fetch(requestURL)
    .then((response) => response.json())
    .then((town_data) => {
        console.log(town_data);
        for (let i = 0; i < town_data.towns.length; i++) {
            let town_match = town_data.towns[i].name.toLowerCase();
            if (matchTown === town_match) {
                let events_array = town_data.towns[i].events;
                for (let event = 0; event < events_array.length; event++) {
                    let future_event = document.createElement('li');
                    future_event.innerText = events_array[event];
                    document.getElementById('listed-events').appendChild(future_event);
                }

            }

        }
    })