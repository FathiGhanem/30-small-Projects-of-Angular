import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-picker',
  imports: [],
  templateUrl: './theme-picker.component.html',
  styleUrl: './theme-picker.component.scss',
  standalone: true,
})
export class ThemePickerComponent {
  setTheme(theme: 'light' | 'dark'){
    if(theme === 'dark'){
      document.body.classList.remove('light-theme');
    }else{
      document.body.classList.add('light-theme');
    }
  }

}
