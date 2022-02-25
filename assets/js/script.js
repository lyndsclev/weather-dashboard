// date variables 
var today = moment().format("dddd, MMMM, Do");
var displayToday = document.querySelector("#date");

// display today's date
displayToday.append(today);

// search form variables 
var cityInputEl = document.querySelector("#cityInput");
var searchBtn = document.querySelector("#searchBtn");

// today's weather variables 
var cityName = document.querySelector("#city-name");
var todayIcon = document.querySelector("#today-icon");
var todayTemp = document.querySelector("#today-temp");
var todayWind = document.querySelector("#today-wind");
var todayHumidity = document.querySelector("#today-humidity");
var todayUv = document.querySelector("#today-uv");

// 5-day forecast variables 
var fiveDayTitle = document.querySelector("#five-day-title");
var fiveDayColumns = document.querySelector("#five-day-columns");

// handle search input 
var searchHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim(); 

    if(city) {
      
        // pass argument to getCoords 
        getCoords(city);

    } else {
        alert("Please enter a city name.");
    };
};

// gets city val and uses fetch to get data with coords 
var getCoords = function(city) {

    var geoApiUrl ="http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=9200cf4dc0ea3a4f49db6371c3632dc6";

    fetch(geoApiUrl).then(function(response) {
            response.json().then(function(data) {

                // verify it worked 
                console.log(data);

                // verify if city is valid 
                if (data.length === 0) {
                    
                    // clear the form 
                    cityInputEl.value = "";

                    alert("Please enter a valid city name.")
                    return;
                };
            
                cityInputEl.value = "";
                
                // pass name, lat & lon vals to getForecast 
                getForecast(data[0].name, data[0].lat, data[0].lon);

            });
    });
};

// get weather forecast via one call api 
var getForecast = function(name, lat, lon) {
    console.log(name, lat, lon);

    var oneApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=9200cf4dc0ea3a4f49db6371c3632dc6";

    fetch(oneApiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

            // empty section (?)

            // display today's forecast 
            cityName.append(name);
            // todayIcon
            todayTemp.append("Temp: " + data.current.temp + " ℉");
            todayWind.append("Wind: " + data.current.wind_speed + " MPH");
            todayHumidity.append("Humidity: " + data.current.humidity + " %");
            todayUv.append("UV Index: " + data.current.uvi);

            // pass data to 5-day forecast 
            fiveDay(data);

        });
    });
};


// display 5-day forecast 
var fiveDay = function(data) {
    console.log(data);

    // empty section (?)

    // display title
    fiveDayTitle.append("5-Day Forecast");


    // create cards with for loop
    for (var i = 1; i < 6; i++) {

        // column div
        var fiveDayCol = document.createElement("div");
        fiveDayCol.classList = "column";
        fiveDayColumns.appendChild(fiveDayCol);

        // card div
        var fiveDayCard = document.createElement("div");
        fiveDayCard.classList = "card has-background-primary-light";
        fiveDayCol.appendChild(fiveDayCard);

        // card content div
        var fiveDayCardCont = document.createElement("div");
        fiveDayCardCont.classList = "card-content";
        fiveDayCard.appendChild(fiveDayCardCont);

        // content div 
        var fiveDayCont = document.createElement("div");
        fiveDayCont.classList = "content";
        fiveDayCard.appendChild(fiveDayCont);

        // date

        // icon

        // temp
        var fiveDayContTemp = document.createElement("div");
        fiveDayContTemp.classList = "content";
        fiveDayCardCont.appendChild(fiveDayContTemp);
        fiveDayContTemp.append("Temp: " + data.daily[i].temp.day + " ℉");

        // wind
        var fiveDayContWind = document.createElement("div"); 
        fiveDayContWind.classList = "content";
        fiveDayCardCont.appendChild(fiveDayContWind);
        fiveDayContWind.append("Wind: " + data.daily[i].wind_speed + " MPH");


        // humidity 
        var fiveDayContHumidity = document.createElement("p"); 
        fiveDayContHumidity.classList = "content";
        fiveDayCardCont.appendChild(fiveDayContHumidity);
        fiveDayContHumidity.append("Humidity " + data.daily[i].humidity + " %");





    };
};

// event listeners
searchBtn.addEventListener("click", searchHandler);

















