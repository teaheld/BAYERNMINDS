import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { LeftTableComponent } from './game/left-table/left-table.component';
import { GameFieldComponent } from './game/game-field/game-field.component';
import { GameRowComponent } from './game/game-row/game-row.component';
import { ChoosePlayersTableComponent } from './game/choose-players-table/choose-players-table.component';
import { SolutionTableComponent } from './game/solution-table/solution-table.component';
import { GuessFieldComponent } from './game/game-field/guess-field/guess-field.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LeftTableComponent,
    GameFieldComponent,
    GameRowComponent,
    ChoosePlayersTableComponent,
    SolutionTableComponent,
    GuessFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
