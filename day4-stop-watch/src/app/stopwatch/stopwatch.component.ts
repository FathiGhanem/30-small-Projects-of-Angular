import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  imports: [CommonModule],
  templateUrl: './stopwatch.component.html',
  styleUrl: './stopwatch.component.scss'
})
export class StopwatchComponent {
    elapsedTime:number =0;
    isRunning:boolean=false;
    intervalRef:any;
    
    startStop(){
      this.isRunning ? this.stop():this.start();
    }

    private start(){
      this.isRunning=true;
      this.intervalRef=setInterval(
        ()=>{
          this.elapsedTime+=0.1;
        },100
      )
      console.log("started");
    }

    private stop(){
      this.isRunning=false;
      clearInterval(this.intervalRef);
      console.log("stoped");
    }

    rest(){
      this.isRunning=false;
      clearInterval(this.intervalRef);
      this.elapsedTime=0;
      console.log("Rest");

    }
    reStart(){
      this.rest();
      this.start();
    }
}
