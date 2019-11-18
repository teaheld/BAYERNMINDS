class Game {
	constructor() {
		this.max_number_of_trials = 6;
		this.current_try = 0;
	}
	
	write_trials() {
		return this.current_try;
	}
	
	remove_trial() {
		this.current_try++;
	}
}

var g;

function newGame() {
	g = new Game();
	
	document.getElementById("tryButton").style.visibility = "visible"; 
}

function Try() {
	g.remove_trial();
}

function addManu() {
	add("../images/manu.webp");
}

function addLewi() {
	add("../images/lewi.webp");
}

function addTomi() {
	add("../images/tomi.webp");
}

function addKimich() {
	add("../images/kimich.webp");
}

function addThiago() {
	add("../images/thiago.webp");
}

function addPhil() {
	add("../images/phil.webp");
}

function add(src) {
	curr_try = g.current_try;
	
	for(i = 1; i < 5; i++) {
		img_i = "img_" + i.toString();
		curr_src = document.getElementsByClassName(img_i)[curr_try].src.split("/").pop();
		
		if(curr_src === "logo.webp") {
			document.getElementsByClassName(img_i)[curr_try].src = src;
			break;
		}
	}
}
