import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {
  private conversionRates: { [key: string]: { [key: string]: number } } = {
    USD: { EUR: 0.96, GBP: 0.75, INR: 74.5, JPY: 109, JOD: 0.71 },
    EUR: { USD: 1.04, GBP: 0.88, INR: 77, JPY: 113, JOD: 0.74 },
    GBP: { USD: 1.33, EUR: 1.14, INR: 100, JPY: 150, JOD: 0.86 },
    INR: { USD: 0.013, EUR: 0.011, GBP: 0.01, JPY: 1.5, JOD: 0.0095 },
    JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0067, INR: 0.67, JOD: 0.0064 },
    JOD: { USD: 1.41, EUR: 1.35, GBP: 1.16, INR: 105, JPY: 156 },
  };

  getConversionRate(source: string, target: string): number | null {
    if (!this.conversionRates[source]) return null;
    if (!this.conversionRates[source][target]) return null;
    return this.conversionRates[source][target];
  }

  converCurrency(amount: number , source: string, target: string): number  {
    const rate = this.getConversionRate(source, target);
    if (rate === null) return 0;
    return amount * rate;
  }
}
