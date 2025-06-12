import { EntropyService } from './../../services/entropy.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordGeneratorService } from '../../services/password-generator.service';

@Component({
  selector: 'app-password-generator',
  imports: [CommonModule, FormsModule],
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.scss',
})
export class PasswordGeneratorComponent {
  length: number = 12;
  includeUppercase: boolean = false;
  includeNumbers: boolean = false;
  includeSpecialChars: boolean = false;
  generatedPassowrd: string = '';
  passwordEntropy: number = 0;
  passowrdStrength: string = 'Very Weak';
  passowrdStrengthColor: string = 'red';

  constructor(
    public passwordGenerateService: PasswordGeneratorService,
    public entropyService: EntropyService
  ) {}

  generatePassword(): void {
    const { password } = this.passwordGenerateService.generatePassword(
      this.length,
      this.includeUppercase,
      this.includeNumbers,
      this.includeSpecialChars
    );
    this.generatedPassowrd = password;
    this.passwordEntropy =
      this.entropyService.calculatePasswordEntropy(password);
    this.updatePasswordStrength();
  }

  updatePasswordStrength(): void {
    if (this.passwordEntropy < 36) {
      this.passowrdStrength = 'Very Weak';
      this.passowrdStrengthColor = 'red';
    } else if (this.passwordEntropy < 60) {
      this.passowrdStrength = 'Weak';
      this.passowrdStrengthColor = 'orange';
    } else if (this.passwordEntropy < 120) {
      this.passowrdStrength = 'Strong';
      this.passowrdStrengthColor = 'green';
    } else {
      this.passowrdStrength = 'Very Strong';
      this.passowrdStrengthColor = 'darkgreen';
    }
  }

  onPasswordChange(newPassword: string): void {
    if (!newPassword) {
      this.passwordEntropy = 0;
      this.passowrdStrength = 'Very Weak';
      this.passowrdStrengthColor = 'red';
      return;
    }
    this.passwordEntropy =
      this.entropyService.calculatePasswordEntropy(newPassword);
    this.updatePasswordStrength();
  }
  copyToClipboard(): void {
    navigator.clipboard.writeText(this.generatedPassowrd).then(() => {
      alert('Passowrd copied to clipboard!');
    });
  }

  calculateStrengthWidth(entropy:number):number{
    const maxEntropy=120;
    const normalizedEntropy=Math.min(entropy,maxEntropy);
    return(normalizedEntropy/maxEntropy)*100;
  }
}
