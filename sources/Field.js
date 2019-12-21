const sources = [ "../images/manu.webp", 
								"../images/lewi.webp", 
								"../images/tomi.webp", 
								"../images/kimich.webp", 
								"../images/thiago.webp",
								"../images/phil.webp"   ];

const res_src = [ "../images/total_guess.png",
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
