import { PdfGeneratorService } from './../../services/pdf-generator.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-download',
  imports: [],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
})
export class DownloadComponent {
  constructor(private pdfGeneratorService: PdfGeneratorService) {}
  generateResume(): void {
    this.pdfGeneratorService.generateResime();
  }
}
