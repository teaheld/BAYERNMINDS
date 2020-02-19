const try_btn = document.getElementById("tryButton"),
    remove_btn = document.getElementById("removeButton");

function set_buttons(bool) {
    try_btn.style.visibility = bool;
    remove_btn.style.visibility = bool;
}

function set_up() {
    for (let i = 0; i <= TryField.count / 4; i++) {
        Array.from(document.getElementsByClassName("try_" + i.toString()))
            .forEach((img) => { img.src = "../images/logo.webp"; });

        Array.from(document.getElementsByClassName("res_" + i.toString()))
            .forEach((img) => {
                img.src = "../images/logo.webp";
                img.style.visibility = "visible";
            });
    }

    Array.from(document.getElementsByClassName("solution_0"))
        .forEach((img) => { img.src = "../images/logo.webp"; });
}

let game;

function new_game() {
    if (game != undefined) {
        set_up();
    }

    set_buttons("visible");

    TryField.count = -1;
    SolField.count = -1;
    ResField.count = -1;

    game = new Game();
}

function add_player(src_id) {
    const src = sources[src_id];

    const i = game.find_free();

    if (-1 === i) {
        alert("Remove a player!");
        return;
    }

    game.current_solution[i].src = src;
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

    game.current_solution[i].free();
}

function try_solution() {
    if (-1 !== game.find_free()) {
        alert("Fields must not be empty!");
        return;
    }

    const guessed = game.set_guessed();
    if (true === guessed || TryField.count === 23) {
        game.set_solution();

        set_buttons("hidden");

        if (true == guessed) {
            alert("Congratulations! You won!!!");
        }

        return;
    }

    game.initialize_next_try();
}