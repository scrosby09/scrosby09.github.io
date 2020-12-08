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
    for (let i = 0; i < townIDs.length; i++) {
        let townName = townIDs[i].name;
        if (pathName.includes(townName)) {
            return townIDs[i].id;
        }
    }
}

const townID = townIDLookup();
const appID = "4a734b6bccba91cbab2bd77dba07fc5c";
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
        document.getElementById("currentCondition").innerText = currentWeatherObject.weather[0].main;
        document.getElementById("highTemp").innerHTML = Math.round(h) + "&deg;F / " + Math.round(l) + "&deg;F";
        document.getElementById("currentTemp").innerHTML = Math.round(t) + "&deg;F";
        document.getElementById("windChill").innerHTML = windChillCalc(t, s);
        document.getElementById("humidity").innerHTML = currentWeatherObject.main.humidity + "&percnt;";
        document.getElementById("windSpeed").innerText = Math.round(s) + "mph";
    });

fetch(forecastDataURL)
    .then((response) => response.json())
    .then((weatherForecastObject) => {

        //console.log(weatherForecastObject);
        for (let i = 0; i < weatherForecastObject.list.length; i++) {
            let dateCheck = weatherForecastObject.list[i].dt_txt;
            if (dateCheck.includes("18:00:00")) {
                //Create day wrapper
                let forecast_day = document.createElement("div");
                forecast_day.className = "forecast-day";

                //Format and append Weekday
                let full_date = new Date(weatherForecastObject.list[i].dt_txt);
                let date_selection = {
                    weekday: 'long'
                };
                let date_forecast = full_date.toLocaleDateString("en-US", date_selection);
                let day_forecast = document.createElement("div");
                day_forecast.className = "day-forecast";
                day_forecast.innerText = date_forecast;
                forecast_day.appendChild(day_forecast);

                //Create weather detail wrapper
                let weather = document.createElement("div");
                weather.className = "weather";

                //Create and append image to weather detail wrapper
                let weather_icon = document.createElement("img");
                weather_icon.setAttribute('src', 'https://openweathermap.org/img/w/' + weatherForecastObject.list[i].weather[0].icon + '.png');
                weather_icon.setAttribute('alt', weatherForecastObject.list[i].weather[0].description);
                weather.appendChild(weather_icon);

                //Create and append high/low to weather detail wrapper
                let temp = document.createElement("p");
                temp.innerHTML = Math.round(weatherForecastObject.list[i].main.temp) + "&deg;F";
                weather.appendChild(temp);

                //Append weather info to day wrapper
                forecast_day.appendChild(weather);

                //Output new day in weather-forecast
                document.getElementById("forecast-container").appendChild(forecast_day);
            }
        }
    });