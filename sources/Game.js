class Game {
    constructor() {
        this._solution = [new SolField(sources[Math.floor(Math.random() * 6)]),
            new SolField(sources[Math.floor(Math.random() * 6)]),
            new SolField(sources[Math.floor(Math.random() * 6)]),
            new SolField(sources[Math.floor(Math.random() * 6)])
        ];

        this._tries = [
            [new TryField(),
                new TryField(),
                new TryField(),
                new TryField()
            ]
        ];

        this._res_fields = [];
    }

    get solution() {
        return this._solution;
    }

    get tries() {
        return this._tries;
    }

    get res_fields() {
        return this._res_fields;
    }

    find_free() {
        return this._tries[current_try_index()].findIndex((sol) => { return sol.check_src_equality(); });
    }

    find_completely_guessed() {
        return this._tries[current_try_index()].filter((curr_sol, i) => {
            return curr_sol.check_src_equality(this._solution[i].src);
        }).length;
    }

    count_in_sol() {
        return sources.map((src) => {
            return (this._solution.filter((sol) => { return sol.check_src_equality(src); })).length
        });
    }

    count_in_curr() {
        return sources.map((src) => {
            return (this._tries[current_try_index()].filter((curr_sol) => { return curr_sol.check_src_equality(src); })).length
        });
    }

    count_guessed() {
        const completely_guessed = this.find_completely_guessed(),
            total_in_sol = this.count_in_sol(),
            total_in_curr = this.count_in_curr();

        const guessed = total_in_sol.map((sol, i) => { return Math.min(sol, total_in_curr[i]); })
            .reduce((total, el) => { return total + el; });

        return [completely_guessed, guessed - completely_guessed];
    }

    set_guessed() {
        const guessed = this.count_guessed();

        this._res_fields.push([new ResField(),
            new ResField(),
            new ResField(),
            new ResField()
        ]);

        this._res_fields[Math.floor(ResField.count / 4)].forEach((img, i) => {
            if (i < guessed[0]) {
                img.src = res_src[0];
            } else if (i < guessed[0] + guessed[1]) {
                img.src = res_src[1];
            } else {
                img.visibility = "hidden";
            }
        });

        return (guessed[0] === 4) ? true : false;
    }

    initialize_next_try() {
        this._tries.push([new TryField(),
            new TryField(),
            new TryField(),
            new TryField()
        ]);
    }

    set_solution() {
        this._solution.forEach((sol) => { sol.visibility = "visible"; });
    }
}