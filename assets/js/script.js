$(document).on('keypress',function(e) {
    if(e.which == 13) {
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
    for (i=0; i<savedSearches.length; i++) {
        var button = $("<button>", {id: "sidebarSearch"});
            button.attr("title", "What the crap is the weather in " + savedSearches[i].city + "?");
            button.text(savedSearches[i].city);
            button.addClass('btn btn-outline-dark btn-lg');
        $("#recentCrap").append(button);
    }
  } 
    



function getWeather() {
    var openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=daae374587aecd4318cddf643fac9582";
    $.ajax({
        url: openWeatherUrl,
        method: "GET"
    }).then(function(response) {
        var recentSearch = {
            city: response.name,
            id: response.id}
            console.log(recentSearch)
        if (savedSearches.length == 0) {   
            savedSearches.push(recentSearch)
            console.log("First push club!")
        }
        else {
            savedSearches.unshift(recentSearch)
            console.log("just unshifted to the array")
        }
        console.log(response);
        localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
        console.log(response.name);
        console.log(savedSearches)
        var button = $("<button>");
            button.attr("title", "What the crap is the weather in " + savedSearches[i].city + "?");
            button.text(savedSearches[i].city);
            button.addClass('btn btn-outline-dark btn-lg sidebarSearch');
        $("#recentCrap").prepend(button);
        
        $("#cityName").text(response.name + "  -   " + moment().format('MMMM Do YYYY'));
        console.log($("#cityName"));
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
        console.log(precipitation);
        var iconurl = "http://openweathermap.org/img/w/" + precipitation + ".png";
        $('#wicon').attr('src', iconurl);
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=daae374587aecd4318cddf643fac9582&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(uvReturn) {
        console.log(uvReturn)
        newWeatherUV.text("UV Index: " + uvReturn.value)
        
    });
    });
    var fiveDayURL = "https://samples.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=daae374587aecd4318cddf643fac9582";
        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function(fiveDayReturn) {
            console.log(fiveDayReturn)
        });
   



}      