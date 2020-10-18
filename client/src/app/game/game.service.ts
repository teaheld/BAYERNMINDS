import { Player } from './player.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private http: HttpClient) { }

  public getPlayers() {
    return this.http.get('http://localhost:3000/players');
  }
}
