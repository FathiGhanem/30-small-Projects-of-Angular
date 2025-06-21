import { Component } from '@angular/core';
import { EdittableResumeComponent } from "./components/edittable-resume/edittable-resume.component";
import { ResumeComponent } from "./components/resume/resume.component";
import { DownloadComponent } from "./components/download/download.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [EdittableResumeComponent, ResumeComponent, DownloadComponent]
})
export class AppComponent {
}
