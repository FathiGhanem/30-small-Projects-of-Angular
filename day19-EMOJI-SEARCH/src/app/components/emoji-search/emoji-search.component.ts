import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Emoji } from '../../models/emojo.model';
import { EmojiService } from '../../services/emoji.service';

@Component({
  selector: 'app-emoji-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './emoji-search.component.html',
  styleUrl: './emoji-search.component.scss',
})
export class EmojiSearchComponent implements OnInit {
  searchTerm: string = '';
  selectedCategory: string = '';
  emojis: Emoji[] = [];
  filteredEmojis: Emoji[] = [];
  categories: string[] = [];
  clipboardNot: string | null = null;

  constructor(private emojiService: EmojiService) {}

  ngOnInit(): void {
    this.emojiService.getEmojis().subscribe((emojis: Emoji[]) => {
      this.emojis = emojis;
      this.filteredEmojis = [...this.emojis];
      this.categories = this.emojiService.getCategories(emojis);
    });
  }

  filterEmojis(): void {
    this.filteredEmojis = [];
    for (let emoji of this.emojis) {
      const isSearchMatch = emoji.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      let isCategoryMatch = true;
      if (this.selectedCategory) {
        isCategoryMatch = emoji.category === this.selectedCategory;
      }
      if (isSearchMatch && isCategoryMatch) {
        this.filteredEmojis.push(emoji);
      }
    }
  }

  onCategoryChange(): void {
    this.filterEmojis();
  }

  copyToClipboard(symbol: string): void {
    navigator.clipboard.writeText(symbol);
    this.clipboardNot = `Copied ${symbol} to clipboard`;
    setTimeout(() => {
      this.clipboardNot = null;
    }, 3000);
  }
}
