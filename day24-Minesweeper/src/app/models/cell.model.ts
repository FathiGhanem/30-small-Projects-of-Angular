export interface Cell{
    isMine:boolean;
    isRevealed:boolean;
    isFlagged:boolean;
    adjacentMines:number;
}