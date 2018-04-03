//Performs an ajax call to get data on a set number of twitch users, then displays the information
function getUser() {
	"use strict";
	
  $.ajax({
    dataType: 'json',
    url: 'https://api.twitch.tv/helix/users?login=OgamingSC2&login=freecodecamp&login=ESL_SC2', //Request for three specific users
    headers:  {  
    'Client-ID': "e4xcgkku4b1ttd2fwkojn1ik9js38i", //Twitch API requires ID & Auth in headers
    'Authorization':  'Bearer', 
  }, 
    
    success: function(userData) {
      var t1 = userData.data[0]; //Set commonly used data to shorthand variables
      var t2 = userData.data[1];
      var t3 = userData.data[2];
      var t1pp = t1.profile_image_url;
      var t2pp = t2.profile_image_url;
      var t3pp = t3.profile_image_url;
      var t1dn = t1.display_name;
      var t2dn = t2.display_name;
      var t3dn = t3.display_name;
      var fcc = "79776140";
      var esl = "30220059";
      var ogsc2 = "71852806";
      
      $.ajax({ 
        dataType: 'json',
        url: 'https://api.twitch.tv/helix/streams?user_id=71852806&user_id=79776140&user_id=30220059', //same users, more info
        headers:  {  
          'Client-ID': "e4xcgkku4b1ttd2fwkojn1ik9js38i", //Twitch API requires ID & Auth in headers
          'Authorization':  'Bearer', 
        }, 
    
        success: function(twitchData) { 
					//This is where is writes the elements to the page
          $("#twitchDiv").append("<a href='https://www.twitch.tv/ogamingsc2' target='blank'><div><img class='displayPic' src='" + t1pp + "'><h3>" + t1dn + "</h3><p id='ogsc2'></p></div></a>");
          $("#twitchDiv").append("<a href='https://www.twitch.tv/freecodecamp' target='blank'><div><img class='displayPic' src='" + t2pp + "'><h3>" + t2dn + "</h3><p id='fcc'></p></div></a>");
          $("#twitchDiv").append("<a href='https://www.twitch.tv/esl_sc2' target='blank'><div><img class='displayPic' src='" + t3pp + "'><h3>" + t3dn + "</h3><p id='esl'></p></div></a>");

          for (var i = 0; i <= twitchData.data.length; i++) {
            if ((twitchData.data[i].type === "live") && twitchData.data[i].user_id === ogsc2) {
              //If live, then write their live data to the page
              $("#ogsc2").html("Live right now: " + twitchData.data[i].title);             
            } else if ((twitchData.data[i].type === "live") && twitchData.data[i].user_id === fcc) {
              //If live, then write their live data to the page
              $("#fcc").html("Live right now: " + twitchData.data[i].title);  
            } else if ((twitchData.data[i].type === "live") && twitchData.data[i].user_id === esl) {
              //If live, then write their live data to the page      
              $("#esl").html("Live right now: " + twitchData.data[i].title);  
            }
          }
        }    
      });
    }
  });
}

getUser();