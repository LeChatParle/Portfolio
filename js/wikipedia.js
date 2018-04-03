var formData;

//Awaits click or enter press, then calls getDataFromWiki()
$(document).ready(function(){
	"use strict";
	
	//Checks for click events
  $("#submitButton").on("click", function() {
    formData = $('form :input').val();
    getDataFromWiki();
  });
	
	//Checks for keypress events
	$("#submitButton").on( "keydown", function(event) {
    if(event.which === 13) {
			formData = $('form :input').val();
    	getDataFromWiki();
		}
  });
});
  
//Gets data from wiki by performing an ajax call and parsing the JSON data. 
function getDataFromWiki() {
	"use strict";
	
  $.ajax( {
    url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + encodeURIComponent(formData) + "&prop=info&inprop=url&utf8=&format=json",
    dataType: 'jsonp',
    headers: { 'Api-User-Agent': 'WikiApp/0.1 (chatparle@me.com)' },
		
    success: function(data) {
			for (var i = 0; i < 3; i++) {
				$("#searchResults").append("<a href='http://en.wikipedia.org/?curid=" + data.query.search[i].pageid + "' target='blank'><div class='text-light' id='jqueryDiv" + i + "'></div></a>");
				$("#jqueryDiv" + i + "").html(data.query.search[i].title);
				$("#jqueryDiv" + i + "").append("<p class='text-light' id='jqueryBody" + i + "'></p>");
				$("#jqueryBody" + i + "").html(data.query.search[i].snippet);
			}      
    }
  });
}



