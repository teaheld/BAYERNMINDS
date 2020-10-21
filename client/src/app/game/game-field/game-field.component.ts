import { GameLogicService } from './../game-logic/game-logic.service';
import { Subscription } from 'rxjs';
import { Component, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.css']
})
export class GameFieldComponent implements OnInit {
  protected readonly logoUrl = '../assets/asset-images/logo.webp';
  // tslint:disable: variable-name
  @Input() _imagePath = this.logoUrl;
  protected activeSubs: Subscription;
  protected isClickable = false;
  public visible: 'visible' | 'hidden' = 'visible';

  constructor(protected gameLogicService: GameLogicService) {
    const sub = this.gameLogicService.isClickable
      .subscribe((res: boolean) => {
        this.isClickable = res;
      });
  }

  public set imagePath(imagePath: string) {
    this._imagePath = imagePath;
  }

  public get imagePath() {
    return this._imagePath;
  }
  ngOnInit() {
    console.log(this._imagePath);
  }

  onClick() {

  }
}
