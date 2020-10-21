import { Player } from './player.model';

export interface Game {
  _id: string;
  currentTry: number;
    tries: [{
        tryIndex: number;
        fields: Player[];
    }];
}
