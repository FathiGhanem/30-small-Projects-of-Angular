import { Injectable } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  board: string[][] = [];
  currentPlayer: string = 'red';
  selectedPiece: { row: number; col: number } | null = null;
  gameOver: boolean = false;

  constructor() {
    this.initializeBoard();
  }

  initializeBoard(): void {
    this.board = Array.from({ length: 8 }, (_, row) =>
      Array.from({ length: 8 }, (_, col) => {
        if (row < 3 && (row + col) % 2 === 1) return 'black';
        if (row > 4 && (row + col) % 2 === 1) return 'red';
        return '';
      })
    );
    this.currentPlayer = 'red';
    this.selectedPiece = null;
    this.gameOver = false;
  }
  selectPiece(row: number, col: number): boolean {
    if (this.board[row][col].startsWith(this.currentPlayer)) {
      this.selectedPiece = { row, col };
      return true;
    }
    return false;
  }

  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
  }
  private countPieces(color: string): number {
    return this.board.flat().filter((piece) => piece.startsWith(color)).length;
  }
  private checkGameOver(): void {
    const redPieces = this.countPieces('red');
    const blackPieces = this.countPieces('black');
    if (redPieces === 0) {
      console.log('Game Over! Black wins!');
      this.gameOver = true;
    } else if (blackPieces === 0) {
      console.log('Game Over! red wins!');
      this.gameOver = true;
    }
  }
  private isValidMove(targetRow: number, targetCol: number): boolean {
    const { row, col } = this.selectedPiece!;
    const piece = this.board[row][col];
    const dx = targetCol - col;
    const dy = targetRow - row;

    if (this.board[targetRow][targetCol] !== '') return false;
    const isKing = piece.includes('king');
    const forwardMove =
      (this.currentPlayer === 'red' && dy === -1) ||
      (this.currentPlayer === 'black' && dy === 1);

    if (Math.abs(dx) === 1 && Math.abs(dy) === 1) {
      return isKing || forwardMove;
    }
    if (Math.abs(dx) === 2 && Math.abs(dy) === 2) {
      const jumpedRow = (row + targetRow) / 2;
      const jumpedCol = (col + targetCol) / 2;
      return (
        this.board[jumpedRow][jumpedCol] !== '' &&
        !this.board[jumpedRow][jumpedCol].startsWith(this.currentPlayer)
      );
    }
    return false;
  }

  movePiece(targetRow: number, targetCol: number): boolean {
    if (!this.isValidMove(targetRow, targetCol)) {
      this.selectedPiece = null;
      return false;
    }
    const { row, col } = this.selectedPiece!;
    const piece = this.board[row][col];
    this.board[targetRow][targetCol] = piece;
    this.board[row][col] = '';
    if (Math.abs(targetRow - row) === 2) {
      const jumpedRow = (row + targetRow) / 2;
      const jumpedCol = (col + targetCol) / 2;
      this.board[jumpedRow][jumpedCol] = '';
    }

    if (
      (this.currentPlayer === 'red' && targetRow === 0) ||
      (this.currentPlayer === 'black' && targetRow === 7)
    ) {
      this.board[targetRow][targetCol] = `${this.currentPlayer}.king`;
    }

    this.selectedPiece = null;
    this.switchPlayer();
    this.checkGameOver();
    return true;
  }
}
