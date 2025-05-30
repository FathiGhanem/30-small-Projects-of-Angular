import { JokeService } from './../services/joke.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-joke',
  imports: [CommonModule],
  templateUrl: './joke.component.html',
  styleUrl: './joke.component.scss'
})
export class JokeComponent {
  jokeSetUp:string='';
  jokePunchLine:string='';
  isLoading:boolean=false;
  errorMessage:string='';

  constructor(private jokeService:JokeService){

  }

  fetchJoke (){
    this.isLoading=true;
    this.errorMessage='';
    this.jokeService.getRandomJoke().subscribe({
      next:(joke)=>{
        this.jokeSetUp=joke.setup;
        this.jokePunchLine=joke.punchline;
        this.isLoading=false;
      },
      error:()=>{
        this.errorMessage="Faild to fetch a joke ";
        this.jokeSetUp='';
        this.jokePunchLine='';
        this.isLoading=false;
      },

    });
  }
}
