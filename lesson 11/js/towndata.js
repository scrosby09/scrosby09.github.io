const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {

        const towndata = jsonObject['towns'];
        const towns_gallery = ["Fish Haven", "Soda Springs", "Preston"];
        for (let i = 0; i < towndata.length; i++) {
            if (towns_gallery.includes(towndata[i].name)) {

                // Build Town Card Elements
                let town_card = document.createElement('div');
                let town_link = document.createElement('a');
                let town_content = document.createElement('div');
                let town_name = document.createElement('h3');
                let town_motto = document.createElement('p');
                let year_founded = document.createElement('p');
                let town_population = document.createElement('p');
                let town_rainfall = document.createElement('p');
                let town_picture = document.createElement('img');

                // Assign to HTML elements
                town_card.className = 'card container';
                town_link.id = towndata[i].name.toLowerCase().replace(' ', '_');
                town_content.className = 'town-info';
                town_motto.className = 'town-motto';

                // Match town data with elements
                town_name.textContent = towndata[i].name;
                town_motto.textContent = towndata[i].motto;
                year_founded.textContent = "Year Founded: " + towndata[i].yearFounded;
                town_population.textContent = "Population: " + towndata[i].currentPopulation;
                town_rainfall.textContent = "Annual Rain Fall: " + towndata[i].averageRainfall;
                town_picture.setAttribute('src', "images/" + towndata[i].photo);
                town_picture.setAttribute('alt', "A picture from somewhere in " + towndata[i].name + ".")

                // Insert content to town card
                town_card.appendChild(town_content);
                town_card.appendChild(town_picture);
                town_content.appendChild(town_name);
                town_content.appendChild(town_motto);
                town_content.appendChild(year_founded);
                town_content.appendChild(town_population);
                town_content.appendChild(town_rainfall);
                let newCardLinkURL = towndata[i].name.toLowerCase().replace(' ', '-') + ".html";
                town_link.setAttribute('href', newCardLinkURL);
                town_link.appendChild(town_card);

                // Output town card content to HTML
                document.getElementById('town-cards').appendChild(town_link);


            }

        }

    })

function town_matchup() {
    const town_path = window.location.pathname;
    const town_slugext = town_path.split("/")[2];
    const town_slug = town_slugext.split(".")[0];
    return town_slug.replace('-', ' ');
}

const currentTown = town_matchup();

fetch(requestURL)
    .then((response) => response.json())
    .then((town_event_data) => {
        console.log(town_event_data);
        for (let i = 0; i < town_event_data.towns.length; i++) {
            let town_match = town_event_data.towns[i].name.toLowerCase();
            if (currentTown === town_match) {
                let events_array = town_event_data.towns[i].events;
                for (j = 0; j < events_array.length; j++) {
                    let town_event = document.createElement('li');
                    town_event.innerText = events_array[j];
                    document.getElementById('town_event').appendChild(town_event);
                }

            }

        }
    })