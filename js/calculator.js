// JavaScript Document
$(document).ready(function() {
	"use strict";

  //Sets attr to zero on load
	var dataState = 0;
	var operationState = 0;
	var negState = 0;

  //Resets display and attr on "clear"
  $("#clear").on('click',function(){
    $("#calcDisp").html("0");
    dataState = 0;
    operationState = 0;
		negState = 0;
  });

	//Resets display, history and attr on "clear all"
  $("#clearAll").on('click',function(){
    $("#calcDisp").html("0");
		$("#calcResults").html("0");
    dataState = 0;
    operationState = 0;
		negState = 0;
  });

  //When user clicks 0, either overwrites or appends
  $("#0").on('click',function(){
    if (dataState === 0) {
			dataState = 1;
			operationState = 0;
			negState = 0;
      $("#calcDisp").html("0");
    } else {
      $("#calcDisp").append("0");
      operationState = 0;
			negState = 0;
    }
  });

  //When user clicks 1, either overwrites or appends
  $("#1").on('click',function(){
    if (dataState === 0) {
			dataState = 1;
			operationState = 0;
			negState = 0;
      $("#calcDisp").html("1");
    } else {
      $("#calcDisp").append("1");
      operationState = 0;
			negState = 0;
    }
  });

  //When user clicks 2, either overwrites or appends
  $("#2").on('click',function(){
    if (dataState === 0) {
			dataState = 1;
      operationState = 0;
			negState = 0;
      $("#calcDisp").html("2");
    } else {
      $("#calcDisp").append("2");
      operationState = 0;
			negState = 0;
    }
  });

  //When user clicks 4, either overwrites or appends
  $("#3").on('click',function(){
    if (dataState === 0) {
			dataState = 1;
      operationState = 0;
			negState = 0;
      $("#calcDisp").html("3");
    } else {
      $("#calcDisp").append("3");
      operationState = 0;
			negState = 0;
    }
  });

  //When user clicks 4, either overwrites or appends
  $("#4").on('click',function(){
    if (dataState === 0) {
			dataState = 1;
      operationState = 0;
			negState = 0;
      $("#calcDisp").html("4");
    } else {
      $("#calcDisp").append("4");
      operationState = 0;
			negState = 0;
    }
  });

  //When user clicks 5, either overwrites or appends
  $("#5").on('click',function(){
    if (dataState === 0) {
			dataState = 1;
      operationState = 0;
			negState = 0;
      $("#calcDisp").html("5");
    } else {
      $("#calcDisp").append("5");
      operationState = 0;
			negState = 0;
    }
  });

  //When user clicks 6, either overwrites or appends
  $("#6").on('click',function(){
    if (dataState === 0) {
			dataState = 1;
      operationState = 0;
			negState = 0;
      $("#calcDisp").html("6");
    } else {
      $("#calcDisp").append("6");
      operationState = 0;
			negState = 0;
    }
  });

  //When user clicks 7, either overwrites or appends
  $("#7").on('click',function(){
    if (dataState === 0) {
			dataState = 1;
      operationState = 0;
			negState = 0;
      $("#calcDisp").html("7");
    } else {
      $("#calcDisp").append("7");
      operationState = 0;
			negState = 0;
    }
  });

  //When user clicks 8, either overwrites or appends
  $("#8").on('click',function(){
    if (dataState === 0) {
			dataState = 1;
      operationState = 0;
			negState = 0;
      $("#calcDisp").html("8");
    } else {
      $("#calcDisp").append("8");
      operationState = 0;
			negState = 0;
    }
  });

  //When user clicks 9, either overwrites or appends
  $("#9").on('click',function(){
    if (dataState === 0) {
			dataState = 1;
      operationState = 0;
			negState = 0;
      $("#calcDisp").html("9");
    } else {
      $("#calcDisp").append("9");
      operationState = 0;
			negState = 0;
    }
  });

  /*The following functions only run if a valid number precedes it. This even works for incomplete decimals, such as "9.".*/

  //When user clicks *, appends
  $("#X").on('click',function(){
    if (dataState !== 0 && operationState === 0) {
      $("#calcDisp").append("*");
			operationState = 1;
    }
  });

  //When user clicks /, appends
  $("#div").on('click',function(){
    if (dataState !== 0 && operationState === 0) {
      $("#calcDisp").append("/");
      operationState = 1;
    }
  });

  //When user clicks +, appends
  $("#plus").on('click',function(){
    if (dataState !== 0 && operationState === 0) {
      $("#calcDisp").append("+");
      operationState = 1;
    }
  });

  //When user clicks ., appends
  $("#dot").on('click',function(){
    if (operationState === 0) {
      $("#calcDisp").append(".");
      operationState = 1;
    }
  });

  //When user clicks -, appends
  $("#minus").on('click',function(){
		if (negState === 0) {
			if (dataState === 0) {
	      $("#calcDisp").html("-");
	    } else {
				$("#calcDisp").append("-");
			}
			dataState = 1;
			operationState = 1;
			negState = 1;
		}
  });

  //Return evaluated data, clears main display, but updates secondary memory display
  $("#equals").on('click',function(){
		if (operationState !== 1) {
			var rawCalcData = $("#calcDisp").text();
	    var evalData = Number(eval(rawCalcData));//without Number(), leading zeros cause problems.
	    $("#calcResults").html(evalData);
	    $("#calcDisp").html("0");
	    dataState = 0;
	    operationState = 0;
		}
  });
});
