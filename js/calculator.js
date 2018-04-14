// JavaScript Document
$(document).ready(function() {
	"use strict";

  //Sets attr to zero on load
	var dataState = 0; //dataState is if there is numbers that can be acted on
	var operationState = 0; //If there is an operation that can't be acted on
	var negState = 0; //if there is a neg or minus, as it can be an op or neg

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
  //When user clicks a number, either overwrites or appends
  $("#0, #1, #2, #3, #4, #5, #6, #7, #8, #9").on('click',function(){
		var thisId = this.id;
    if (dataState === 0) {
			dataState = 1; //Sets to 1 to indicate that an operation can now take place
      $("#calcDisp").html( $("#" + thisId).text() );
    } else {
      $("#calcDisp").append( $("#" + thisId).text() );
    }
		operationState = 0; //No operation is being done, so numbers can be appended
		negState = 0; //No neg sign, so one can be added to indicate subtraction
  });

  /*The following functions only run if a valid number precedes it. This even works for incomplete decimals, such as "9.".*/

  //When user clicks *, appends
  $("#X, #div, #plus").on('click',function(){
		var thisId = this.id;
    if (dataState !== 0 && operationState === 0) {
      $("#calcDisp").append( $("#" + thisId).text() );
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
