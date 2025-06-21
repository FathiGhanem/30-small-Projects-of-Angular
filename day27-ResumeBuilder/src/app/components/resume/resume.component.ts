import { PhotoService } from './../../services/photo.service';
import { ResumeDataService } from './../../services/resum-data.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PdfGeneratorService } from '../../services/pdf-generator.service';

@Component({
  selector: 'app-resume',
  imports: [CommonModule, FormsModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent {
  @ViewChild('resume') resumeRef!: ElementRef;
  photoUrl: string | ArrayBuffer | null = null;
  private photoSubscription!: Subscription;

  constructor(
    public pdfService: PdfGeneratorService,
    public resumeData: ResumeDataService,
    public photoService: PhotoService
  ) {}

  ngAfterViewInit() {
    this.pdfService.setResumeElement(this.resumeRef);
    this.photoSubscription = this.photoService.photoUrl$.subscribe((url) => {
      this.photoUrl = url;
    });
  }

  ngOnDestroy() {
    if (this.photoSubscription) {
      this.photoSubscription.unsubscribe();
    }
  }

  isNotEmpty(str: string | null | undefined): boolean {
    return str != null && str.trim() !== '';
  }

  isNotEmptyItems(array: string[]): boolean {
    return (
      Array.isArray(array) && array.some((item) => item.trim().length >= 2)
    );
  }

  hasNonEmptyProjects(
    projects: { name: string; description: string }[]
  ): boolean {
    return (
      Array.isArray(projects) &&
      projects.some((project) => {
        return (
          this.isNotEmpty(project.name) || this.isNotEmpty(project.description)
        );
      })
    );
  }
}
