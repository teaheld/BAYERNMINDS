import { Game } from './../game.model';
import { Subject, Subscription } from 'rxjs';
import { GameServerService } from './../game-server.service';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService implements OnDestroy{
  private readonly logoUrl = '../assets/asset-images/logo.webp';
  // tslint:disable: variable-name
  private _isClickable = new Subject<boolean>();
  private _getSolution = new Subject<{}>();
  private _playerChanged = new Subject<{}>();
  private _getResult = new Subject<{}>();
  private activeSubs: Subscription[] = [];

  constructor(private gameServerService: GameServerService) { }

  public get isClickable() {
    return this._isClickable.asObservable();
  }

  public get getSolution() {
    return this._getSolution.asObservable();
  }

  public get playerChanged() {
    return this._playerChanged.asObservable();
  }

  public get getResult() {
    return this._getResult.asObservable();
  }

  public setClickable(boolean: boolean) {
    this._isClickable.next(boolean);
  }

  public setSolution(fields) {
    this._getSolution.next(fields);
  }

  public setPlayerChanged(boolean: boolean) {
    this._playerChanged.next(boolean);
  }

  public setResult(fields) {
    this._getResult.next(fields);
  }

  findFirstFree() {
    const currentSolution = JSON.parse(localStorage.getItem('currentSolution'));

    return currentSolution.findIndex(sol => sol === '_id');
  }

  findLastFree() {
    const currentSolution = JSON.parse(localStorage.getItem('currentSolution'));

    return currentSolution.map((sol) => sol === '_id').lastIndexOf(false);
  }

  newGame() {
    // TODO: Clear the fields if game in local storage

    const sub = this.gameServerService.newGame()
      .subscribe((game: Game) => {
        this.setSolution(game.tries[0].fields);

        const currentSolution = Array(4).fill('_id');
        localStorage.setItem('gameId', JSON.stringify(game._id));
        localStorage.setItem('currentTry', JSON.stringify(game.currentTry));
        localStorage.setItem('currentSolution', JSON.stringify(currentSolution));

        this.setClickable(true);
      });

    this.activeSubs.push(sub);
  }

  public addPlayerToTable(playerId: string, imagePath: string) {
    const freeFieldIndex = this.findFirstFree();

    if (-1 === freeFieldIndex) {
      alert('Remove a player first!');
    } else {
      const currentSolution = JSON.parse(localStorage.getItem('currentSolution'));
      currentSolution[freeFieldIndex] = playerId;
      localStorage.setItem('currentSolution', JSON.stringify(currentSolution));

      this._playerChanged.next({_id: playerId, imagePath , freeFieldIndex});
    }
  }

  public removePlayerFromTable(index: number) {
    const currentSolution = JSON.parse(localStorage.getItem('currentSolution'));
    currentSolution[index] = '_id';
    localStorage.setItem('currentSolution', JSON.stringify(currentSolution));
  }

  public removeLastPlayerFromTable() {
    const nonFreeFieldIndex = this.findLastFree();

    if (-1 === nonFreeFieldIndex) {
      alert(`You don't have any players!`);
    } else {
      this.removePlayerFromTable(nonFreeFieldIndex);

      this._playerChanged.next({_id: '_id', imagePath: this.logoUrl , freeFieldIndex: nonFreeFieldIndex});
    }
  }

  public setGuessed(guessed) {
    const fields = [{imagePath: ''}, {imagePath: ''}, {imagePath: ''}, {imagePath: ''}];
    console.log(guessed);

    fields.forEach((el, i) => {
      console.log(i, guessed.completelyGuessed, guessed.partialyGuessed);
      if (i < guessed.completelyGuessed) {
        el.imagePath = '../assets/asset-images/total_guess.png';
        console.log(fields);
      } else if (i < guessed.completelyGuessed + guessed.partialyGuessed) {
        el.imagePath = '../assets/asset-images/part_guess.png';
      }
    });

    this._getResult.next(fields);
  }

  public trySolution() {
    const freeFieldIndex = this.findFirstFree();

    if (-1 !== freeFieldIndex) {
      alert('Please add a player');
    } else {
      const gameId = JSON.parse(localStorage.getItem('gameId'));
      const body = {
         currentSolution: JSON.parse(localStorage.getItem('currentSolution'))
      };

      const sub = this.gameServerService.trySolution(gameId, body)
        .subscribe((res: {completelyGuessed: number, partialyGuessed: number}) => {
          this.setGuessed(res);
          this.initializeNextTry(res);
        });

      this.activeSubs.push(sub);
    }
  }

  initializeNextTry(guessed) {
    if (guessed.completelyGuessed === 4) {
      this.finishGame('Congratulations! You won!!!');
    } else {
      const currentTry = JSON.parse(localStorage.getItem('currentTry')) + 1;

      if (currentTry === 6) {
        this.finishGame('Try again!!!');
      } else {
        const currentSolution = Array(4).fill('_id');
        localStorage.setItem('currentTry', JSON.stringify(currentTry));
        localStorage.setItem('currentSolution', JSON.stringify(currentSolution));
      }
    }
  }

  finishGame(message: string) {
    this._isClickable.next(false);

    setTimeout(() => alert(message), 500);
  }

  ngOnDestroy(): void {
    this.activeSubs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
