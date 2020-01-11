

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
        if (savedSearches.length === 0) {
            savedSearches.push(recentSearch)
            console.log("First push club!")
        }
        else {
            savedSearches.unshift(recentSearch)
            console.log("just unshifted to the array")
        }
        
        localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
        console.log(response.name);
        console.log(savedSearches)
    });
    
}       