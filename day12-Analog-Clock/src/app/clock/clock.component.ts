import { TimeService } from './../services/time.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {CLOCK_CONSTANT as cc} from './clock.constants'

@Component({
  selector: 'app-clock',
  imports: [CommonModule],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent implements OnInit {
  hours:number=0;
  minutes:number=0;
  seconds:number=0;
  clockNumbers=this.generateClockNumbers();

  generateClockNumbers(){
    const numbers =[];
    const centerOffset = cc.CENTER_OFFSET;
    const radius =cc.RADIUS;
    for(let i =1 ;i<=12; i++){
      const angle = (i-3)* cc.DEGREES_PER_HOUR*cc.DEG_TO_RAD;
      const top = centerOffset+radius*Math.sin(angle);
      const left = centerOffset+radius*Math.cos(angle);

      numbers.push({
        number:i,
        postion:{
          top:`${top}%`,
          left:`${left}%`
        }
      })
    }
    return numbers;
  }

  constructor(private timeService:TimeService){}
  ngOnInit():void{
    this.updateClock();
    setInterval(()=> this.updateClock(),1000);
  }
  updateClock(){
    const now = this.timeService.getCurrentTime();
    this.hours = (now.getHours()%12)*cc.DEGREES_PER_HOUR +now.getMinutes()*cc.MINUTE_ADJUSMENT+cc.OFFSET_ROTATION;
    this.minutes=now.getMinutes()*cc.DEGREES_PER_MINUTE_SECOND
    +cc.OFFSET_ROTATION;
    this.seconds=now.getSeconds()*cc.DEGREES_PER_MINUTE_SECOND+cc.OFFSET_ROTATION;
  }
}
