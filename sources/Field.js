const sources = ["../images/manu.webp",
    "../images/lewi.webp",
    "../images/tomi.webp",
    "../images/kimich.webp",
    "../images/thiago.webp",
    "../images/phil.webp"
];

const res_src = ["../images/total_guess.png",
    "../images/part_guess.png"
];

class Field {
    constructor(type, count, src = "../images/logo.webp") {
        this._field = document.getElementsByClassName(type + Math.floor(count / 4))[count % 4];

        this._field.src = src;
    }

    get src() {
        return src_split(this._field.src);
    }

    set src(src) {
        this._field.src = src;
    }

    set visibility(bool) {
        this._field.style.visibility = bool;
    }

    check_src_equality(src = "logo.webp") {
        return (this.src === src) ? true : false;
    }

    free() {
        this._field.src = "../images/logo.webp";
    }
}

class TryField extends Field {
    constructor() {
        super("try_", ++TryField.count);
    }
}

class ResField extends Field {
    constructor() {
        super("res_", ++ResField.count);
    }
}

class SolField extends Field {
    constructor(src) {
        super("solution_", ++SolField.count, src);
        super.visibility = "hidden";
    }
}