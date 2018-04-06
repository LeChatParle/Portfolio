/*
Performs an ajax call to get data on a set number of twitch users, then displays the information.
In order to add another user, get the user's name, then add it to the first URL. Then print 
userData to the console to get the ID Number. Then add that to the next url, and process the data
*/
function getUser() {
	"use strict";
	
  $.ajax({
    dataType: 'json',
    url: 'https://api.twitch.tv/helix/users?login=OgamingSC2&login=OgamingInter&login=ESL_SC2&login=x5_PiG', //Request for specific users
    headers:  {  
    'Client-ID': "e4xcgkku4b1ttd2fwkojn1ik9js38i", //Twitch API requires ID & Auth in headers
    'Authorization':  'Bearer', 
  }, 
    
    success: function(userData) {
      var t1 = userData.data[0]; //Set commonly used data to shorthand variables
			var t2 = userData.data[1];
      var t3 = userData.data[2];
			var t4 = userData.data[3];
      var t1dn = t1.display_name;
			var t2dn = t2.display_name;
      var t3dn = t3.display_name;
			var t4dn = t4.display_name;
      var esl = "30220059";
      var ogsc2 = "71852806";
			var ogi = "72315696";
			var pig = "23526154";
      
      $.ajax({ 
        dataType: 'json',
        url: 'https://api.twitch.tv/helix/streams?user_id=71852806&user_id=72315696&user_id=30220059&user_id=23526154', //same users, more info
        headers:  {  
          'Client-ID': "e4xcgkku4b1ttd2fwkojn1ik9js38i", //Twitch API requires ID & Auth in headers
          'Authorization':  'Bearer', 
        }, 
    
        success: function(twitchData) { 
					//This is where it writes the elements to the page
          $("#twitchDiv").append("<a href='https://www.twitch.tv/ogamingsc2' class='text-light' 'target='blank'><div><h3 id='title'>" + t1dn + "</h3><p id='ogsc2'></p></div></a>");
					$("#twitchDiv").append("<a href='https://www.twitch.tv/ogaminginter' class='text-light' 'target='blank'><div><h3>" + t2dn + "</h3><p id='ogi'></p></div></a>");
          $("#twitchDiv").append("<a href='https://www.twitch.tv/esl_sc2' class='text-light' target='blank'><div><h3>" + t3dn + "</h3><p id='esl'></p></div></a>");
					$("#twitchDiv").append("<a href='https://www.twitch.tv/x5_PiG' class='text-light' target='blank'><div><h3>" + t4dn + "</h3><p id='pig'></p></div></a>");

					
          for (var i = 0; i <= twitchData.data.length; i++) {
            if ((twitchData.data[i].type === "live") && twitchData.data[i].user_id === ogsc2) {
              //If live, then write their live data to the page
              $("#ogsc2").html("Live right now: " + twitchData.data[i].title);             
            } else if ((twitchData.data[i].type === "live") && twitchData.data[i].user_id === ogi) {
              //If live, then write their live data to the page      
              $("#ogi").html("Live right now: " + twitchData.data[i].title);  
            } else if ((twitchData.data[i].type === "live") && twitchData.data[i].user_id === esl) {
              //If live, then write their live data to the page      
              $("#esl").html("Live right now: " + twitchData.data[i].title);  
            } else if ((twitchData.data[i].type === "live") && twitchData.data[i].user_id === pig) {
              //If live, then write their live data to the page      
              $("#pig").html("Live right now: " + twitchData.data[i].title);  
            }  
          }
        }    
      });
    }
  });
}

getUser();