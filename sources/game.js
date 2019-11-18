class Game {
	constructor() {
		this.num_of_trials = 6;
	}
	
	write_trials() {
		return this.num_of_trials;
	}
	
	remove_trial() {
		this.num_of_trials--;
	}
}

var g;

function newGame() {
	g = new Game();
	
	document.getElementById("tryButton").style.visibility = "visible"; 
	document.getElementById("pisi").innerHTML = g.write_trials();
}

function Try() {
	g.remove_trial();
	
	document.getElementById("pisi").innerHTML = g.write_trials();
}
