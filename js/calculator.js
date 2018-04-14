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

	//$(this.id).text()
  //When user clicks 0, either overwrites or appends
  $("#0, #1, #2, #3, #4, #5, #6, #7, #8, #9").on('click',function(){
		var thisId = this.id;
    if (dataState === 0) {
			dataState = 1;
      $("#calcDisp").html( $("#" + thisId).text() );
    } else {
      $("#calcDisp").append( $("#" + thisId).text() );
    }
		operationState = 0;
		negState = 0;
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
