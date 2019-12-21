class Game {
	constructor(max_tries) {
		this._solution = [  new Field(0, sources[Math.floor(Math.random() * 6)]),
												new Field(1, sources[Math.floor(Math.random() * 6)]),
												new Field(2, sources[Math.floor(Math.random() * 6)]),
												new Field(3, sources[Math.floor(Math.random() * 6)]) ];
												
		this._current_try = 0;
		this._current_solution = [ new Field(0),
															 new Field(1),
															 new Field(2),
															 new Field(3) ];
		
		this._max_tries = max_tries;
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
	
	get max_tries() {
		return this._max_tries;
	}
	
	remove_try() {
		/* Number of completely guessed players. */
		const completely_guessed = this._current_solution
                                            .filter( (curr_sol, i) =>
                                            { return curr_sol.src ===  this._solution[i].src; })
                                            .length;
										
		/* For each player calculate number of fields in the solution. */			
		const total_in_sol = sources
                                .map( (src) =>
                                { return (this._solution.filter( (sol) =>
                                { return sol.src === src })).length});
			
		/* For each player calculate number of fields in the current solution. */									
		const total_in_curr_sol = sources
                                    .map( (src) =>
                                    { return (this._current_solution.filter( (curr_sol) =>
                                    { return curr_sol.src === src })).length});
		
		/* For each player, number of guessed fields is min(total_in_sol, total_in_curr_sol).
			 Number of guesses is when we sum number of guessed for each player. */
		const guessed = total_in_sol
                            .map( (sol, i) =>
                            { return Math.min(sol, total_in_curr_sol[i]); })
                            .reduce( (total, el) =>
                            { return total + el; });	
										
		set_guessed(completely_guessed, guessed - completely_guessed);
		
		this._current_try++;
		
		return (completely_guessed === 4) ? 1 : 0; 
	}
}
