import { GameService } from './../game.service';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-logic',
  templateUrl: './game-logic.component.html',
  styleUrls: ['./game-logic.component.css']
})
export class GameLogicComponent implements OnInit, OnDestroy {
  public buttonVisibility: 'visible' | 'hidden' = 'hidden';
  private activeSubs: Subscription[] = [];

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
  }

  newGame() {
    const sub = this.gameService.newGame()
      .subscribe((res: any) => {
        this.gameService.showSolution(res.tries[0].fields);
        localStorage.setItem('gameId', JSON.stringify(res._id));
        localStorage.setItem('currentTry', JSON.stringify(0));

        this.buttonVisibility = 'visible';
      });

    this.activeSubs.push(sub);
  }

  trySolution() {
    this.gameService.trySolution();
  }

  removePlayer() {
    this.gameService.removeLastPlayerFromTable();
  }

  ngOnDestroy(): void {
    this.activeSubs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
