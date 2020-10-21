import { GameLogicService } from './../../game-logic/game-logic.service';
import { GameService } from './../../game.service';
import { GameFieldComponent } from './../game-field.component';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Player } from '../../player.model';
@Component({
  selector: 'app-guess-field',
  templateUrl: '../game-field.component.html',
  styleUrls: ['../game-field.component.css']
})
export class GuessFieldComponent extends GameFieldComponent implements OnInit, OnDestroy{
  @Input() event: Observable<Player>;
  @Input() index: number;
  private eventSub: Subscription;
  private isClickable = false;
  private activeSubs: Subscription[] = [];

  constructor(private gameService: GameService,
              protected gameLogicService: GameLogicService) {
    super(gameLogicService);
    const sub = this.gameLogicService.isClickable
      .subscribe((res: { clickable: boolean, index?: number}) => {
        if (res.index) {
          if (res.index === this.index) {
            this.isClickable = res.clickable;
          }
        } else {
          this.isClickable = res.clickable;
        }

      });

    this.activeSubs.push(sub);
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

  ngOnDestroy(): void {
    this.activeSubs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
