# Weather-Dashboard
Create a weather tracking site. Due Jan 11th.

This application allows you to type in the name of a city and either click the search button, or press enter to populate the page with weather information.

The main page body will contain the current weather, temp, humidity, wind speed, and UV index.
Below that 5 cards will be generated, each one showing the next 5 days weather at the time of the search.

on the left hand side is a list of recent searches. These will append each time a search is done.  The code is written to empty the field and repopulate it with the list of cities saved into the local storage.

Local storage saves things by using the unshift feature, so that the most recent item searched will always be at the top of the list.

for future development I plan to make the buttons poplating the left side usable to also search.
I would also like to make each searched term unique, so that if you look up an item that is already in the array, it will remove it before using unshift to add it to the beginning of the array.

![Weather Screenshot](https://raw.githubusercontent.com/Sforzemon/Weather-Dashboard/master/assets/Weather%20Dash%20-%20Screenshot.png)
