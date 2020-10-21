import { GameLogicService } from './../game-logic/game-logic.service';
import { Player } from './../player.model';
import { GameService } from './../game.service';
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

  constructor(private gameService: GameService,
              private gameLogicService: GameLogicService) {
    this.solutionReadySub = this.gameLogicService.getSolution
      .subscribe((res: Player) => {
        console.log(res);
        this.fields = res;
      });
   }

  ngOnInit(): void {
  }

}
