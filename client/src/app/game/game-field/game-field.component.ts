import { Component, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.css'],
  providers: [ { provide: Boolean, useValue: false }]
})
export class GameFieldComponent implements OnInit {
  _canRemove: boolean;

  public constructor(@Inject(Boolean) private canRemove: boolean) {
    this._canRemove = canRemove;
    console.log(canRemove);
  }

  @Input() _imagePath = '../assets/asset-images/logo.webp';

  public set imagePath(imagePath: string) {
    this._imagePath = imagePath;
  }

  public get imagePath() {
    return this._imagePath;
  }
  ngOnInit() {
    console.log(this._imagePath);
  }


}
