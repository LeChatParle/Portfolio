var currentLatitude;
var currentLongitude;

function getGeoData() {
	"use strict";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    	currentLatitude = position.coords.latitude;
      currentLongitude = position.coords.longitude;     
      getWeather();
    });
  }
}

getGeoData();

function getWeather() {
	"use strict";
  var weatherDesc;
  var city;
  var temperatureC;
  var temperatureF;
  var weatherIcon;
  
  $.ajax({
    url: 'https://fcc-weather-api.glitch.me/api/current?' + "lat=" + currentLatitude + "&lon=" + currentLongitude,

    success: function(data) {
      weatherDesc = data.weather[0].main;
      city = data.name;
      temperatureC = Math.round(data.main.temp);
      temperatureF = temperatureC * 9 / 5 + 32;
      weatherIcon = data.weather[0].icon;
      
      $("#weatherDesc").html(weatherDesc);
      $("#city").html(city);
      $(".temperatureC").html(temperatureC + "ºC");
      $("img").attr('src', data.weather[0].icon);
      
      $("#tempDiv").on('click',function(){
        if ($("#tempDiv").attr('data-click-state') === 1) {
          $("#tempDiv").attr('data-click-state', 0);
          $("#temperatureC").html(temperatureC + "ºC");
        } else {
          $("#tempDiv").attr('data-click-state', 1);
          $("#temperatureC").html(temperatureF + "ºF");
        }
      });
      
    }
  });
}