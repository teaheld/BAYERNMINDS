import { GameLogicService } from './../../game-logic/game-logic.service';
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
  @Input() index: number;
  private isClickable = false;
  private activeSubs: Subscription[] = [];

  constructor(protected gameLogicService: GameLogicService) {
    super(gameLogicService);
    const sub = this.gameLogicService.isClickable
      .subscribe((res: { clickable: boolean, index?: number}) => {
        if (res.index === undefined) {
          this.isClickable = res.clickable;
        } else {
          if (res.index === this.index) {
            this.isClickable = res.clickable;
          }
        }

      });

    this.activeSubs.push(sub);
  }

  ngOnInit(): void {
    const sub = this.gameLogicService.playerChanged
      .subscribe((res: {imagePath: string, index: number}) => {
        if (res.index === this.index) {
          this.imagePath = res.imagePath;
        }
      });

    this.activeSubs.push(sub);
  }

  onClick() {
    if (this.isClickable) {
      this.gameLogicService.removePlayerFromTable(this.index);

      this.imagePath = this.logoUrl;
    }
  }

  ngOnDestroy(): void {
    this.activeSubs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
