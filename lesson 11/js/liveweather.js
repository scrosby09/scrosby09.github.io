const town_id = [{
    name: 'fish-haven',
    id: '5585010'
}, {
    name: 'preston',
    id: "5604473"
}, {
    name: 'soda-springs',
    id: '5607916'
}];

function town_id_match() {
    const pathName = window.location.pathname;
    for (let i = 0; i < town_id.length; i++) {
        let townName = town_id[i].name;
        if (pathName.includes(townName)) {
            return town_id[i].id;
        }
    }
}

const town_match = town_id_match();
const api_id = "4a734b6bccba91cbab2bd77dba07fc5c";
const metric = "imperial";
const weather_api_url = "https://api.openweathermap.org/data/2.5/weather?id=" + town_match + "&units=" + metric + "&APPID=" + api_id;
const forecast_api_url = "https://api.openweathermap.org/data/2.5/forecast?id=" + town_match + "&units=" + metric + "&APPID=" + api_id;

const windchill_calculator = (temp, windspeed) => {
    let wind_chill = 'N/A';
    if (temp <= 50 && windspeed > 3.0) {
        wind_chill = 35.74 + 0.6215 * temp - 35.75 * Math.pow(windspeed, 0.16) + 0.4275 * temp * Math.pow(windspeed, 0.16);
        return Math.round(wind_chill) + "&deg;F";
    } else {
        return wind_chill;
    }
}

fetch(weather_api_url)
    .then((response) => response.json())
    .then((current_weather) => {

        let high_temp = current_weather.main.temp_max;
        let low_temp = current_weather.main.temp_min;
        let current_temp = current_weather.main.temp;
        let wind_speed = current_weather.wind.speed;
        document.getElementById("current-conditions").innerText = current_weather.weather[0].main;
        document.getElementById("high-temp").innerHTML = Math.round(high_temp) + "&deg;F / " + Math.round(low_temp) + "&deg;F";
        document.getElementById("current-temp").innerHTML = Math.round(current_temp) + "&deg;F";
        document.getElementById("wind-chill").innerHTML = windchill_calculator(current_temp, wind_speed);
        document.getElementById("humidity").innerHTML = current_weather.main.humidity + "&percnt;";
        document.getElementById("wind-speed").innerText = Math.round(wind_speed) + "mph";
    });

fetch(forecast_api_url)
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
                day_forecast.className = "day-forecast card2";
                day_forecast.innerText = date_forecast;
                daily_forecast.appendChild(day_forecast);

                // Build Weather Content
                let weather = document.createElement("div");
                weather.className = "weather card";

                // Append Weather Icon
                let weather_icon = document.createElement("img");
                weather_icon.setAttribute('src', 'https://openweathermap.org/img/w/' + weather_forecast.list[i].weather[0].icon + '.png');
                weather_icon.setAttribute('alt', weather_forecast.list[i].weather[0].description);
                weather.appendChild(weather_icon);

                // Append High-Low Temp
                let temp = document.createElement("p");
                temp.innerHTML = Math.round(weather_forecast.list[i].main.temp) + "&deg;F";
                weather.appendChild(temp);

                //Append Daily Forecast and Weather
                daily_forecast.appendChild(weather);

                //Output To HTML
                document.getElementById("fiveday-forecast").appendChild(daily_forecast);
            }
        }
    });