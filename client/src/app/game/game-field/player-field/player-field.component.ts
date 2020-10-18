import { Component, OnInit } from '@angular/core';
import { GameFieldComponent } from '../game-field.component';

@Component({
  selector: 'app-player-field',
  templateUrl: '../game-field.component.html',
  styleUrls: ['../game-field.component.css']
})
export class PlayerFieldComponent extends GameFieldComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  onClick() {
    console.log('Hello from Playerfield');
  }

}
