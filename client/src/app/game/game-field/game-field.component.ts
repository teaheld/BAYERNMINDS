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
  // protected isClickable = false;
  // tslint:disable: variable-name
  @Input() private _imagePath = this.logoUrl;
  private _visible: 'visible' | 'hidden' = 'visible';
  //private activeSubs: Subscription[];

  constructor(protected gameLogicService: GameLogicService) {
    /*const sub = this.gameLogicService.isClickable
      .subscribe((res: boolean) => {
        this.isClickable = res;
      });*/
  }

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
    console.log(this._imagePath);
  }

  onClick() {

  }

  ngOnDestroy(): void {
    /*this.activeSubs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });*/
  }
}
