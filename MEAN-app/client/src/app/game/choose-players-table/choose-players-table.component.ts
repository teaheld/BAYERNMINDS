import { Player } from './../player.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-players-table',
  templateUrl: './choose-players-table.component.html',
  styleUrls: ['./choose-players-table.component.css']
})
export class ChoosePlayersTableComponent implements OnInit {
  @Input() players: Player[];

  constructor() { }

  ngOnInit(): void {
  }

}
