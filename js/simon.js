$(document).ready(function () {
	"use strict";

	var sounds = [];
	var playerSounds = [];
	var waitInterval = 2000;
	var step = 0;
	var level = 0;
	var gameStarted = false;
	var seq, timeout;
	var blueSound = '../as/C.mp3';
  var audioBlue = new Audio(blueSound);
	var greenSound = '../as/D.mp3';
  var audioGreen = new Audio(greenSound);
	var yellowSound = '../as/E.mp3';
  var audioYellow = new Audio(yellowSound);
	var redSound = '../as/F.mp3';
  var audioRed = new Audio(redSound);

	$('#restart').hide();
	$('#startGame').show();

	//Starts game on button click
	$('#startGame').on('click', function() {
		gameStarted = true;
		waitInterval = 1000;
		$('#startGame').hide();
		$('#restart').show();
		start();
	});

	//Resets game on button click
	$('#restart').on('click', function() {
		clearInterval(seq);
		clearTimeout(timeout);
		$('#startGame').show();
		$(this).hide();
		gameStarted = false;
	});

	//Resets level, notes, etc
	function reset() {
		sounds = genNotes();
		$('#level').text("Level: 0");
		playerSounds = [];
		step = 0;
		level = 0;
	}

	//Calls reset and play
	function start() {
		reset();
		playNoteSeq();
	}

	/*
	Checks to see if game has been started, if so, adds note to playerSounds array.
	Then if the clicked notes match the played notes, next level, else fail.
	*/
	$('#blue, #green, #yellow, #red').on('click', function() {
		if (gameStarted) {
			var clickedNote = this.id;
			playerSounds.push(clickedNote);

			if (playerSounds.length === (step + 1)) {
				if (checkAllNotes()) {
					nextLevel();
				} else {
					failedLevel();
				}
			} else if (!checkSomeNotes()) {
				failedLevel();
			}
		}
	});

	//Sets level one higher and starts new level
	function nextLevel() {
		step++;
		$('#level').text(`Level: ${step}`);
		playNoteSeq();
		playerSounds = [];
	}

	//On failure, game resets after 3 seconds
	function failedLevel() {
		$('#level').text("Fail! Try again!");
		setTimeout(function() {
		reset();
		$('#startGame').show();
		$('#restart').hide();
		}, 3000);
	}

	//Confirms correct notes
	function checkAllNotes() {
		for (var i = 0; i <= step; i++) {
			if (sounds[i] !== playerSounds[i]) {
				return false;
			}
		}
		return true;
	}

	//Live checks notes
	function checkSomeNotes() {
		for (var i = 0; i < playerSounds.length; i++) {
			if (sounds[i] !== playerSounds[i]) {
				return false;
			}
		}
		return true;
	}

	//Plays notes, sets click state to none, and waits a set time
	function playNoteSeq() {
		$('#blue, #green, #yellow, #red').css("pointer-events", "none");
		timeout = setTimeout(function() {
			level = 0;
			seq = setInterval(playInterval, waitInterval);
		}, 1000);
	}

	function playInterval() {
		playNote(sounds[level]);

		// play all notes up to current step
		if (step <= level) {
			// make notes clickable
			$('#blue, #green, #yellow, #red').css("pointer-events", "auto");
			// stop setInterval
			clearInterval(seq);
		}
		level++;
	}

	//Creates a random array of non-repeating numbers.
	function random(min, max, length) {
		var numbers = [];

		function _random(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		Array.apply(null, new Array(length)).reduce(function(previous) {
			var nextRandom;

			if (previous === min) {
				nextRandom = _random(min + 1, max);
			} else if (previous === max) {
				nextRandom = _random(min, max - 1);
			} else {
				if (_random(0, 1)) {
					nextRandom = _random(min + 1, max);
				} else {
					nextRandom = _random(min, max - 1);
				}
			}

			numbers.push(nextRandom);
			return nextRandom;
		}, _random(min, max));

		return numbers;
	}

	//Pairs notes to random numbers
	function genNotes() {
		var randomNotes = [];
		var notes = ['blue', 'green', 'yellow', 'red'];
		var randomNum = random(0, 3, 500); //The world record is 14 games of 31 moves, so I'll just set this to 500 so no one can win

		for (var i = 0; i < randomNum.length; i++) {
			randomNotes.push(notes[randomNum[i]]);
		}
		return randomNotes;
	}

	//When notes are clicked, plays sounds
	$('#blue').click(function() {audioBlue.play(); audioBlue.currentTime = 0;});
	$('#green').click(function() {audioGreen.play(); audioGreen.currentTime = 0;});
	$('#yellow').click(function() {audioYellow.play(); audioYellow.currentTime = 0;});
	$('#red').click(function() {audioRed.play(); audioRed.currentTime = 0;});

	//Switch to determine which note to play based on array. Timeout keeps button lit
	function playNote(note) {
		// light up note
		$('#' + note).focus();

		setTimeout(function() {
			$('#' + note).blur();
		}, 500);

		switch(note) {
			case "blue":
				audioBlue.play();
				audioBlue.currentTime = 0;
				break;
			case "green":
				audioGreen.play();
				audioGreen.currentTime = 0;
				break;
			case "yellow":
				audioYellow.play();
				audioYellow.currentTime = 0;
				break;
			case "red":
				audioRed.play();
				audioRed.currentTime = 0;
				break;
		}
	}
});
