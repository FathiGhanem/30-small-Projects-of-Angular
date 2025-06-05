import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { CryptoChartComponent } from "./components/crypto-chart/crypto-chart.component";
import { CryptoOptionsComponent } from "./components/crypto-options/crypto-options.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, CryptoChartComponent, CryptoOptionsComponent]
})
export class AppComponent {

}
