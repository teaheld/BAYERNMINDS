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
  @Input() event: Observable<Player>;
  @Input() index: number;
  private eventSub: Subscription;

  constructor(protected gameLogicService: GameLogicService) {
    super(gameLogicService);
  }

  ngOnInit(): void {
    this.eventSub = this.event
      .subscribe((res: Player) => {
        if (res.imagePath === '') {
          this.visible = 'hidden';
        } else {
        this.imagePath = res.imagePath;
        }
      });
  }

  onClick() {
    console.log('Heey! Dont touch!');
  }
}
