import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guess-the-number',
  imports: [CommonModule, FormsModule],
  templateUrl: './guess-the-number.component.html',
  styleUrls: ['./guess-the-number.component.scss']
})
export class GuessTheNumberComponent {
  
  private static readonly MAX_NUMBER = 100;
  private static readonly MAX_ATTEMPTS = 10;

  
  secretNumber: number = this.genRandomNumber();
  attemptsLeft: number = GuessTheNumberComponent.MAX_ATTEMPTS;
  guessedNumber?: number;
  feedbackMessage: string = '';
  gameOver: boolean = false;

  private genRandomNumber(): number {
    return Math.floor(Math.random() * GuessTheNumberComponent.MAX_NUMBER) + 1;
  }

  public isValid(guess?: number): boolean {
    return guess !== undefined && guess >= 1 && guess <= GuessTheNumberComponent.MAX_NUMBER;
  }

  submit(): void {
    if (!this.isValid(this.guessedNumber)) {
      this.feedbackMessage = `Enter a number between 1 and ${GuessTheNumberComponent.MAX_NUMBER}`;
      return;
    }

    this.attemptsLeft--;
    this.evaluateGuess();
  }

  private evaluateGuess(): void {
    if (this.guessedNumber === this.secretNumber) {
      this.endGame(true);
    } else if (this.attemptsLeft === 0) {
      this.endGame(false);
    } else {
      this.feedbackMessage = this.guessedNumber! > this.secretNumber
        ? 'Too High! Try again.'
        : 'Too low! Try again.';
    }
  }

  private endGame(isWin: boolean): void {
    this.gameOver = true;
    this.feedbackMessage = isWin ? 'Congratulations!' :
      `Game over! The correct number was ${this.secretNumber}`;
  }

  resetGame(): void {
    this.secretNumber = this.genRandomNumber();
    this.attemptsLeft = GuessTheNumberComponent.MAX_ATTEMPTS;
    this.guessedNumber = undefined;
    this.feedbackMessage = "";
    this.gameOver = false;
  }
}
