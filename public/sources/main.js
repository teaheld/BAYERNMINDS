const buttons = [
    [document.getElementById("tryButton"),
        document.getElementById("removeButton")
    ],
    [document.getElementById("postButton"),
        document.getElementById("name")
    ]
];

function set_buttons(bool) {
    buttons[0].forEach((btn) => { btn.style.visibility = bool; });

    const _bool = (bool === "hidden") ? "visible" : "hidden";
    buttons[1].forEach((btn) => { btn.style.visibility = _bool; });
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
};

function add_player(src_id) {
    if (true === game.finished) {
        return;
    }

    const i = game.find_first_free();
    if (-1 === i) {
        alert("Remove a player!");
        return;
    }

    const src = sources[src_id];
    game.tries[current_try_index()][i].src = src;
}

function remove_player() {
    const i = game.find_last_player();
    if (-1 === i) {
        alert("You don't have any player on the field!");
        return;
    }

    game.tries[current_try_index()][i].free();
}

function remove_player_onclick(index) {
    if (current_try_index() !== Math.floor(index / 4) || game.finished === true) {
        return;
    }

    game.tries[Math.floor(index / 4)][index % 4].free();
}

function try_solution() {
    if (-1 !== game.find_first_free()) {
        alert("Fields must not be empty!");
        return;
    }

    const guessed = game.set_guessed();
    if (true === guessed || current_try_index() === 5) {
        game.finished = true;
        game.calculate_score(guessed);
        set_buttons("hidden");
        game.set_solution();

        if (true === guessed) {
            alert("Congratulations! You won!!! Your score is " + game.score + "!");
        } else {
            alert("Unfortunately, you didn't win, but your score " + game.score + " is very good!");
        }

        return;
    }

    game.initialize_next_try();
}

function postJSON(data) {
    fetch('http://localhost:3000/users', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.text())
        .then((msg) => console.log(msg))
        .catch((error) => {
            console.error('Error:', error);
        });
}

function post_score() {
    const data = { name: buttons[1][1].value.trim() || "Bastian Schweinsteiger", score: game.score };

    postJSON(data);

    buttons[1].forEach((btn) => { btn.style.visibility = "hidden"; });
}

function src_split(src) {
    return src.split("/").pop();
}