import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
tasks: string[]=[];
newTask:string = '';
BoxStatus:string ='';
isImpty:boolean=true;

addTask(){
  if(this.newTask.trim()!==''){
    this.tasks.push(this.newTask);
    this.newTask='';
    this.isImpty=false;}  
  else{
    this.isImpty=true;
    this.BoxStatus='Please Fill The Box To add The New Task :)';
  }

}
  removeTask(index : number){
    this.tasks.splice(index,1);
  }

}
