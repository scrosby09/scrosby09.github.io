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

function townIDLookup() {
    const pathName = window.location.pathname;
    for (i = 0; i < townIDs.length; i++) {
        let townName = townIDs[i].name;
        if (pathName.includes(townName)) {
            return townIDs[i].id;
        }
    }
}

const townID = townIDLookup();
const appID = "1baa862cedcf9f408f4fdb40df762b22";
const unit = "imperial";
const currentWeatherDataURL = "https://api.openweathermap.org/data/2.5/weather?id=" + townID + "&units=" + unit + "&APPID=" + appID;
const forecastDataURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + townID + "&units=" + unit + "&APPID=" + appID;

const windChillCalc = (t, s) => {
    let windChill = 'N/A';
    if (t <= 50 && s > 3.0) {
        windChill = 35.74 + 0.6215 * t - 35.75 * Math.pow(s, 0.16) + 0.4275 * t * Math.pow(s, 0.16);
        return Math.round(windChill) + "&deg;F";
    } else {
        return windChill;
    }
}

fetch(currentWeatherDataURL)
    .then((response) => response.json())
    .then((currentWeatherObject) => {
        //console.log(currentWeatherObject);
        let h = currentWeatherObject.main.temp_max;
        let l = currentWeatherObject.main.temp_min;
        let t = currentWeatherObject.main.temp;
        let s = currentWeatherObject.wind.speed;
        document.getElementById("weather_desc").innerText = currentWeatherObject.weather[0].main;
        document.getElementById("high_low_temp").innerHTML = Math.round(h) + "&deg;F / " + Math.round(l) + "&deg;F";
        document.getElementById("current_temp").innerHTML = Math.round(t) + "&deg;F";
        document.getElementById("wind_chill").innerHTML = windChillCalc(t, s);
        document.getElementById("humidity").innerHTML = currentWeatherObject.main.humidity + "&percnt;";
        document.getElementById("wind_speed").innerText = Math.round(s) + "mph";
    });

fetch(forecastDataURL)
    .then((response) => response.json())
    .then((weatherForecastObject) => {
        //console.log(weatherForecastObject);
        for (i = 0; i < weatherForecastObject.list.length; i++) {
            let dateCheck = weatherForecastObject.list[i].dt_txt;
            if (dateCheck.includes("18:00:00")) {
                //Create day wrapper
                let newDay = document.createElement("div");
                newDay.className = "daily-forecast";
                //Format and append Weekday
                let fullDate = new Date(weatherForecastObject.list[i].dt_txt);
                let dateOptions = {
                    weekday: 'long'
                };
                let weekDay = fullDate.toLocaleDateString("en-US", dateOptions);
                let dayOfWeek = document.createElement("div");
                dayOfWeek.className = "day-of-week";
                dayOfWeek.innerText = weekDay;
                newDay.appendChild(dayOfWeek);
                //Create weather detail wrapper
                let weather = document.createElement("div");
                weather.className = "weather";
                //Create and append image to weather detail wrapper
                let weatherIcon = document.createElement("img");
                weatherIcon.setAttribute('src', 'https://openweathermap.org/img/w/' + weatherForecastObject.list[i].weather[0].icon + '.png');
                weatherIcon.setAttribute('alt', weatherForecastObject.list[i].weather[0].description);
                weather.appendChild(weatherIcon);
                //Create and append high/low to weather detail wrapper
                let temp = document.createElement("p");
                temp.innerHTML = Math.round(weatherForecastObject.list[i].main.temp) + "&deg;F";
                weather.appendChild(temp);
                //Append weather info to day wrapper
                newDay.appendChild(weather);
                //Output new day in forecast
                document.getElementById("forecast_wrapper").appendChild(newDay);
            }
        }
    });