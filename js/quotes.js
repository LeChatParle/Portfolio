//Performs ajax call to quote site, returns quote and then writes it to the page
function getQuote() {
	"use strict";
	
	var currentQuote; 
  var currentAuthor;
  
  $.ajax({
    url: 'https://talaikis.com/api/quotes/random/',

    success: function(data) {
      currentQuote = data.quote;
      currentAuthor = data.author;
      
      $("#quoteContent").html(data.quote);
      $("#quoteTitle").html(data.author);
      $('#clickToTweet').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
    }
  });
}

getQuote();