// date variables 
var today = moment().format("dddd, MMMM, Do");
var displayToday = document.querySelector("#date");

// display today's date
displayToday.append(today);

// search form variables 
var cityInputEl = document.querySelector("#cityInput");
var searchBtn = document.querySelector("#searchBtn");

// today's weather variables 
var todayBox = document.querySelector("#today-box");
var cityName = document.querySelector("#city-name");
var todayIcon = document.querySelector("#today-icon");
var todayTemp = document.querySelector("#today-temp");
var todayWind = document.querySelector("#today-wind");
var todayHumidity = document.querySelector("#today-humidity");
var todayUv = document.querySelector("#today-uv");
var uvi = document.querySelector("#uvi");

// 5-day forecast variables 
var fiveDayTitle = document.querySelector("#five-day-title");
var fiveDayColumns = document.querySelector("#five-day-columns");

// saved search variables 
var savedCities = document.querySelector("#saved-cities");
var savedCitiesArr = [];

// handle search input 
var searchHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim(); 

    if(city) {
      
        // pass argument to getCoords & save search 
        getCoords(city);
        saveSearch(city);

    } else {
        alert("Please enter a city name.");
    };
};

// gets city val and uses fetch to get data with coords 
var getCoords = function(city) {

    var geoApiUrl ="https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=9200cf4dc0ea3a4f49db6371c3632dc6";

    fetch(geoApiUrl).then(function(response) {
            response.json().then(function(data) {

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

                // // pass name to saveSearch
                // saveSearch(data[0].name);
            });
    });
};

// get weather forecast via one call api 
var getForecast = function(name, lat, lon) {

    var oneApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=9200cf4dc0ea3a4f49db6371c3632dc6";

    fetch(oneApiUrl).then(function(response) {
        response.json().then(function(data) {

            // clear background class & empty elements
            todayBox.classList.remove("has-background-primary-light");
            
            cityName.innerHTML= "";
            todayIcon.innerHTML = "";
            todayTemp.innerHTML = "";
            todayWind.innerHTML = "";
            todayHumidity.innerHTML = "";
            todayUv.innerHTML = "";
            uvi.innerHTML = "";

            // display today's forecast 

            // background color 
            todayBox.classList.add("has-background-primary-light");
            todayBox.classList.add("px-4");
            todayBox.classList.add("pb-4");

            cityName.append(name);

            // todayIcon.append
            var todayIconImg = document.createElement("img");
            todayIconImg.src = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
            todayIcon.append(todayIconImg);

            todayTemp.append("Temp: " + data.current.temp + " ℉");
            todayWind.append("Wind: " + data.current.wind_speed + " MPH");
            todayHumidity.append("Humidity: " + data.current.humidity + " %");
            todayUv.append("UV Index: ");
            uvi.append(data.current.uvi);

            // change uvi background color based on severity
            if (data.current.uvi < 2) {
                uvi.classList.add("has-background-success");
                uvi.classList.add("has-text-white");    
            }
            else if (data.current.uvi > 2 && data.current.uvi <= 7) {
                uvi.classList.add("has-background-warning");
            }
            else if (data.current.uvi > 7) {
                uvi.classList.add("has-background-danger");
                uvi.classList.add("has-text-white");
            };

            // pass data to 5-day forecast 
            fiveDay(data);
        });
    });
};

// display 5-day forecast 
var fiveDay = function(data) {

    // empty section
    fiveDayTitle.innerHTML = "";
    fiveDayColumns.innerHTML = "";

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
        var fiveDayDate = document.createElement("div");
        fiveDayDate.classList = "content";
        fiveDayCardCont.appendChild(fiveDayDate);
        fiveDayDate.append(moment.unix(data.daily[i].dt).format("MM/DD/YY"));

        // icon
        var fiveDayIconDiv = document.createElement("div");
        fiveDayIconDiv.classList = "content";
        fiveDayCardCont.appendChild(fiveDayIconDiv);

        var fiveDayIconImg = document.createElement("img")
        fiveDayIconImg.src = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
        
        fiveDayIconDiv.appendChild(fiveDayIconImg);

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
        fiveDayContHumidity.append("Humidity: " + data.daily[i].humidity + " %");
    };
};

// save to localStorage  
var saveSearch = function(city) {

    // define key and value 
    var cityValue = city; 

    // push to array 
    savedCitiesArr.push(cityValue);

    localStorage.setItem("savedCitiesArr", savedCitiesArr);

    loadSearch();
};

// load localStorage as buttons 
var loadSearch = function() {

    var storedCities = localStorage.getItem("savedCitiesArr");
    var storedCitiesArr = storedCities.split(',');

    if (storedCities) {

       savedCities.innerHTML = '';
       
       for (var i = 0; i < storedCitiesArr.length; i++) {

           var savedCityLi = document.createElement("li"); 
           savedCities.appendChild(savedCityLi);
           
           var savedCityBtn = document.createElement("button");
           savedCityBtn.classList.add("button");
           savedCityBtn.classList.add("is-fullwidth");
           savedCityBtn.classList.add("is-info");
           savedCityBtn.classList.add("is-outlined");
           savedCityBtn.classList.add("mb-2");
          
           savedCityBtn.innerHTML = storedCitiesArr[i];
           
           savedCityBtn.setAttribute("value", storedCitiesArr[i]);

           // event listener, run getCoords 
           savedCityBtn.addEventListener("click", function() {
               getCoords(this.innerHTML);
           });
           
           savedCityLi.appendChild(savedCityBtn);
        };
   };
};

// event listeners
searchBtn.addEventListener("click", searchHandler);

// callback functions
loadSearch();




















