$( document ).ready(function() {
$(document).on('keypress',function(event) {
    if(event.which == 13) {
        event.preventDefault();
        cityName = $("#crapForm").val().trim();
        getWeather();
    }
});
$("#topNavSearch").on("click", function(event) {
    event.preventDefault();
    cityName = $("#crapForm").val().trim();
    getWeather();
});
var savedSearches = [];
if (localStorage.getItem('savedSearches') !== null) {
    savedSearches = JSON.parse(localStorage.getItem('savedSearches'));
    
  } 
$(window).on("load", function(event) {
    event.preventDefault();
    if (savedSearches.length > 0) {
    cityName = savedSearches[0].city;
    getWeather()
    }
});
function getWeather() {
    var openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=daae374587aecd4318cddf643fac9582";
    $.ajax({
        url: openWeatherUrl,
        method: "GET"
    }).then(function(response) {
        var recentSearch = {
            city: response.name,
            id: response.id
        }
        savedSearches.unshift(recentSearch)
        localStorage.setItem("savedSearches", JSON.stringify(savedSearches));       
        $("#cityName").text(response.name + "  -   " + moment().format('MMMM Do YYYY'));
        var newWeatherDetails = $("<ul>");
        var newWeatherTemp = $("<li>");
        var newWeatherHumidity = $("<li>");
        var newWeatherSpeed = $("<li>");
        var newWeatherUV = $("<li>");
        $("#weatherDetails").empty();
        $("#weatherDetails").append(newWeatherDetails);
        newWeatherDetails.append(newWeatherTemp,newWeatherHumidity, newWeatherSpeed, newWeatherUV);
        newWeatherHumidity.text("Humidity: " + response.main.humidity + "%")
        newWeatherSpeed.text("Wind Speed (mph): " + response.wind.speed)
        var tempEquation = (response.main.temp - 273.15) * 1.80 + 32;
        newWeatherTemp.text("Trempurature (F): " + tempEquation.toFixed(0))
        var lon = (response.coord.lon);
        var lat = (response.coord.lat);
        var precipitation = (response.weather[0].icon);
        var iconurl = "https://openweathermap.org/img/w/" + precipitation + ".png";
        $('#wicon').attr('src', iconurl);
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=daae374587aecd4318cddf643fac9582&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(uvReturn) {

        newWeatherUV.text("UV Index: " + uvReturn.value)      
        });
        $("#sidebarSearch").remove();
        for (i=0; i < savedSearches.length; i++) {
            var button = $("<button>", {id: "sidebarSearch"});
                button.text(savedSearches[i].city);
                button.addClass('btn btn-outline-dark btn-lg');
        $("#recentCrap").append(button);
        console.log("How many times is this gonna run? Looks like... " + i)
        }
    });
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",us&appid=daae374587aecd4318cddf643fac9582";
        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function(fiveDayReturn) {
            $("#fiveDayWeather").empty();
            for (j=0; j < 5; j++) {
                var newCard = $("<div>", {"class": "card"});
                var newCardBody = $("<div>", {"class": "card-body"});
                var cardHeader = $("<h6>", {id: "forcastName"});
                var fiveDayImage = $("<img>", {id: "fiveDaywicon" + [j]});
                var cardTextTemp = $("<li>", {"class": "card-text"});
                var cardTextHumidity = $("<li>", {"class": "card-text"});
                var cardList = $("<ul>");
                var daysToAdd = [j][0] + 1;
                var new_date = moment().add(daysToAdd, 'days').calendar();
                cardHeader.text(fiveDayReturn.city.name + " - " + new_date);
                var forcastTempEquation = (fiveDayReturn.list[j].main.temp - 273.15) * 1.80 + 32;
                cardTextTemp.text("Tempurature (F): " + forcastTempEquation.toFixed(0));
                cardTextHumidity.text("Humidity: " + fiveDayReturn.list[j].main.humidity);
                $("#fiveDayWeather").append(newCard);
                newCard.append(newCardBody);
                newCardBody.append(cardHeader, fiveDayImage, cardList);
                cardList.append(cardTextTemp, cardTextHumidity);
                var fiveDayPrecipitation = (fiveDayReturn.list[j].weather[0].icon);
                var fiveDayiconurl = "https://openweathermap.org/img/w/" + fiveDayPrecipitation + ".png";
                $('#fiveDaywicon' + [j]).attr('src', fiveDayiconurl);
            }
        });
    }
});
