$(document).ready(function() {
	//These are the settings for fullpage.js based on what I set
	"use strict";
	$('#fullpage').fullpage({
		navigationPosition: 'right',
		touchSensitivity: 1,
		scrollingSpeed: 1000,
		loopBottom: true,
		loopTop: false
	});
	
	//Creates the hover effect on the Web Dev Experience Section
	$(".overlayDIV").hide();
	$(".websitePicture").hover(
		function() {
  		$('.overlayDIV', this).fadeIn(200);
  	}, 
		function() {
  		$('.overlayDIV', this).fadeOut(200);
  	});
	
	$('a[title="000webhost logo"]').hide(); //Blocks advert that my free hosting site appends to my page
});