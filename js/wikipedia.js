//Awaits click or enter press, then calls getDataFromWiki()
$(document).ready(function(){
	"use strict";

	var formData;

	//Checks for click events
  $("#submitButton").on("click", function() {
    formData = $('form :input').val();
		$("#searchResults").empty();
		$("#jqueryDiv").remove();
		$("#jqueryBody").remove();
		$("#splash").remove();
    getDataFromWiki(formData);
  });
});

//Gets data from wiki by performing an ajax call and parsing the JSON data.
function getDataFromWiki(page) {
	"use strict";

  $.ajax( {
    url: `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(page)}&prop=info&inprop=url&utf8=&format=json`,
    dataType: 'jsonp',
    headers: { 'Api-User-Agent': 'WikiApp/0.1 (chatparle@me.com)' },

    success: function(data) {
			for (var i = 0; i < 3; i++) {
				$("#searchResults").append(`<a href='http://en.wikipedia.org/?curid=${data.query.search[i].pageid}' target='blank'><div class='text-light' id='jqueryDiv${i}'></div></a>`);
				$("#jqueryDiv" + i + "").html(data.query.search[i].title);
				$("#jqueryDiv" + i + "").append(`<p class='text-light' id='jqueryBody${i}'></p>`);
				$("#jqueryBody" + i + "").html(data.query.search[i].snippet);
			}
    }
  });
}
