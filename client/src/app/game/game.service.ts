import { GameFieldComponent } from './game-field/game-field.component';
import { Player } from './player.model';
import { Injectable, OnDestroy, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FileDetector } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class GameService implements OnDestroy {
  private readonly url = 'http://localhost:3000/';
  private readonly logoUrl = '../assets/asset-images/logo.webp';
  private activeSubs: Subscription[] = [];

  // tslint:disable: variable-name
  private _newPlayerOnTable = new Subject<{ _id: string, imagePath: string, freeFieldIndex: number}>();
  private _getSolution = new Subject<{}>();

  constructor(private http: HttpClient) { }

  public get getSolution() {
    return this._getSolution.asObservable();
  }

  public showSolution(fields) {
    this._getSolution.next(fields);
  }

  public get newPlayerOnTable() {
    return this._newPlayerOnTable.asObservable();
  }

  public getPlayers() {
    return this.http.get(this.url + 'players');
  }

  public newGame() {
    return this.http.get(this.url + 'games')
      .pipe(tap((res) => {
        this.setUpGame(res);
      }),
      map(res => true));
  }

  public addPlayerToTable(playerId: string, imagePath: string) {
    const freeFieldIndex = this.findFirstFree();

    if (-1 === freeFieldIndex) {
      alert('Remove a player first!');
    } else {
      const currentSolution = JSON.parse(localStorage.getItem('currentSolution'));
      currentSolution[freeFieldIndex] = playerId;
      localStorage.setItem('currentSolution', JSON.stringify(currentSolution));

      this._newPlayerOnTable.next({_id: playerId, imagePath , freeFieldIndex});
    }
  }

  public removeLastPlayerFromTable() {
    const nonFreeFieldIndex = this.findLastFree();

    if (-1 === nonFreeFieldIndex) {
      alert(`You don't have any players!`);
    } else {
      const currentSolution = JSON.parse(localStorage.getItem('currentSolution'));
      currentSolution[nonFreeFieldIndex] = '_id';
      localStorage.setItem('currentSolution', JSON.stringify(currentSolution));

      this._newPlayerOnTable.next({_id: 'none', imagePath: this.logoUrl , freeFieldIndex: nonFreeFieldIndex});
    }
  }

  public trySolution() {
    const freeFieldIndex = this.findFirstFree();

    if (-1 !== freeFieldIndex) {
      alert('Please add a player');
    } else {
    }
  }

  public setUpGame(game?) {
    // Created new game
    if (game) {
      // Just for now to check if game is correct
      this.showSolution(game.tries[0].fields);

      // If we have something left in the localStorage
      const gameId = JSON.parse(localStorage.getItem('gameId'));
      if (gameId) {
        this.removeGame(gameId);
      }

      const currentSolution = Array(4).fill('_id');
      localStorage.setItem('gameId', JSON.stringify(game._id));
      localStorage.setItem('currentTry', JSON.stringify(game.currentTry));
      localStorage.setItem('currentSolution', JSON.stringify(currentSolution));
    // First time creating a game component
    } else {
      // Maybe we have a game left

    }
  }

  public getTries(gameId: string) {
    this.findFirstFree();
    return this.http.get(this.url + `games/${gameId}/tries`);
  }

  public removeGame(gameId: string) {
    // Call the server..
    const sub = this.getTries(gameId)
      .subscribe((res: any) => {
        if (res.tries.length > 1) {
          res.tries.forEach(el => {
            console.log(el);
          });
        }

      });

    this.activeSubs.push(sub);
  }

  findFirstFree() {
    const currentSolution = JSON.parse(localStorage.getItem('currentSolution'));

    return currentSolution.findIndex(sol => sol === '_id');
  }

  findLastFree() {
    const currentSolution = JSON.parse(localStorage.getItem('currentSolution'));

    return currentSolution.map((sol) => sol === '_id').lastIndexOf(false);
  }

  ngOnDestroy(): void {
    this.activeSubs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
