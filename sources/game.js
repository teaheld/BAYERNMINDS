var sources = [ "../images/manu.webp", 
								"../images/lewi.webp", 
								"../images/tomi.webp", 
								"../images/kimich.webp", 
								"../images/thiago.webp",
								"../images/phil.webp"   ];

var res_src = [ "../images/total_guess.png",
									"../images/part_guess.png"  ];

class Field {
	constructor(id, src = "../images/logo.webp") {
		this._id = id;
		this._src = src;
	}
	
	get id() {
		return this._id;
	}
	
	get src() {
		return this._src;
	}
	
	set src(src) {
		this._src = src;
	}
}

class Game {
	constructor(max_tries) {
		this._solution = [  new Field(0, sources[Math.floor(Math.random() * 6)]),
												new Field(1, sources[Math.floor(Math.random() * 6)]),
												new Field(2, sources[Math.floor(Math.random() * 6)]),
												new Field(3, sources[Math.floor(Math.random() * 6)]) ];
												
		this._current_try = 0;
		this._current_solution = [ new Field(0),
															 new Field(1),
															 new Field(2),
															 new Field(3) ];
		
		this._max_tries = max_tries;
	}
	
	get solution() {
		return this._solution;
	}
	
	get current_try() {
		return this._current_try;
	}
	
	get current_solution() {
		return this._current_solution;
	}
	
	get max_tries() {
		return this._max_tries;
	}
	
	remove_try() {
		/* Number of completely guessed players. */
		var completely_guessed = this._current_solution
														.filter(function (curr_sol, i) 
														{ return curr_sol.src ===  this[i].src; }
														, this._solution)
														.length;
										
		/* For each player calculate number of fields in the solution. */			
		var total_in_sol = sources
											.map( function (src) 
											{ return (this.filter( function (sol)
											{ return sol.src === this }, src)).length}
											, this._solution);
			
		/* For each player calculate number of fields in the current solution. */									
		var total_in_curr_sol = sources
														.map( function (src) 
														{ return (this.filter( function (curr_sol)
														{ return curr_sol.src === this }, src)).length}
														, this._current_solution);
		
		/* For each player, number of guessed fields is min(total_in_sol, total_in_curr_sol).
			 Number of guesses is when we sum number of guessed for each player. */
		var guessed = total_in_sol
									.map(function (sol, i) 
									{ return Math.min(sol, this[i]); }
									, total_in_curr_sol)
									.reduce(function(total, el) 
									{return total + el; });	
										
		set_guessed(completely_guessed, guessed - completely_guessed);
		
		this._current_try++;
		
		return (completely_guessed === 4) ? 1 : 0; 
	}
}

var game;

function new_game() {
	game = new Game(6);
	
	clean_up();
}

function try_solution() {
	if(game.current_solution.some(function (sol) { return sol.src === "../images/logo.webp"}) === true) {
		alert("Fields must not be empty!");
		return;
	}

	var guessed = game.remove_try();
	if(game.current_try === game.max_tries || 1 === guessed) {
		Array.from(document.getElementsByClassName("solution"))
								.map(function (img, i) 
								{ img.src = game.solution[i].src; });
		document.getElementById("tryButton").style.visibility = "hidden";
		document.getElementById("removeButton").style.visibility = "hidden";
		
		if(1 === guessed) {
			alert("Congratulations! You won!!!");
		}
		
		return;
	}
	
	game.current_solution
		.forEach(function (sol) 
		{ sol.src =  "../images/logo.webp"; });
}

function add_player(src_id) {
	src = sources[src_id];
	
	i = game.current_solution
			.findIndex(function (sol) 
			{ return sol.src === "../images/logo.webp"});
																			
	if(-1 === i) {
		alert("Remove some player to put this one!");
		return;
	}
		
	game.current_solution[i].src = src;
	document.getElementsByClassName("try_" + game.current_try.toString())[i].src = src;
}

function remove_player() {
	i = game.current_solution
			.findIndex(function (sol) 
			{ return sol.src === "../images/logo.webp"});
			
	if(-1 === i) {
		i = 3;
	}
	else if(0 === i) {
		alert("You don't have any player on the field!");
		return;
	} else {
		i--;
	}
	
	game.current_solution[i].src = "../images/logo.webp";
	document.getElementsByClassName("try_" + game.current_try.toString())[i].src = "../images/logo.webp";
}

function set_guessed(total_guessed, player_guessed) {
	var guessed = [total_guessed, player_guessed];
	Array.from(document.getElementsByClassName("res_" + game.current_try.toString()))
							.forEach(function (img, i) 
							{ if (i < this[0]) {
								img.src = res_src[0];
							} else if(i < this[0] + this[1]) {
								img.src = res_src[1];
							} else {
								img.style.visibility = "hidden"; } 
							} , guessed);
}

function clean_up() {
	var i;
	for(i = 0; i < game.max_tries; i++) {
		Array.from(document.getElementsByClassName("try_" + i.toString()))
								.forEach(function (img) 
								{ img.src = "../images/logo.webp"; });
	  Array.from(document.getElementsByClassName("res_" + i.toString()))
								.forEach(function (img) 
								{ img.src = "../images/logo.webp"; 
									img.style.visibility = "visible"; });
	}
	
	Array.from(document.getElementsByClassName("solution"))
							.forEach(function (img) 
							{ img.src = "../images/logo.webp"; });
								
	document.getElementById("tryButton").style.visibility = "visible";
	document.getElementById("removeButton").style.visibility = "visible";
}
