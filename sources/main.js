var game;

function new_game() {
	if(game !== undefined) {
		set_up();
	}
	
	document.getElementById("tryButton").style.visibility = "visible";
	document.getElementById("removeButton").style.visibility = "visible";
	
	game = new Game(6);
}

function try_solution() {
	if(game.current_solution.some( (sol) => { return sol.src === "../images/logo.webp"}) === true) {
		alert("Fields must not be empty!");
		return;
	}

	const guessed = game.remove_try();
	if(game.current_try === game.max_tries || 1 === guessed) {
		Array.from(document.getElementsByClassName("solution"))
								.map( (img, i) => 
								{ img.src = game.solution[i].src; });
		document.getElementById("tryButton").style.visibility = "hidden";
		document.getElementById("removeButton").style.visibility = "hidden";
		
		if(1 === guessed) {
			alert("Congratulations! You won!!!");
		}
		
		return;
	}
	
	// initialize next try
	game.current_solution
		.forEach( (sol) =>
		{ sol.src =  "../images/logo.webp"; });
}

function add_player(src_id) {
	const src = sources[src_id];
	
	const i = game.current_solution
			.findIndex( (sol) =>
			{ return sol.src === "../images/logo.webp"});
																			
	if(-1 === i) {
		alert("Remove some player to put this one!");
		return;
	}
		
	game.current_solution[i].src = src;
	document.getElementsByClassName("try_" + game.current_try.toString())[i].src = src;
}

function remove_player() {
	let i = game.current_solution
			.findIndex( (sol) =>
			{ return sol.src === "../images/logo.webp"});
			
	if(-1 === i) {
		i = 3;
	} else if(0 === i) {
		alert("You don't have any player on the field!");
		return;
	} else {
		i--;
	}
	
	game.current_solution[i].src = "../images/logo.webp";
	document.getElementsByClassName("try_" + game.current_try.toString())[i].src = "../images/logo.webp";
}

function set_guessed(total_guessed, player_guessed) {
	const guessed = [total_guessed, player_guessed];
	Array.from(document.getElementsByClassName("res_" + game.current_try.toString()))
							.forEach( (img, i) =>
							{ if (i < guessed[0]) {
								img.src = res_src[0];
							} else if(i < guessed[0] + guessed[1]) {
								img.src = res_src[1];
							} else {
								img.style.visibility = "hidden"; } 
							});
}

function set_up() {
	for(let i = 0; i < game.current_try; i++) {
		Array.from(document.getElementsByClassName("try_" + i.toString()))
								.forEach( (img) =>
								{ img.src = "../images/logo.webp"; });
	  Array.from(document.getElementsByClassName("res_" + i.toString()))
								.forEach( (img) =>
								{ img.src = "../images/logo.webp"; 
									img.style.visibility = "visible"; });
	}
	
	Array.from(document.getElementsByClassName("solution"))
							.forEach( (img) =>
							{ img.src = "../images/logo.webp"; });
}
