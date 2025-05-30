import { PostService } from './../../services/post.service';
import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule,PostComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{
  posts:any[]=[];
  loading=false;
  page=1;
  limit=10;
  errorMessage='';
  constructor(private postService:PostService){}
  ngOnInit():void{
     this.loadPosts();
  }
  private handelError(error:any):void{
    console.error('Error fetching posts:' , error);
    this.errorMessage="Somthing went wrong";
  }

  loadPosts():void{
    this.loading=true;
    this.postService.getPosts(this.page,this.limit).subscribe({
      next:(newPosts)=>{
        if(newPosts&& newPosts.length>0){
          // append new Post
          this.posts=[...this.posts, ...newPosts];
          this.page++;
          this.errorMessage='';
        }
      },
      error:(error)=>{
        this.handelError(error);
      },
      complete:()=>{
        this.loading=false;
      }
    })
  }

@HostListener('window:scroll', [])
onScroll(): void {
  if (
    window.innerHeight + window.scrollY >= document.body.scrollHeight - 100 &&
    !this.loading
  ) {
    this.loadPosts();
  }
}


  
}
