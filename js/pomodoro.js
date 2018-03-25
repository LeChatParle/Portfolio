// JavaScript Document
$(document).ready(function() {
  var secs = 0;
  var mins = 25;
  var restSecs = 0;
  var restMins = 5;
  var restDone = false;
  var htmlWorkMins = 25; 
  var htmlRestMins = 5;
  var mp3 = '../as/horn.mp3';
  var audio = new Audio(mp3); //This and previous line taken from example
  var audioPlayed = false;
  $("#whatDo").html("Work!");
  
  //Resets timer variables and words
  function resetTimer() {
    mins = Number($("#workTime").text().match(/\d+/));
    secs = 0;
    restSecs = 0;
    restMins = Number($("#restTime").text().match(/\d+/));
    restDone = false;
    audioPlayed = false;
    $("#whatDo").html("Work!");
  }
  
  //Decrements the seconds, and adjusts minutes
  function decrementTime() {
    if (secs > 0 || mins > 0) {
      if (secs <= 0 && mins >= 1) {
         mins -= 1;
         secs = 59;
      } else {
         secs -= 1;
      } 
    } else if (restDone === false) {
      audio.play();
      secs = restSecs;
      mins = restMins;
      $("#whatDo").html("Rest!");
      restDone = true;
    } else if (audioPlayed === false && restDone === true) {
      audio.play();
      audioPlayed = true;
    }
    $("#secondsCounter").html(mins + ":" + secs);
  }
  
  //Updates clock every second
  setInterval(decrementTime, 1000);
  
  //Resets/starts timer on click
  $("#resetButton").on('click',function(){
    resetTimer();
  });
  
  //Updates work timer down
  $("#workDown").on('click',function(){
    htmlWorkMins -= 1;
    $("#workTime").html("Work time: " + htmlWorkMins + " mins");
  });
  
  //Updates work timer up
  $("#workUp").on('click',function(){
    htmlWorkMins += 1;
    $("#workTime").html("Work time: " + htmlWorkMins + " mins");
  });
   
  //Updates work timer down
  $("#restDown").on('click',function(){
    htmlRestMins -= 1;
    $("#restTime").html("Rest time: " + htmlRestMins + " mins");
  });
  
  //Updates work timer Up
  $("#restUp").on('click',function(){
    htmlRestMins += 1;
    $("#restTime").html("Rest time: " + htmlRestMins + " mins");
  });
});