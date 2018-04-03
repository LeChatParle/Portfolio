$(document).ready(function() {
	//These are the settings for fullpage.js based on what I set
	"use strict";
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
	
	//Creates the hover effect on the Web Dev Experience Section
	$(".overlayDIV").hide();
	$(".websitePicture").hover(
		function() {
  		$('.overlayDIV', this).fadeIn(200);
  	}, 
		function() {
  		$('.overlayDIV', this).fadeOut(200);
  	});
});