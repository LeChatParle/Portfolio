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
});