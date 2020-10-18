import { GameFieldComponent } from './../game-field.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solution-field',
  templateUrl: '../game-field.component.html',
  styleUrls: ['../game-field.component.css']
})
export class SolutionFieldComponent extends GameFieldComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  onClick() {
    console.log('Hey no touching!');
  }
}
