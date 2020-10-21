import { GameLogicService } from './../../game-logic/game-logic.service';
import { Component, Input, OnInit } from '@angular/core';
import { GameFieldComponent } from '../game-field.component';
import { Observable, Subscription } from 'rxjs';
import { Player } from '../../player.model';

@Component({
  selector: 'app-guessed-field',
  templateUrl: '../game-field.component.html',
  styleUrls: ['../game-field.component.css']
})
export class GuessedFieldComponent extends GameFieldComponent implements OnInit {
  @Input() index: number;
  private activeSubs: Subscription[] = [];

  constructor(protected gameLogicService: GameLogicService) {
    super(gameLogicService);
  }

  ngOnInit(): void {
    const sub = this.gameLogicService.getResult
      .subscribe((res: {imagePath: string, index: number}) => {
        if (res.index === this.index) {
          if (res.imagePath !== '') {
            this.imagePath = res.imagePath;
            this.visible = 'visible';
          } else {
            this.visible = 'hidden';
          }
        }
      });

    this.activeSubs.push(sub);
  }

  onClick() {
    console.log('Heey! Dont touch!');
  }
}
