// JavaScript Document
$(document).ready(function() {
  //Sets attr to zero on load
  $("#calcDisp").attr("dataState", 0);
  $("#calcDisp").attr("operationState", 0);
  
  //Resets display and attr on "clear"
  $("#clear").on('click',function(){
    $("#calcDisp").html("0");
    $("#calcDisp").attr("dataState", 0);
    $("#calcDisp").attr("operationState", 0);
  });
  
  //When user clicks 0, either overwrites or appends
  $("#0").on('click',function(){
    if ($("#calcDisp").attr("dataState") == 0) {
      $("#calcDisp").html("0");
      $("#calcDisp").attr("dataState", 1);
      $("#calcDisp").attr("operationState", 0);
    } else {
      $("#calcDisp").append("0");
      $("#calcDisp").attr("operationState", 0);
    }
  });
  
  //When user clicks 1, either overwrites or appends
  $("#1").on('click',function(){
    if ($("#calcDisp").attr("dataState") == 0) {
      $("#calcDisp").html("1");
      $("#calcDisp").attr("dataState", 1);
      $("#calcDisp").attr("operationState", 0);
    } else {
      $("#calcDisp").append("1");
      $("#calcDisp").attr("operationState", 0);
    }
  });
  
  //When user clicks 2, either overwrites or appends
  $("#2").on('click',function(){
    if ($("#calcDisp").attr("dataState") == 0) {
      $("#calcDisp").html("2");
      $("#calcDisp").attr("dataState", 1);
      $("#calcDisp").attr("operationState", 0);
    } else {
      $("#calcDisp").append("2");
      $("#calcDisp").attr("operationState", 0);
    }
  });
  
  //When user clicks 4, either overwrites or appends
  $("#3").on('click',function(){
    if ($("#calcDisp").attr("dataState") == 0) {
      $("#calcDisp").html("3");
      $("#calcDisp").attr("dataState", 1);
      $("#calcDisp").attr("operationState", 0);
    } else {
      $("#calcDisp").append("3");
      $("#calcDisp").attr("operationState", 0);
    }
  });
  
  //When user clicks 4, either overwrites or appends
  $("#4").on('click',function(){
    if ($("#calcDisp").attr("dataState") == 0) {
      $("#calcDisp").html("4");
      $("#calcDisp").attr("dataState", 1);
      $("#calcDisp").attr("operationState", 0);
    } else {
      $("#calcDisp").append("4");
      $("#calcDisp").attr("operationState", 0);
    }
  });
  
  //When user clicks 5, either overwrites or appends
  $("#5").on('click',function(){
    if ($("#calcDisp").attr("dataState") == 0) {
      $("#calcDisp").html("5");
      $("#calcDisp").attr("dataState", 1);
      $("#calcDisp").attr("operationState", 0);
    } else {
      $("#calcDisp").append("5");
      $("#calcDisp").attr("operationState", 0);
    }
  });
  
  //When user clicks 6, either overwrites or appends
  $("#6").on('click',function(){
    if ($("#calcDisp").attr("dataState") == 0) {
      $("#calcDisp").html("6");
      $("#calcDisp").attr("dataState", 1);
      $("#calcDisp").attr("operationState", 0);
    } else {
      $("#calcDisp").append("6");
      $("#calcDisp").attr("operationState", 0);
    }
  });
  
  //When user clicks 7, either overwrites or appends
  $("#7").on('click',function(){
    if ($("#calcDisp").attr("dataState") == 0) {
      $("#calcDisp").html("7");
      $("#calcDisp").attr("dataState", 1);
      $("#calcDisp").attr("operationState", 0);
    } else {
      $("#calcDisp").append("7");
      $("#calcDisp").attr("operationState", 0);
    }
  });
  
  //When user clicks 8, either overwrites or appends
  $("#8").on('click',function(){
    if ($("#calcDisp").attr("dataState") == 0) {
      $("#calcDisp").html("8");
      $("#calcDisp").attr("dataState", 1);
      $("#calcDisp").attr("operationState", 0);
    } else {
      $("#calcDisp").append("8");
      $("#calcDisp").attr("operationState", 0);
    }
  });
  
  //When user clicks 9, either overwrites or appends
  $("#9").on('click',function(){
    if ($("#calcDisp").attr("dataState") == 0) {
      $("#calcDisp").html("9");
      $("#calcDisp").attr("dataState", 1);
      $("#calcDisp").attr("operationState", 0);
    } else {
      $("#calcDisp").append("9");
      $("#calcDisp").attr("operationState", 0);
    }
  });
  
  /*The following functions only run if a valid number precedes it. This even works for incomplete decimals, such as "9.".*/
  
  //When user clicks *, appends
  $("#X").on('click',function(){
    if ($("#calcDisp").attr("dataState") != 0 && $("#calcDisp").attr("operationState") == 0) {
      $("#calcDisp").append("*");
      $("#calcDisp").attr("operationState", 1);
    }
  });
  
  //When user clicks /, appends
  $("#div").on('click',function(){
    if ($("#calcDisp").attr("dataState") != 0 && $("#calcDisp").attr("operationState") == 0) {
      $("#calcDisp").append("/");
      $("#calcDisp").attr("operationState", 1);
    }
  });
  
  //When user clicks +, appends
  $("#plus").on('click',function(){
    if ($("#calcDisp").attr("dataState") != 0 && $("#calcDisp").attr("operationState") == 0) {
      $("#calcDisp").append("+");
      $("#calcDisp").attr("operationState", 1);
    }
  });
  
  //When user clicks ., appends
  $("#dot").on('click',function(){
    if ($("#calcDisp").attr("dataState") !== 0 && $("#calcDisp").attr("operationState") === 0) {
      $("#calcDisp").append(".");
      $("#calcDisp").attr("operationState", 1);
    }
  });
  
  //When user clicks -, appends
  $("#minus").on('click',function(){
    if ($("#calcDisp").attr("dataState") !== 0 && $("#calcDisp").attr("operationState") === 0) {
      $("#calcDisp").append("-");
      $("#calcDisp").attr("operationState", 1);
    }
  });
  
  //Return evaluated data, clears display
  $("#equals").on('click',function(){
    var rawCalcData = $("#calcDisp").text();
    var evalData = eval(rawCalcData);
    $("#calcResults").html(evalData);
    $("#calcDisp").html("0");
    $("#calcDisp").attr("dataState", 0);
    $("#calcDisp").attr("operationState", 0);
  });
});