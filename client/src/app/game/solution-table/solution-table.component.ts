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

  constructor(private gameService: GameService) {
    this.solutionReadySub = this.gameService.getSolution
      .subscribe((res) => {
        console.log(res);
        this.fields = res;
      });
   }

  ngOnInit(): void {
  }

}
