import { GameLogicService } from './../../game-logic/game-logic.service';
import { GameService } from './../../game.service';
import { GameFieldComponent } from './../game-field.component';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Player } from '../../player.model';
@Component({
  selector: 'app-guess-field',
  templateUrl: '../game-field.component.html',
  styleUrls: ['../game-field.component.css']
})
export class GuessFieldComponent extends GameFieldComponent implements OnInit{
  @Input() event: Observable<Player>;
  @Input() index: number;
  private eventSub: Subscription;

  constructor(private gameService: GameService,
              protected gameLogicService: GameLogicService) {
    super(gameLogicService);
  }

   ngOnInit(): void {
     this.eventSub = this.event
      .subscribe((res: Player) => {
        this.imagePath = res.imagePath;
      });
   }

  onClick() {
    if (this.isClickable) {
      this.gameLogicService.removePlayerFromTable(this.index);
      console.log('Evo');

      this.imagePath = this.logoUrl;
    }
  }

}
