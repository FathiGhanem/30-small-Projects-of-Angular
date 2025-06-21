import { PhotoService } from './../../services/photo.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResumeDataService } from '../../services/resum-data.service';

@Component({
  selector: 'app-edittable-resume',
  imports: [FormsModule, CommonModule],
  templateUrl: './edittable-resume.component.html',
  styleUrl: './edittable-resume.component.scss',
})
export class EdittableResumeComponent {
  photoUrl: string | ArrayBuffer | null = null;

  constructor(
    public resume: ResumeDataService,
    private photoService: PhotoService
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
    const render = new FileReader();
    render.onload = (e) => {
      this.photoUrl = render.result;
      this.photoService.photoUrl=this.photoUrl;
    };
    render.readAsDataURL(file);
  }
}
