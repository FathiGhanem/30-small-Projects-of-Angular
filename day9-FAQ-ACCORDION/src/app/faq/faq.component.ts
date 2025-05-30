import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { faqAnimation } from './faq-animation';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  animations:[faqAnimation.slideToggle]
})
export class FaqComponent {
  openedIndex:number| null = null;




    faqs = [

    {

      question: 'What is Angular?',

      answer:

        'Angular is a platform for building mobile and desktop web applications.',

    },

    {

      question: 'What is a component in Angular?',

      answer:

        'A component controls a patch of the screen called a view. Components are the main building block of Angular applications.',

    },

    {

      question: 'What are Angular directives?',

      answer:

        'Directives are instructions in the DOM. Angular directives allow you to attach behavior to elements in the DOM.',

    },

  ];

  toggleFAQ(index:number){
    this.openedIndex= this.openedIndex === index ? null :index;
  }

}
