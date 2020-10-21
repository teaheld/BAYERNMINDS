import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameServerService {
  private readonly url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  public getPlayers() {
    return this.http.get(this.url + 'players');
  }

  public newGame() {
    return this.http.get(this.url + 'games');
  }

  public getTries(gameId: string) {
    return this.http.get(this.url + `games/${gameId}/tries`);
  }

  public trySolution(gameId: string, body) {
    return this.http.post(this.url + `games/${gameId}/tries`, body);
  }

  public getSolution(gameId: string) {
    return this.http.get(this.url + `games/${gameId}/solution`);
  }
}
