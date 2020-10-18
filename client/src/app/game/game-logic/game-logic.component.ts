import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-logic',
  templateUrl: './game-logic.component.html',
  styleUrls: ['./game-logic.component.css']
})
export class GameLogicComponent implements OnInit {
  public buttonVisibility: 'visible' | 'hidden' = 'hidden';

  constructor() { }

  ngOnInit(): void {
  }

  newGame() {
    console.log('New game started');

    this.buttonVisibility = 'visible';
  }
}
