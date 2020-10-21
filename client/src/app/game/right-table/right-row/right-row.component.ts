import { GameLogicService } from './../../game-logic/game-logic.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Player } from '../../player.model';

@Component({
  selector: 'app-right-row',
  templateUrl: './right-row.component.html',
  styleUrls: ['./right-row.component.css']
})
export class RightRowComponent implements OnInit {
  @Input() id: number;

  constructor(private gameLogicService: GameLogicService) { }

  ngOnInit(): void {
    /*const sub = this.gameLogicService.getResult
      .subscribe((res: any) => {
        const currentTry = JSON.parse(localStorage.getItem('currentTry'));

        if (currentTry === this.id) {
          res.forEach((imagePath, i) => {
            this.changeSubjects[i].next(imagePath);
          });
        }
      });*/
  }

}
