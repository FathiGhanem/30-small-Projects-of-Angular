import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
 arr : string[]= new Array(9).fill('');
 playerOne : number []=[]; 
 playerTwo : number []=[]; 
 turn:boolean=true;
 gameOver:boolean=false;
 winningPattern: number[] = [];

 winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6] ];


  gameStatus:string='';

play(index: number): void {

  if (this.arr[index] !== '') return;

  if (this.turn) {
    this.arr[index] = 'X';
    this.playerOne.push(index);
    if (this.checkWin(this.playerOne)) {
      this.gameStatus='Player One (X) wins!';
      this.endGame();
      return;
    }
  } else {
    this.arr[index] = 'O';
    this.playerTwo.push(index);
    if (this.checkWin(this.playerTwo)) {
      this.gameStatus='Player Two (O) wins!';
     this.endGame();
      return;
    }
  }

  this.turn = !this.turn;


  if (this.arr.every(cell => cell !== '')) {
    this.gameStatus='It\'s a draw!';
    this.endGame();
   
  }
}


checkWin(playerMoves: number[]): boolean {
  const foundPattern = this.winPatterns.find(pattern =>
    pattern.every(index => playerMoves.includes(index))
  );

  if (foundPattern) {
    this.winningPattern = foundPattern;
    return true;
  }

  return false;
}

  endGame(){
    this.gameOver=true;
  }

  restartGame(){
    this.arr.fill('');
    this.playerOne=[];
    this.playerTwo=[];
    this.turn=true;
    this.gameStatus='';
    this.gameOver=false;
    this.winningPattern = [];
  }
}
