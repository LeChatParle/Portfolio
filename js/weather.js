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

	if (h < 10) { h = "0" + h;}
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
	var temperatureK;
  var temperatureC;
  var temperatureF;
	var date = new Date();
	var h = date.getHours();
	var dataClickState = 0;

	//Uses ajax call to get JSON data from weather app based on geolocation
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&APPID=fef70b002c9741456fbf8d4466780a9d`,

    success: function(data) {
			console.log(data);
      weatherDesc = data.weather[0].main;
      city = data.name;
			temperatureK = Math.round(data.main.temp);
      temperatureC = Math.round(data.main.temp - 273.15); //API returns temp in Kelvin
      temperatureF = Math.round(temperatureC * 9 / 5 + 32);

			//Writes weather data to page
      $("#weatherDesc").html(weatherDesc);
      $("#city").html(city);
      $(".temperatureC").html(`${temperatureC}ºC`);

			//Sets the weather icon based on time & conditions; As I learn new conditions, I write the code to handle them
			if (h < 19 && h > 6) {
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
					case "Mist":
						$("#weatherPic").html("<i class='wi wi-day-fog' id='weatherIcon'></i>");
						break;
					case "Thunderstorm":
						$("#weatherPic").html("<i class='wi wi-day-thunderstorm' id='weatherIcon'></i>");
						break;
					case "Drizzle":
						$("#weatherPic").html("<i class='wi wi-day-sprinkle' id='weatherIcon'></i>");
						break;
					case "Snow":
						$("#weatherPic").html("<i class='wi wi-day-snow' id='weatherIcon'></i>");
						break;
					case "Fog":
						$("#weatherPic").html("<i class='wi wi-day-fog' id='weatherIcon'></i>");
						break;
					case "Haze":
						$("#weatherPic").html("<i class='wi wi-day-haze' id='weatherIcon'></i>");
						break;
					case "Smoke":
						$("#weatherPic").html("<i class='wi wi-smoke' id='weatherIcon'></i>");
						break;
					default:
						$("#weatherPic").html("<i class='wi wi-alien' id='weatherIcon'></i>");
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
					case "Mist":
						$("#weatherPic").html("<i class='wi wi-night-fog' id='weatherIcon'></i>");
						break;
					case "Thunderstorm":
						$("#weatherPic").html("<i class='wi wi-night-alt-thunderstorm' id='weatherIcon'></i>");
						break;
					case "Drizzle":
						$("#weatherPic").html("<i class='wi wi-night-alt-sprinkle' id='weatherIcon'></i>");
						break;
					case "Snow":
						$("#weatherPic").html("<i class='wi wi-night-alt-snow' id='weatherIcon'></i>");
						break;
					case "Fog":
						$("#weatherPic").html("<i class='wi wi-night-fog' id='weatherIcon'></i>");
						break;
					case "Haze":
						$("#weatherPic").html("<i class='wi wi-night-fog' id='weatherIcon'></i>");
						break;
					case "Smoke":
						$("#weatherPic").html("<i class='wi wi-smoke' id='weatherIcon'></i>");
						break;
					default:
						$("#weatherPic").html("<i class='wi wi-alien' id='weatherIcon'></i>");
						console.log("Unknown nighttime weather phenomenon");
						break;
				}
			}

			//Allows user to convert to Kelvin or the devil's measurement
      $("#temperatureC").on('click',function(){
				switch (dataClickState) {
					case 0:
						dataClickState++;
          	$("#temperatureC").html(`${temperatureK}K`);
						break;
					case 1:
						dataClickState++;
          	$("#temperatureC").html(`${temperatureF}ºF`);
						break;
					case 2:
						dataClickState = 0;
          	$("#temperatureC").html(`${temperatureC}ºC`);
				}
      });

    }
  });
}

getGeoData();
setInterval(setTime, 1000);
