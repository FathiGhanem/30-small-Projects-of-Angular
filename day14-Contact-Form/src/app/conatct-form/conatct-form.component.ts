import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-conatct-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './conatct-form.component.html',
  styleUrl: './conatct-form.component.scss',
})
export class ConatctFormComponent {
  contactForm: FormGroup;
  submissionStatus: 'success' | 'error' | null = null;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.maxLength(50)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get subject() {
    return this.contactForm.get('subject');
  }
  get message() {
    return this.contactForm.get('message');
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('FeedBack Submitted!', this.contactForm.value);
    } else {
      console.log('Form is invalid');
    }

    setTimeout(() => {
      this.submissionStatus = null;
    }, 5000);
  }
}
