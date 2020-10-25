import { GameLogicService } from './game-logic/game-logic.service';
import { GameLogicComponent } from './game-logic/game-logic.component';
import { GameServerService } from './game-server.service';
import { Player } from './player.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  public players: Player[] = [];
  private activeSubs: Subscription[] = [];

  constructor(private gameServerService: GameServerService,
              private gameLogicService: GameLogicService) {
    const sub = this.gameServerService.getPlayers()
      .subscribe((res: Player[]) => {
        this.players = res;
      });

    this.activeSubs.push(sub);

    const gameId = JSON.parse(localStorage.getItem('gameId'));
    if (gameId) {
      this.gameLogicService.getTries(gameId);
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.activeSubs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
