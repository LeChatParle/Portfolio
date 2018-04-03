//This function runs every click to ensure game runs smoothly. 
(function(){
  "use strict";

function clickButton() {
  $(".item").click(function() {
    var playerOne = getPlayerOne();
    
    if (playerOne === "X") {
      $(this).addClass("blue"); 
      $(this).html("X");
    }
    
    if (playerOne === "O") {
      $(this).addClass("blue");
      $(this).html("O");
    }
    
    playGame();
  });
}

clickButton(event);

/*
Player one goes first
*/
function checkWhoseTurn() {
  var currentTurn;
  var redCount = getRedCount();
  var blueCount = getBlueCount();
  var playerOneTurn = !blueCount || redCount > blueCount || blueCount && redCount === blueCount;
  var computerTurn = redCount < blueCount;
  
  if (playerOneTurn) {
    var notBlueOrRed = document.querySelectorAll("div.item:not(.blue):not(.red)");
    $(notBlueOrRed).removeClass('unclickable'); //This must be removed to ensure player can click
    currentTurn = "playerOneTurn";
    return currentTurn;
  }
  
  if (computerTurn) {
    var allItems = document.querySelectorAll("div.item");
    $(allItems).addClass('unclickable'); //Prevents player from clicking during AI's turn
    setTimeout(computerTakeTurn, 1000);
    currentTurn = "computerTurn";
    return currentTurn;
  }
}

/*
Determines what available spots are left, chooses one at random, colors it and set it as played by computer, and then calls play game to change turns. 
*/
function computerTakeTurn() {
  var computer = getComputer();
  //Determines a place that hasn't been played yet
  var notBlueOrRed = document.querySelectorAll("div.item:not(.blue):not(.red)");
  //chooses one at random
  var randomItem = notBlueOrRed[Math.floor(Math.random() * notBlueOrRed.length)];
  //addClass red to that random item and show computer chose it
  $(randomItem).addClass("red unclickable");
  $(randomItem).html(computer);
  
  playGame();
}

//Sets the players turn and game piece
function setPlayerOne() {
  $("#playerForm input").on("change", function() {
    var playerOne = $("input[name='radio']:checked", "#playerForm").val();
    $("#playerForm").addClass("displayNone");
    $("#playerOne").html(`You are: <span id="playerOneSpan" class="yellow">${playerOne}</span>`);
  });
}

setPlayerOne();


function getPlayerOne() {
  if (document.getElementById("playerOneSpan") !== null) {
    var playerOne = document.getElementById("playerOneSpan").innerHTML;
    return playerOne;
  }
}


function getComputer() {
  var playerOne = getPlayerOne();
	var computer;
  if (playerOne === "X") {
    computer = "O";
  } else {
    computer = "X";
  }
  
  return computer;
}

//Resets entire game
function hardResetOnclick() {
  $("#resetButton").click(function() {
    document.getElementById("playerForm").reset();
    $("#playerOne, #gameResult, #congratsOrSorry").html("");
    $(".item").removeClass("blue red gray unclickable");
  });
}

hardResetOnclick();

function reset() {
  $(".item").removeClass("blue red gray unclickable");
}

function getRedCount() {
  var redCount = $('#gameGrid .red').length;
  return redCount;
}

function getBlueCount() {
  var blueCount = $('#gameGrid .blue').length;
  return blueCount;
}

function checkForWinner() {
  var winner;
  var playerOne = getPlayerOne();

  var computer = (playerOne === "X") ? "O" : "X";

  var blueWin1 = $("#one.blue, #two.blue, #three.blue").length === 3;
  var blueWin2 = $("#four.blue, #five.blue, #six.blue").length === 3;
  var blueWin3 = $("#seven.blue, #eight.blue, #nine.blue").length === 3;
  var blueWin4 = $("#one.blue, #four.blue, #seven.blue").length === 3;
  var blueWin5 = $("#two.blue, #five.blue, #eight.blue").length === 3;
  var blueWin6 = $("#three.blue, #six.blue, #nine.blue").length === 3;
  var blueWin7 = $("#one.blue, #five.blue, #nine.blue").length === 3;
  var blueWin8 = $("#seven.blue, #five.blue, #three.blue").length === 3;

  var redWin1 = $("#one.red, #two.red, #three.red").length === 3;
  var redWin2 = $("#four.red, #five.red, #six.red").length === 3;
  var redWin3 = $("#seven.red, #eight.red, #nine.red").length === 3;
  var redWin4 = $("#one.red, #four.red, #seven.red").length === 3;
  var redWin5 = $("#two.red, #five.red, #eight.red").length === 3;
  var redWin6 = $("#three.red, #six.red, #nine.red").length === 3;
  var redWin7 = $("#one.red, #five.red, #nine.red").length === 3;
  var redWin8 = $("#seven.red, #five.red, #three.red").length === 3;
  var blueWins = (blueWin1 || blueWin2 || blueWin3 || blueWin4 || blueWin5 || blueWin6 || blueWin7 || blueWin8);
  var redWins = (redWin1 || redWin2 || redWin3 || redWin4 || redWin5 || redWin6 || redWin7 || redWin8);
  var redCount = getRedCount();
  var blueCount = getBlueCount();
  var fullGrid = redCount + blueCount;
  var draw = (fullGrid === 9) && (!blueWins) && (!redWins);

  if (blueWins) {
    winner = blueWins;
    $("#gameResult").html(`<span class='yellowBig'>${playerOne} wins!</span>`);
    $("#congratsOrSorry").html("<span class='yellow'>Congratulations! You won!</span>");
    disableRemainingItems();
    
    return winner;
  }
  if (redWins) {
    winner = redWins;
    $("#gameResult").html(`<span class='redBig'>${computer} wins!</span>`);
    $("#congratsOrSorry").html("<span class='red'>Sorry, you lost.</span>");
    disableRemainingItems();
   
    return winner;
  }
  
  if (draw) {
    winner = draw;
    $("#gameResult").html(`<span class='redBig'>Game is a draw.</span>`);
    $("#congratsOrSorry").html("<span>Game ended in a draw.</span>");
    disableRemainingItems();
    
    return winner;
  } 
}


function disableRemainingItems() {
  var notBlueOrRed = document.querySelectorAll("div.item:not(.blue):not(.red)");
  $(notBlueOrRed).addClass("gray");
  $(notBlueOrRed).addClass("unclickable");
}

function playGame() {
  var winner = checkForWinner();
  
  if (!winner) {
    checkWhoseTurn();
  }
  if (winner) {
    setTimeout(reset, 3000); //call reset after 3 seconds
  }
}

playGame();
	
})();