var currentLatitude;
var currentLongitude;
var time24f;

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
	var M = date.getMonth(); // starts at 0
	var d = date.getDate();  //returns the day of month
	var h = date.getHours();
	var m = date.getMinutes();
	var fullDate;
	time24f = h + ":" + m;
	
	if (M < 10) { M = "0" + M;}
	if (d < 10) { d = "0" + d;}

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
	
	//Uses ajax call to get JSON data from weather app based on geolocation
  $.ajax({
    url: 'https://fcc-weather-api.glitch.me/api/current?' + "lat=" + currentLatitude + "&lon=" + currentLongitude,

    success: function(data) {
      weatherDesc = data.weather[0].main;
      city = data.name;
      temperatureC = Math.round(data.main.temp);
      temperatureF = temperatureC * 9 / 5 + 32;
			
			//Writes weather data to page
      $("#weatherDesc").html(weatherDesc);
      $("#city").html(city);
      $(".temperatureC").html(temperatureC + "ºC");
			
			//Sets the weather icon based on time & conditions
			if (h < 19 || h > 6) {
				switch (weatherDesc) {
					case "Clear":
						console.log("clear day");
						$("#weatherPic").html("<i class='wi wi-day-sunny' id='weatherIcon'></i>");
						break;

					case "Clouds":
						console.log("clouds");
						$("#weatherPic").html("<i class='wi wi-day-cloudy' id='weatherIcon'></i>");
						break;
					case "Rain":
						console.log("rain");
						$("#weatherPic").html("<i class='wi wi-day-rain' id='weatherIcon'></i>");
						break;
					default:
						console.log("Unknown daytime weather phenomenon");
						break;
				}
			} else {
				switch (weatherDesc) {
					case "Clear":
						console.log("clear night");
						$("#weatherPic").html("<i class='wi wi-night-clear' id='weatherIcon'></i>");
						break;
					case "Clouds":
						console.log("clouds night");
						$("#weatherPic").html("<i class='wi wi-night-cloudy-windy' id='weatherIcon'></i>");
						break;
					case "Rain":
						console.log("rain night");
						$("#weatherPic").html("<i class='wi wi-night-showers' id='weatherIcon'></i>");
						break;
					default:
						console.log("Unknown nighttime weather phenomenon");
						break;
				}		
			}
					
			//Allows user to convert to the devil's measurement
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

getGeoData();
setInterval(setTime, 1000);