import { GameServerService } from './../game-server.service';
import { GameLogicService } from './../game-logic/game-logic.service';
import { Player } from './../player.model';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-solution-table',
  templateUrl: './solution-table.component.html',
  styleUrls: ['./solution-table.component.css']
})
export class SolutionTableComponent implements OnInit {
  private solutionReadySub: Subscription;
  public readonly logoUrl = '../assets/asset-images/logo.webp';
  public fields = Array(4).fill({imagePath: this.logoUrl});
  public form: FormGroup;
  public score: number;

  constructor(private gameLogicService: GameLogicService,
              private formBuilder: FormBuilder,
              private gameServerService: GameServerService) {

    this.solutionReadySub = this.gameLogicService.getSolution
      .subscribe((res: { solution: Player[], score: number }) => {
        this.fields = res.solution;
        this.score = res.score;
      });

    this.form = formBuilder.group({
      name: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  postScore() {
    if (!this.name.valid || this.name.value.trim().length === 0) {
      alert('Insert a name please');
    } else {
      const body = {
        name: this.name.value,
        score: this.score
      };

      const sub = this.gameServerService.addScore(body)
        .subscribe((res) => {
          this.score = undefined;
        });
    }
  }

  get name() {
    return this.form.get('name');
  }
}
