import { GameService } from './../../game.service';
import { Component, Input, OnInit } from '@angular/core';
import { GameFieldComponent } from '../game-field.component';

@Component({
  selector: 'app-player-field',
  templateUrl: '../game-field.component.html',
  styleUrls: ['../game-field.component.css']
})
export class PlayerFieldComponent extends GameFieldComponent implements OnInit {
  // tslint:disable: variable-name
  @Input() private _id: string;

  constructor(private gameService: GameService) {
    super();
  }

  ngOnInit(): void {
  }

  onClick() {
    console.log(this._id);
    this.gameService.addPlayerToTable(this._id, this.imagePath);
  }

}
