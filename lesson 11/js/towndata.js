const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        //console.table(jsonObject);
        const towndata =jsonObject['towns'];
        const featuredTowns = ["Fish Haven", "Soda Springs", "Preston"];
        for (let i = 0; i < towndata.length; i++) {
            if(featuredTowns.includes(towndata[i].name)) {
                //Create needed HTML elements.
                let newCard = document.createElement('div');
                let newCardLink = document.createElement('a');
                let contentBlock = document.createElement('div');
                let townName = document.createElement('h3');
                let townMotto = document.createElement('p');
                let yearFounded = document.createElement('p');
                let currentPop = document.createElement('p');
                let avgRainfall = document.createElement('p');
                let townPhoto = document.createElement('img');
                //Assign necessary class/id names to appropriate HTML elements.
                newCard.className = 'town-wrapper white-accent box-shadow leaf-shape-right';
                newCardLink.id = towndata[i].name.toLowerCase().replace(' ','_');
                contentBlock.className = 'town-info';
                townMotto.className = 'town-motto';
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
                //Create link to town page and append card
                let newCardLinkURL = towndata[i].name.toLowerCase().replace(' ','-') + ".html";
                newCardLink.setAttribute('href', newCardLinkURL);
                newCardLink.appendChild(newCard);
                //Output card to HTML document.
                document.getElementById('town-cards').appendChild(newCardLink);


            }

        }

    })