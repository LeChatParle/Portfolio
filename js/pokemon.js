function retrieve() {
	"use strict";
	var chosenPokemon = Number($("#pokemonID").val());
	console.log(chosenPokemon);
	$("#pokeText").empty();
	$("#pokePic").empty();

	$.ajax({
		url: 'https://pokeapi.co/api/v2/pokemon/' + chosenPokemon,

    success: function(data) {
			console.log("reached 2");
			let pokemonID = data.id;
			let pokemonName = data.name;
			let pokeType1 = data.types[0].type.name;
			let pokeType2;
			if (data.types.length > 1) {pokeType2 = data.types[1].type.name;}
			let pokePhoto = data.sprites.front_default;

			$("#pokeText").append(`<h3>${pokemonName}, #${pokemonID}</h3>`);
			if (pokeType2) {$("#pokeText").append(`<p>${pokeType1}/${pokeType2}</p>`);}
			else {$("#pokeText").append(`<p>${pokeType1}</p>`);}
			$("#pokePic").append(`<img src=${pokePhoto} alt='A pokemon sprite' width="75%">`);
    }
	});
}	
