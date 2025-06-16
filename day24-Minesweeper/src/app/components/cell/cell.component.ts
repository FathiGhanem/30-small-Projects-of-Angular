import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cell',
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss',
})
export class CellComponent {
  @Input() row!: number;
  @Input() col!: number;
  @Input() cell: any;
  @Output() cellClicked = new EventEmitter();
  @Output() cellFlagged = new EventEmitter();

  onLeftClick() {
    this.cellClicked.emit({ row: this.row, col: this.col });
  }
  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.cellFlagged.emit({ row: this.row, col: this.col });
  }
}
