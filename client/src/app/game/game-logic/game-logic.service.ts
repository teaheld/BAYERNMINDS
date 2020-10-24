import { Game } from './../game.model';
import { Subject, Subscription } from 'rxjs';
import { GameServerService } from './../game-server.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Player } from '../player.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService implements OnDestroy{
  private readonly logoUrl = '../assets/asset-images/logo.webp';
  // tslint:disable: variable-name
  private _isClickable = new Subject<{ clickable: boolean, index?: number}>();
  private _gameOn = new Subject<boolean>();
  private _getSolution = new Subject<{}>();
  private _playerChanged = new Subject<{imagePath: string, index: number}>();
  private _getResult = new Subject<{imagePath: string, index: number}>();
  private players: Player[];
  private activeSubs: Subscription[] = [];

  constructor(private gameServerService: GameServerService) { }

  public getPlayers() {
    return this.gameServerService.getPlayers()
      .pipe(tap((res: Player[]) => {
        this.players = res;
        console.log(this.players);
      }));
  }

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

  public get gameOn() {
    return this._gameOn.asObservable();
  }

  public setClickable(clickable: boolean, index?: number) {
    this._isClickable.next({clickable, index});
  }

  public setSolution(fields) {
    this._getSolution.next(fields);
  }

  public setPlayerChanged(imagePath: string, index: number) {
    this._playerChanged.next({imagePath, index});
  }

  public setResult(imagePath: string, index: number) {
    this._getResult.next({imagePath, index});
  }

  public setGameOn(visible: boolean) {
    this._gameOn.next(visible);
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
    const gameId = JSON.parse(localStorage.getItem('gameId'));
    if (gameId) {
      this.removeGame();
    }

    const sub = this.gameServerService.newGame()
      .subscribe((game: Game) => {
        const currentSolution = Array(4).fill('_id');
        localStorage.setItem('gameId', JSON.stringify(game._id));
        localStorage.setItem('currentTry', JSON.stringify(game.currentTry));
        localStorage.setItem('currentSolution', JSON.stringify(currentSolution));

        this.setGameOn(true);
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

      const currentTry = JSON.parse(localStorage.getItem('currentTry'));
      this._playerChanged.next({imagePath , index: currentTry * 4 + freeFieldIndex});
    }
  }

  public removePlayerFromTable(index: number) {
    const currentSolution = JSON.parse(localStorage.getItem('currentSolution'));
    const currentTry = JSON.parse(localStorage.getItem('currentTry'));
    currentSolution[Math.floor(index % 4)] = '_id';
    localStorage.setItem('currentSolution', JSON.stringify(currentSolution));
  }

  public removeLastPlayerFromTable() {
    const nonFreeFieldIndex = this.findLastFree();

    if (-1 === nonFreeFieldIndex) {
      alert(`You don't have any players!`);
    } else {
      this.removePlayerFromTable(nonFreeFieldIndex);

      const currentTry = JSON.parse(localStorage.getItem('currentTry'));
      this._playerChanged.next({imagePath: this.logoUrl , index: currentTry * 4 + nonFreeFieldIndex});
    }
  }

  public setGuessed(guessed, currentTry) {
    const fields = [{imagePath: ''}, {imagePath: ''}, {imagePath: ''}, {imagePath: ''}];

    fields.forEach((el, i) => {
      if (i < guessed.completelyGuessed) {
        el.imagePath = '../assets/asset-images/total_guess.png';
      } else if (i < guessed.completelyGuessed + guessed.partialyGuessed) {
        el.imagePath = '../assets/asset-images/part_guess.png';
      }

      this.setResult(el.imagePath, currentTry * 4 + i);
    });
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
          const currentTry = JSON.parse(localStorage.getItem('currentTry'));

          this.setGuessed(res, currentTry);
          this.initializeNextTry(res);
        });

      this.activeSubs.push(sub);
    }
  }

  initializeNextTry(guessed) {
    // Disable clicking of previous row
    const currentTry = JSON.parse(localStorage.getItem('currentTry')) + 1;
    const fields = Array.from(Array(4), (el, i) => (currentTry - 1) * 4 + i );
    fields.forEach((el) => {
      this.setClickable(false, el);
    });

    if (guessed.completelyGuessed === 4) {
      this.finishGame('Congratulations! You won!!!');
    } else {
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
    const gameId = JSON.parse(localStorage.getItem('gameId'));
    const sub = this.gameServerService.getSolution(gameId)
      .subscribe((res) => {
        this.setSolution(res);
      });

    this.activeSubs.push(sub);

    this.setGameOn(false);

    setTimeout(() => alert(message), 500);
  }

  removeGame() {
    // TODO: Remove data from server too
    const currentTry = JSON.parse(localStorage.getItem('currentTry'));
    const fields = Array.from(Array(currentTry * 4 + 4), (el, i) => i );
    fields.forEach((el) => {
      this._playerChanged.next({imagePath: this.logoUrl , index: el});
      this.setResult(this.logoUrl, el);
    });

    this.setSolution(Array(4).fill({imagePath: this.logoUrl}));
  }

  getTries(gameId: string) {
    const sub = this.gameServerService.getTries(gameId)
    .subscribe((res: {tries: {tryIndex: number, fields: Player[], completelyGuessed: number, partialyGuessed: number}[]}) => {
      const tries = res.tries;
      const currentTry = JSON.parse(localStorage.getItem('currentTry'));
      this.setGameOn(true);
      this.setClickable(true);
      const fl = Array.from(Array(currentTry * 4), (el, i) => i );
      fl.forEach((el) => {
        this.setClickable(false, el);
      });

      tries.forEach((el) => {
        if (el.tryIndex !== 6) {
          el.fields.forEach((field, i) => {
            this._playerChanged.next({imagePath: field.imagePath, index: el.tryIndex * 4 + i});
          });

          this.setGuessed({completelyGuessed: el.completelyGuessed, partialyGuessed: el.partialyGuessed}, el.tryIndex);
        }
      });

      if (tries.length - 1 === currentTry) {
        const currentSolution = JSON.parse(localStorage.getItem('currentSolution'));

        currentSolution.forEach((el, i) => {
          if (el !== '_id') {
            this.setPlayerChanged(this.players.find(elem => elem._id === el).imagePath, currentTry * 4 + i);
          }
        });
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
