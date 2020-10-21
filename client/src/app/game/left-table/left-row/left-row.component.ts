import { GameLogicService } from './../../game-logic/game-logic.service';
import { Player } from './../../player.model';
import { Subject, Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-row',
  templateUrl: './left-row.component.html',
  styleUrls: ['./left-row.component.css']
})
export class LeftRowComponent implements OnInit, OnDestroy {
  @Input() id: number;
  private activeSubs: Subscription[] = [];


  constructor(private gameLogicService: GameLogicService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.activeSubs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
