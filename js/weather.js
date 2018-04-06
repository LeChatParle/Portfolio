var currentLatitude;
var currentLongitude;

function getGeoData() {
	"use strict";
	//Gets geolocation from browser, then sets variables and calls the getWeather function
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    	currentLatitude = position.coords.latitude;
      currentLongitude = position.coords.longitude;     
      getWeather();
    });
  }
}

//This gets and prints the time to the page
function setTime() {
	"use strict";
	var date = new Date();
	var y = date.getFullYear();
	var M = date.getMonth();
	var d = date.getDate(); 
	var h = date.getHours();
	var m = date.getMinutes();
	var fullDate;
	var time24f;
	
	if (M < 10) { M = "0" + M;}
	if (d < 10) { d = "0" + d;}
	if (m < 10) { m = "0" + m;}

	time24f = h + ":" + m;
	fullDate = y + "-" + M + "-" + d;
	
	$("#time").html(time24f);
}

function getWeather() {
	"use strict";
  var weatherDesc;
  var city;
  var temperatureC;
  var temperatureF;
	var date = new Date();
	var h = date.getHours();
	var dataClickState = 0;
	
	//Uses ajax call to get JSON data from weather app based on geolocation
  $.ajax({
    url: 'https://fcc-weather-api.glitch.me/api/current?' + "lat=" + currentLatitude + "&lon=" + currentLongitude,

    success: function(data) {
      weatherDesc = data.weather[0].main;
      city = data.name;
      temperatureC = Math.round(data.main.temp);
      temperatureF = Math.round(temperatureC * 9 / 5 + 32);
			
			//Writes weather data to page
      $("#weatherDesc").html(weatherDesc);
      $("#city").html(city);
      $(".temperatureC").html(temperatureC + "ºC");
			
			//Sets the weather icon based on time & conditions
			if (h < 19 || h > 6) {
				switch (weatherDesc) {
					case "Clear":
						$("#weatherPic").html("<i class='wi wi-day-sunny' id='weatherIcon'></i>");
						break;
					case "Clouds":
						$("#weatherPic").html("<i class='wi wi-day-cloudy' id='weatherIcon'></i>");
						break;
					case "Rain":
						$("#weatherPic").html("<i class='wi wi-day-rain' id='weatherIcon'></i>");
						break;
					default:
						console.log("Unknown daytime weather phenomenon");
						break;
				}
			} else {
				switch (weatherDesc) {
					case "Clear":
						$("#weatherPic").html("<i class='wi wi-night-clear' id='weatherIcon'></i>");
						break;
					case "Clouds":
						$("#weatherPic").html("<i class='wi wi-night-cloudy-windy' id='weatherIcon'></i>");
						break;
					case "Rain":
						$("#weatherPic").html("<i class='wi wi-night-showers' id='weatherIcon'></i>");
						break;
					default:
						console.log("Unknown nighttime weather phenomenon");
						break;
				}		
			}
					
			//Allows user to convert to the devil's measurement
      $("#temperatureC").on('click',function(){
        if (dataClickState === 1) {
          dataClickState = 0;
          $("#temperatureC").html(temperatureC + "ºC");
        } else {
          dataClickState = 1;
          $("#temperatureC").html(temperatureF + "ºF");
        }
      });
      
    }
  });
}

getGeoData();
setInterval(setTime, 1000);