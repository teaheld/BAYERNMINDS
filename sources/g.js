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
	constructor() {
		this._solution = [  new Field(0, sources[Math.floor(Math.random() * 6)]),
												new Field(1, sources[Math.floor(Math.random() * 6)]),
												new Field(2, sources[Math.floor(Math.random() * 6)]),
												new Field(3, sources[Math.floor(Math.random() * 6)]) ];
												
		this._current_try = 0;
		this._current_solution = [ new Field(0),
															 new Field(1),
															 new Field(2),
															 new Field(3) ];
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
}

var game = new Game();
game.current_solution[0].src = sources[0];
game.current_solution[1].src = sources[0];
game.current_solution[2].src = sources[0];

add_player(2);

function add_player(src_id) {
	src = sources[src_id];
	
	i = game.current_solution.findIndex(
													function (sol) 
													{ return sol.src === "../images/logo.webp"});
																			
	if(-1 === i)
		return;
		
	game.current_solution[i].src = src;
}


