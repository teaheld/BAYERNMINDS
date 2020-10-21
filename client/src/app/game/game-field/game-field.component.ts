import { GameLogicService } from './../game-logic/game-logic.service';
import { Subscription } from 'rxjs';
import { Component, Inject, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.css']
})
export class GameFieldComponent implements OnInit, OnDestroy {
  protected readonly logoUrl = '../assets/asset-images/logo.webp';
  // tslint:disable: variable-name
  @Input() private _imagePath = this.logoUrl;
  private _visible: 'visible' | 'hidden' = 'visible';

  constructor(protected gameLogicService: GameLogicService) { }

  public set imagePath(imagePath: string) {
    this._imagePath = imagePath;
  }

  public get imagePath() {
    return this._imagePath;
  }

  public get visible() {
    return this._visible;
  }

  public set visible(visibility) {
    this._visible = visibility;
  }

  ngOnInit() {
  }

  onClick() {

  }

  ngOnDestroy(): void {

  }
}
