import { CurrencyConverterService } from './../services/currency-converter.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-converter',
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent {
  amount: number | null = null;
  sourceCurrency: string = 'USD';
  targetCurrency: string = 'EUR';
  result: number = 0;
  conversionRate: number | null = null;
  curencies: string[] = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'JOD'];

  constructor(private currencyConverterService: CurrencyConverterService) {}

  convertCurrency() {
    if ((this.conversionRate = null)) {
      this.result = 0;
      return;
    }
    this.conversionRate = this.currencyConverterService.getConversionRate(
      this.sourceCurrency,
      this.targetCurrency
    );

    if (this.amount) {
      this.result = this.currencyConverterService.converCurrency(
        this.amount,
        this.sourceCurrency,
        this.targetCurrency
      );
    }
  }

  getCurrency(currency: string): string {
    return `${currency}`;
  }
}
