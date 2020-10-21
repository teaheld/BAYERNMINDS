import { Subscription } from 'rxjs';
import { GameLogicService } from './../../game-logic/game-logic.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { GameFieldComponent } from '../game-field.component';

@Component({
  selector: 'app-player-field',
  templateUrl: '../game-field.component.html',
  styleUrls: ['../game-field.component.css']
})
export class PlayerFieldComponent extends GameFieldComponent implements OnInit, OnDestroy {
  // tslint:disable: variable-name
  @Input() private _id: string;
  private isClickable = false;
  private activeSubs: Subscription[] = [];

  constructor(protected gameLogicService: GameLogicService) {
    super(gameLogicService);
    const sub = this.gameLogicService.gameOn
      .subscribe((res: boolean) => {
        this.isClickable = res;
      });

    this.activeSubs.push(sub);
  }

  ngOnInit(): void {
    console.log('Ej bre');
  }

  onClick() {
    if (this.isClickable) {
      this.gameLogicService.addPlayerToTable(this._id, this.imagePath);
    }
  }

  ngOnDestroy(): void {
    this.activeSubs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
