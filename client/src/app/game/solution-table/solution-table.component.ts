import { GameLogicService } from './../game-logic/game-logic.service';
import { Player } from './../player.model';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solution-table',
  templateUrl: './solution-table.component.html',
  styleUrls: ['./solution-table.component.css']
})
export class SolutionTableComponent implements OnInit {
  private solutionReadySub: Subscription;
  public fields;

  constructor(private gameLogicService: GameLogicService) {
    this.solutionReadySub = this.gameLogicService.getSolution
      .subscribe((res: Player) => {
        this.fields = res;
      });
   }

  ngOnInit(): void {
  }

}
