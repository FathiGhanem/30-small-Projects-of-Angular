import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { CommonModule } from '@angular/common';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-minesweeper',
  imports: [TimerComponent, CommonModule, CellComponent],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.scss',
})
export class MinesweeperComponent implements OnInit {
  constructor(public gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.initializeGame();
  }
  onCellClick(event: any) {
    const { row, col } = event;
    this.gameService.revealCell(row, col);
  }

  onCellFlagged(event: any) {
    const { row, col } = event;
    this.gameService.toggleFlag(row, col);
  }
}
