import { GameLogicService } from './game-logic.service';
import { GameServerService } from './../game-server.service';
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

  constructor(private gameService: GameService,
              private gamesServerService: GameServerService,
              private gameLogicService: GameLogicService) {
    const sub = this.gameLogicService.isClickable
      .subscribe((res: boolean) => {
        if (res) {
          this.buttonVisibility = 'visible';
        } else {
          this.buttonVisibility = 'hidden';
        }
      });

    this.activeSubs.push(sub);
  }

  ngOnInit(): void {
  }

  newGame() {
    this.gameLogicService.newGame();
  }

  trySolution() {
    this.gameLogicService.trySolution();
  }

  removePlayer() {
    this.gameLogicService.removeLastPlayerFromTable();
  }

  ngOnDestroy(): void {
    this.activeSubs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
