var sources = [ "../images/manu.webp", 
								"../images/lewi.webp", 
								"../images/tomi.webp", 
								"../images/kimich.webp", 
								"../images/thiago.webp",
								"../images/phil.webp"   ];

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
		this._current_try++;
	}
}

var game;

function newGame() {
	game = new Game(6);
	
	cleanUpScene();
	document.getElementById("tryButton").style.visibility = "visible";
}

function Try() {
	if(game.current_solution.some(
													function (sol)
													{ return sol.src === "../images/logo.webp"}) 
													=== true) {
		alert("Fields must not be empty!");
		return;
	}

	game.remove_try();
	if(game.current_try === game.max_tries) {
		Array.from(document.getElementsByClassName("solution"))
						.map(function (img, i) 
								{ img.src = game.solution[i].src; });
		document.getElementById("tryButton").style.visibility = "hidden";
		
		return;
	}
	
	game.current_solution.map(function (sol) 
											{ sol.src =  "../images/logo.webp"; });
}

function add_player(src_id) {
	src = sources[src_id];
	
	i = game.current_solution.findIndex(
													function (sol) 
													{ return sol.src === "../images/logo.webp"});
																			
	if(-1 === i) {
		alert("Remove some player to put this one!");
	}
		
		
	game.current_solution[i].src = src;
	document.getElementsByClassName(
					"try_" + game.current_try.toString())[i].src = src;
}

function cleanUpScene() {
	var i;
	for(i = 0; i < game.max_tries; i++) {
		Array.from(document.getElementsByClassName("try_" + i.toString()))
						.map(function (img) 
								{ img.src = "../images/logo.webp"; });
	}
	
	Array.from(document.getElementsByClassName("solution"))
						.map(function (img) 
								{ img.src = "../images/logo.webp"; });
}
