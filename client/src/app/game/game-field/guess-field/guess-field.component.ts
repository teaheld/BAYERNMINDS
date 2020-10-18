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
  private eventSub: Subscription;

  constructor() {
    super();
   }

   ngOnInit(): void {
     this.eventSub = this.event
      .subscribe((res: Player) => {
        this.imagePath = res.imagePath;
      });
   }
  onClick() {
    console.log('Hello from GuessField');
  }

}
