// JavaScript Document

$(document).ready(function() {
	$('#fullpage').fullpage({
		scrollHorizontally: true,
		dragAndMove: true,
		navigationPosition: 'right',
		touchSensitivity: 1,
		scrollingSpeed: 1000,
		loopBottom: true,
		loopTop: false,
		parallax: true,
	});
	
	$(".overlayDIV").hide();
	$(".websitePicture").hover(
		function() {
  		$('.overlayDIV', this).fadeIn(200);
  	}, 
		function() {
  		$('.overlayDIV', this).fadeOut(200);
  	});
	
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