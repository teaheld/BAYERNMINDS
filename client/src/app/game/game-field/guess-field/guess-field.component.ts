import { GameFieldComponent } from './../game-field.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guess-field',
  templateUrl: '../game-field.component.html',
  styleUrls: ['../game-field.component.css']
})
export class GuessFieldComponent extends GameFieldComponent {

  constructor() {
    super();
   }

  onClick() {
    console.log('Hello from GuessField');
  }

}
