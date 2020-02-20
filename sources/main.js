const try_btn = document.getElementById("tryButton"),
    remove_btn = document.getElementById("removeButton");

function set_buttons(bool) {
    try_btn.style.visibility = bool;
    remove_btn.style.visibility = bool;
}

function set_up() {
    game.tries.forEach((tryy) => { tryy.forEach((img) => { img.src = "../images/logo.webp" }); });

    game.res_fields.forEach((tryy) => {
        tryy.forEach((img) => {
            img.src = "../images/logo.webp";
            img.visibility = "visible"
        });
    });
}

let game;

function new_game() {
    if (game !== undefined) {
        set_up();
    }

    set_buttons("visible");

    [TryField.count, SolField.count, ResField.count] = [-1, -1, -1];

    game = new Game();
}

let current_try_index = function() {
    return Math.floor(TryField.count / 4);
}

function add_player(src_id) {
    const i = game.find_free();
    if (-1 === i) {
        alert("Remove a player!");
        return;
    }

    const src = sources[src_id];
    game.tries[current_try_index()][i].src = src;
}

function remove_player() {
    let i = game.find_free();
    if (0 === i) {
        alert("You don't have any player on the field!");
        return;
    } else if (-1 === i) {
        i = 3;
    } else {
        --i;
    }

    game.tries[current_try_index()][i].free();
}

function try_solution() {
    if (-1 !== game.find_free()) {
        alert("Fields must not be empty!");
        return;
    }

    const max_tries = 5,
        guessed = game.set_guessed();
    if (true === guessed || current_try_index() === max_tries) {
        game.set_solution();

        set_buttons("hidden");

        if (true === guessed) {
            alert("Congratulations! You won!!!");
        }

        return;
    }

    game.initialize_next_try();
}

function src_split(src) {
    return src.split("/").pop();
}