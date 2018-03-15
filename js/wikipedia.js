// JavaScript Document
var searchInitiated = false;
var formData;

$(document).ready(function(){
  $("#submitButton").on("click", function() {
    formData = $('form :input').val();
    searchInitiated = true;
    getDataFromWiki();
  });

});

function getDataFromWiki() {
  $.ajax( {
    url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + encodeURIComponent(formData) + "&prop=info&inprop=url&utf8=&format=json",
    dataType: 'jsonp',
    headers: { 'Api-User-Agent': 'WikiApp/0.1 (chatparle@me.com)' },
    success: function(data) {
      if (searchInitiated && formData) {
        for (var i = 0; i < 3; i++) {
          $("#searchResults").append("<a href='http://en.wikipedia.org/?curid=" + data.query.search[i].pageid + "' target='blank'><div class='text-dark' id='jqueryDiv" + i + "'></div></a>");
          $("#jqueryDiv" + i + "").html(data.query.search[i].title);
          $("#jqueryDiv" + i + "").append("<p class='text-dark' id='jqueryBody" + i + "'></p>");
          $("#jqueryBody" + i + "").html(data.query.search[i].snippet);
        }
      }
      
    }
  });
}