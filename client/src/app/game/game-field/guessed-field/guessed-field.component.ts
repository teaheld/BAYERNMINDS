import { Component, OnInit } from '@angular/core';
import { GameFieldComponent } from '../game-field.component';

@Component({
  selector: 'app-guessed-field',
  templateUrl: '../game-field.component.html',
  styleUrls: ['../game-field.component.css']
})
export class GuessedFieldComponent extends GameFieldComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  onClick() {
    console.log('Heey! Dont touch!');
  }
}
