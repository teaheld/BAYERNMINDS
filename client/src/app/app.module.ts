import { GameFieldComponent } from './game/game-field/game-field.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { LeftTableComponent } from './game/left-table/left-table.component';
import { ChoosePlayersTableComponent } from './game/choose-players-table/choose-players-table.component';
import { SolutionTableComponent } from './game/solution-table/solution-table.component';
import { GuessFieldComponent } from './game/game-field/guess-field/guess-field.component';
import { PlayerFieldComponent } from './game/game-field/player-field/player-field.component';
import { GuessedFieldComponent } from './game/game-field/guessed-field/guessed-field.component';
import { RightTableComponent } from './game/right-table/right-table.component';
import { LeftRowComponent } from './game/left-table/left-row/left-row.component';
import { RightRowComponent } from './game/right-table/right-row/right-row.component';
import { SolutionFieldComponent } from './game/game-field/solution-field/solution-field.component';
import { GameLogicComponent } from './game/game-logic/game-logic.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LeftTableComponent,
    ChoosePlayersTableComponent,
    SolutionTableComponent,
    GuessFieldComponent,
    PlayerFieldComponent,
    GuessedFieldComponent,
    RightTableComponent,
    LeftRowComponent,
    RightRowComponent,
    SolutionFieldComponent,
    GameFieldComponent,
    GameLogicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
