// JavaScript Document

$(document).ready(function() {
	$(".overlayDIV").hide();
	$(".websitePicture").hover(
		function() {
  		$('.overlayDIV', this).fadeIn(200);
  	}, 
		function() {
  		$('.overlayDIV', this).fadeOut(200);
  	});
});