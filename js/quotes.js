// JavaScript Document
$(document).ready(function(){
	getQuote();
});

function getQuote() {
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