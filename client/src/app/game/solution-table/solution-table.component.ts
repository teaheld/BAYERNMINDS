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

  constructor(private gameLogicService: GameLogicService,
              private formBuilder: FormBuilder) {
    this.solutionReadySub = this.gameLogicService.getSolution
      .subscribe((res: Player[]) => {
        this.fields = res;
        console.log(this.fields);
      });

    this.form = formBuilder.group({
      name: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

}
