$(document).ready(function () {
	"use strict";

	var noteList = [];
	var playerNoteList = [];
	var intervaTime = 2000;
	var step = 0;
	var level = 0;
	var ready = false;
	var seq, timeout;
	$('#restart').hide();
	$('#startGame').show();

	//Starts game on button click
	$('#startGame').on('click', function() {
		ready = true;
		intervaTime = 1000;
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
		ready = false;
	});

	//Resets level, notes, etc
	function reset() {
		noteList = genNotes();
		$('#level').text("Level: 0");
		playerNoteList = [];
		step = 0;
		level = 0;
	}

	//Calls reset and play
	function start() {
		reset();
		playNoteSeq();
	}

	$('#blue, #green, #yellow, #red').on('click', function() {
		// notes to be played if game hasnt started
		if (ready) {
			var clickedNote = this.id;
			playerNoteList.push(clickedNote);

			if (playerNoteList.length === (step + 1)) {
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
		$('#level').text('Level: ' + step);
		playNoteSeq();
		playerNoteList = [];
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
			if (noteList[i] !== playerNoteList[i]) {
				return false;
			}
		}
		return true;
	}

	//Live checks notes
	function checkSomeNotes() {
		for (var i = 0; i < playerNoteList.length; i++) {
			if (noteList[i] !== playerNoteList[i]) {
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
		seq = setInterval(playInterval, intervaTime); }, 1000);
	}

	function playInterval() {

		playNote(noteList[level]);

		// play all notes up to current step
		if (step <= level) {

			// make notes clickable
			$('#blue, #green, #yellow, #red').css("pointer-events", "auto");

			// stop setInterval 
			clearInterval(seq);
		}
		level++;
	}

	// creates a random list of numbers that do not repeat, no 1,1...
	// min: min number in range
	// max: max number in range
	// length: length of the number array to create
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
					nextRandom = _random(previous + 1, max);
				} else {
					nextRandom = _random(min, previous - 1);
				}
			}

			numbers.push(nextRandom);
			return nextRandom;
		}, _random(min, max));

		return numbers;
	}

	// pair notes to their random numbers
	function genNotes() {
		var randomNotes = [];
		var notes = ['blue', 'green', 'yellow', 'red'];
		var randomNum = random(0, 3, 20);

		for (var i = 0; i < randomNum.length; i++) {
			randomNotes.push(notes[randomNum[i]]);
		}
		return randomNotes;
	}

	$('#blue').click(function() {playNote('blue');});
	$('#green').click(function() {playNote('green');});
	$('#yellow').click(function() {playNote('yellow');});
	$('#red').click(function() {playNote('red');});

	// note is a char pulled from the id of each button
	function playNote(note) {
		// light up note
		$('#' + note).focus();

		// keep note lit for the full intervralTime
		setTimeout(function() {
			$('#' + note).blur();
		}, intervaTime);

		playAudioNote(note + 'Audio');

		//Plays note then resets the audio file
		function playAudioNote(note) {
			var n = document.getElementById(note);
			n.currentTime = 0;
			n.play();
		}
	}
});