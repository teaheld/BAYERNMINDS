var sources = [ "../images/manu.webp", 
						"../images/lewi.webp", 
						"../images/tomi.webp", 
						"../images/kimich.webp", 
						"../images/thiago.webp",
						"../images/phil.webp"   ];

class Game {
	constructor() {
		this._max_number_of_trials = 6;
		this._current_try = 0;
		this._solution = [ sources[Math.floor(Math.random() * 6)], 				  								
											 sources[Math.floor(Math.random() * 6)], 	 			
											 sources[Math.floor(Math.random() * 6)], 
											 sources[Math.floor(Math.random() * 6)] ];   
	}
	
	get solution() {
		return this._solution;
	}
	
	get current_try() {
		return this._current_try;
	}
	
	write_trials() {
		return this.current_try;
	}
	
	remove_trial() {
		this._current_try++;
	}
	
}

var g;

function newGame() {
	g = new Game();
	
	document.getElementById("tryButton").style.visibility = "visible"; 
}

function Try() {
	g.remove_trial();
	
	/*
	var i;
	var res = false;
	for(i = 1; i < 5; i++) {
		if(check_src_equality(i) == true) {
			res = true;
			break;
		}
	}*/
	
	//document.getElementById("pisi").innerHTML = res;
	/*if([1, 2, 3, 4].every(check_src_equality) == false) {
		document.getElementById("pisi").innerHTML = "MOze!";
	} else { document.getElementById("pisi").innerHTML = "NEMOze!"; }*/
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


function check_src_equality(i, src = "logo.webp") {
	curr_try = g.current_try;
	
	img_i = "try_" + curr_try.toString();
	curr_src = document.getElementsByClassName(img_i)[i].src.split("/").pop();
		
	if(curr_src === src) {
		return true;
	} else { return false; }
}

function add(src) {
	curr_try = g.current_try;
	
	var i;
	img_i = "try_" + curr_try.toString();
	for(i = 0; i < 4; i++) {
		if(check_src_equality(i) == true) {
			document.getElementsByClassName(img_i)[i].src = src;
			break;
		}
	}
}
