/**********************
 * CALCULATE WIND CHILL
 **********************/

document.getElementById("windchill").innerHTML = windChill();

function windChill() {
    /**
    * TEMP*/
    let windspeed;
    let hightemp;
    let high = document.getElementById("high").textContent;
    let high1 = parseInt(high[6]);
    let high2 = parseInt(high[7]);
    let temp = [];
    /**
    * check number is valid */
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

    /**
    * send temp*/
    if (temp.length === 2) {
        hightemp = parseInt("" + temp[0] + temp[1]);
    } else {
        hightemp = temp[0];
    }

    /**
    * WINDSPEED*/
    let wind = document.getElementById("windspeed").textContent;
    let w = parseInt(wind[12]);
    let w2 = parseInt(wind[13]);
    let winds = [];
    /**
    * check number is valid */
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

        /**
        * send windspeed*/
        if (winds.length === 2) {
            windspeed = parseInt("" + winds[0] + winds[1]);
        } else {
            windspeed = winds[0];
        }

    /**
    * WINDCHILL*/
    let windchill = 35.74 + (0.6215 * hightemp) - (35.75 * Math.pow(windspeed, .16)) + (0.4275 * hightemp * Math.pow(windspeed, .16));
    /**
     * format*/
    windchill = Math.round(windchill);

    /**
     * return*/
    if (hightemp <= 50 && windspeed > 3) {
        return "<b>Wind Chill: </b>" + windchill + " &#176F";
    } else {
        return "<b>Wind Chill: </b>" + "N/A";
    }
}