import { GameService } from './../../game.service';
import { GameFieldComponent } from './../game-field.component';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Player } from '../../player.model';

@Component({
  selector: 'app-guess-field',
  templateUrl: '../game-field.component.html',
  styleUrls: ['../game-field.component.css']
})
export class GuessFieldComponent extends GameFieldComponent implements OnInit{
  @Input() event: Observable<Player>;
  @Input() index: number;
  private eventSub: Subscription;

  constructor(private gameService: GameService) {
    super();
   }

   ngOnInit(): void {
     this.eventSub = this.event
      .subscribe((res: Player) => {
        this.imagePath = res.imagePath;
      });
   }

  onClick() {
    this.gameService.removePlayerFromTable(this.index);

    this.imagePath = this.logoUrl;
  }

}
