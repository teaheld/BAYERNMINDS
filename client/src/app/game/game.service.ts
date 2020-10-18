import { Player } from './player.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly url = 'http://localhost:3000/';
  private solution = ['0', '0', '0', '0'];

  // tslint:disable: variable-name
  private _newPlayerOnTable = new Subject<{ _id: string, imagePath: string, freeFieldIndex: number}>();

  constructor(private http: HttpClient) { }

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
    const freeFieldIndex = this.solution.findIndex((field) => field === '0');
    if (-1 === freeFieldIndex) {
      alert('Remove a player first!');
    } else {
      this.solution[freeFieldIndex] = imagePath;
      this._newPlayerOnTable.next({_id: playerId, imagePath , freeFieldIndex});
    }
  }
}
