import { Player } from './player.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly url = 'http://localhost:3000/';
  private readonly logoUrl = '../assets/asset-images/logo.webp';
  // tslint:disable-next-line: variable-name
  private _solution = ['0', '0', '0', '0'];

  // tslint:disable: variable-name
  private _newPlayerOnTable = new Subject<{ _id: string, imagePath: string, freeFieldIndex: number}>();
  private _getSolution = new Subject<{}>();

  constructor(private http: HttpClient) { }

  public get getSolution() {
    return this._getSolution.asObservable();
  }

  public showSolution(field0, field1, field2, field3) {
    this._getSolution.next({ field0, field1, field2, field3 });
  }

  public get newPlayerOnTable() {
    return this._newPlayerOnTable.asObservable();
  }

  public getPlayers() {
    return this.http.get(this.url + 'players');
  }

  public newGame() {
    return this.http.get(this.url + 'games');
  }

  public addPlayerToTable(playerId: string, imagePath: string) {
    const freeFieldIndex = this._solution.findIndex((field) => field === '0');

    if (-1 === freeFieldIndex) {
      alert('Remove a player first!');
    } else {
      this._solution[freeFieldIndex] = playerId;
      this._newPlayerOnTable.next({_id: playerId, imagePath , freeFieldIndex});
    }
  }

  public removeLastPlayerFromTable() {
    const nonFreeFieldIndex = this._solution.map((sol) => sol === '0').lastIndexOf(false);

    if (-1 === nonFreeFieldIndex) {
      alert(`You don't have any players!`);
    } else {
      this._solution[nonFreeFieldIndex] = '0';
      this._newPlayerOnTable.next({_id: 'none', imagePath: this.logoUrl , freeFieldIndex: nonFreeFieldIndex});
    }
  }

  public trySolution() {
    const freeFieldIndex = this._solution.findIndex((field) => field === '0');

    if (-1 !== freeFieldIndex) {
      alert('Please add a player');
    } else {
      console.log(this._solution);
    }
  }
}
