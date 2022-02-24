// global variables 
var today = moment().format("dddd, MMMM, Do");
var displayToday = document.querySelector("#date");
var cityInputEl = document.querySelector("#cityInput");
var searchBtn = document.querySelector("#searchBtn");

// display today's date
displayToday.append(today);

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
                
                // pass lat & lon vals to getForecast 
                getForecast(data[0].lat, data[0].lon);

                // display 
            });
    });
};

// get weather forecast via one call api 
var getForecast = function(lat, lon) {
    console.log(lat, lon);

    var oneApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=9200cf4dc0ea3a4f49db6371c3632dc6";

    fetch(oneApiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
    })
};

// event listeners 
searchBtn.addEventListener("click", searchHandler);






















