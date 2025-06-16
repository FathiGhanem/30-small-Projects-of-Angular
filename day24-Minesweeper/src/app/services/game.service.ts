import { TimerService } from './timer.service';
import { Injectable } from '@angular/core';
import { Cell } from '../models/cell.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gridSize = 10;
  mineCount = 10;
  grid: Cell[][] = [];
  gameOver = false;
  gameWon = false;

  constructor(private timerService: TimerService) {}

  winGame() {
    this.gameOver = true;
    this.gameWon = true;
    this.timerService.stop();
  }

  loseGame() {
    this.gameOver = true;
    this.timerService.stop();
  }
  private createEmptyGrid(): Cell[][] {
    return Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      }))
    );
  }

  private isMinePlaced(row: number, col: number) {
    return this.grid[row][col].isMine;
  }
  private generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
  private placeMines() {
    let placedMines = 0;
    while (placedMines < this.mineCount) {
      const row = this.generateRandomNumber(0, this.gridSize);
      const col = this.generateRandomNumber(0, this.gridSize);
      if (this.isMinePlaced(row, col)) continue;
      this.grid[row][col].isMine = true;
      placedMines++;
    }
  }

  private isValidCell(row: number, col: number): boolean {
    if (row < 0) return false;
    if (row >= this.gridSize) return false;
    if (col < 0) return false;
    if (col >= this.gridSize) return false;
    return true;
  }

  private getAdjacentCells(row: number, col: number): Cell[] {
    const ad: Cell[] = [];
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++)
      for (let colOffset = -1; colOffset <= 1; colOffset++) {
        const adRow = row + rowOffset;
        const adCol = col + colOffset;
        if (rowOffset === 0 && colOffset === 0) continue;
        if (this.isValidCell(adRow, adCol)) {
          ad.push(this.grid[adRow][adCol]);
        }
      }
    return ad;
  }

  private setCountAdjacentMines(row: number, col: number): number {
    const adCells = this.getAdjacentCells(row, col);
    return adCells.filter((cell) => cell.isMine).length;
  }

  private calculateAdjacentMines() {
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        if (this.isMinePlaced(row, col)) continue;
        this.grid[row][col].adjacentMines = this.setCountAdjacentMines(
          row,
          col
        );
      }
    }
  }

  private getGameStatus() {
    let revealedCell = 0;
    let hiddenNonMineCells = 0;
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        const cell = this.grid[row][col];
        if (cell.isRevealed) revealedCell++;
        if (!cell.isRevealed && !cell.isMine) hiddenNonMineCells++;
      }
    }
    return { revealedCell, hiddenNonMineCells };
  }

  private checkWinCondition() {
    const { hiddenNonMineCells } = this.getGameStatus();
    if (hiddenNonMineCells === 0) this.winGame();
  }

  private canReveal(row: number, col: number): boolean {
    if (this.gameOver) return false;
    if (this.grid[row][col].isRevealed) return false;
    if (this.grid[row][col].isFlagged) return false;
    return true;
  }

  revealCell(row: number, col: number) {
    if (!this.canReveal(row, col)) return;
    this.grid[row][col].isRevealed = true;
    if (this.isMinePlaced(row, col)) {
      this.loseGame();
      return;
    }
    if (this.grid[row][col].adjacentMines === 0) {
      this.revealAdjacentCells(row, col);
    }
    this.checkWinCondition();
  }

  private revealAdjacentCells(row: number, col: number) {
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let colOffset = -1; colOffset <= 1; colOffset++) {
        const adRow = row + rowOffset;
        const adCol = col + colOffset;
        if (rowOffset === 0 && colOffset === 0) continue;
        if (!this.isValidCell(adRow, adCol)) continue;

        const cell = this.grid[adRow][adCol];
        if (cell.isRevealed || cell.isMine || cell.isFlagged) continue;

        cell.isRevealed = true;

        if (cell.adjacentMines === 0) {
          this.revealAdjacentCells(adRow, adCol); // ← recursion
        }
      }
    }
  }
  toggleFlag(row: number, col: number) {
    if (this.gameOver) return;
    if (this.grid[row][col].isRevealed) return;
    this.grid[row][col].isFlagged = !this.grid[row][col].isFlagged;
  }
  initializeGame() {
    this.grid = this.createEmptyGrid();
    this.placeMines();
    this.calculateAdjacentMines();
    this.timerService.start();
  }
}
