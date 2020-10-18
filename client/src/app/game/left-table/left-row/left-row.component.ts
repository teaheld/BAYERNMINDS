import { Player } from './../../player.model';
import { GameService } from './../../game.service';
import { Subject, Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-row',
  templateUrl: './left-row.component.html',
  styleUrls: ['./left-row.component.css']
})
export class LeftRowComponent implements OnInit, OnDestroy {
  @Input() id: number;
  public changeSubjects: Subject<Player>[] = [
    new Subject<Player>(),
    new Subject<Player>(),
    new Subject<Player>(),
    new Subject<Player>() ];
  private activeSubs: Subscription[] = [];


  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    const sub = this.gameService.newPlayerOnTable
      .subscribe((res: {_id: string, imagePath: string, freeFieldIndex: number}) => {
        const currentTry = JSON.parse(localStorage.getItem('currentTry'));
        if (currentTry === this.id) {
          this.changeSubjects[res.freeFieldIndex].next({_id: res._id, imagePath: res.imagePath});
        }
      });

    this.activeSubs.push(sub);
  }

  ngOnDestroy(): void {
    this.activeSubs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
