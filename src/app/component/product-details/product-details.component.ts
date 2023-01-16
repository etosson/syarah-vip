import { Component, OnInit } from '@angular/core';
import { Car, CarResponse } from 'src/app/data/models/cars';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { CarService } from 'src/app/data/service/cars.service';
import { CommentsService } from 'src/app/data/service/comments.service';
import {Comment,CommentsResponse, PostCommentPayload } from 'src/app/data/models/comments';
import { AuthenticationService } from 'src/app/data/service/authentication.service';
import {UsersService } from 'src/app/data/service/users.service';
import {StorageService } from 'src/app/data/service/storage.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";  


import { Subscription } from 'rxjs';
import { User,UserResponse } from 'src/app/data/models/user';
import { map } from 'lodash';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [DatePipe]
})
export class ProductDetailsComponent implements OnInit {
  carID!:any;
  car!:Car;
  comments:Comment[]=[];
  currentlanguage!:string;
  isLoggedIn = false;
  avatarInitial = '';
  username = '';
  authStatus!: Subscription;
  userId='';
  users: UserResponse=[]
  url:string="http://161.35.17.239/home/"
  currentUserID= this.ss.getItem('userId')

  newComment:PostCommentPayload={
  
  carID:"",
  userID:"",
  content:"",
  date:""
  }
  myDate: Date=new Date();
apiLoaded = false;


  constructor(private activatedRouter:ActivatedRoute,
    private carService:CarService,
    private auth: AuthenticationService,
    private userService: UsersService,
    private commentService:CommentsService,
    private ss:StorageService,
     private SpinnerService: NgxSpinnerService,
    private datePipe: DatePipe,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }


    
    this.geturl()


     // get comments--------------***************
     this.getcomments()

    this.authStatus = this.auth.loggedInStatus$.subscribe(status => {
      this.isLoggedIn = status;
       
    });

// get cars details-------------------**********
      this.SpinnerService.show();

    this.activatedRouter.paramMap.subscribe((parmas:ParamMap)=>{
      this.carID= parmas.get("id")
    })
    
    this.carService.getCarById(this.carID).subscribe((car)=>(
      this.car=car
    ))
      setTimeout(() => {
      this.SpinnerService.hide();
    }, 1000); 

    // get users--------------***************
     this.userService.getUsers().subscribe((users)=>(
      this.users=users.map((user)=>({
        id:user.id,
        username:user.username,
        email:user.email,
        phone:user.phone
      }))
      ))
}

onsubmit(){
  let currentUserID= this.ss.getItem('userId')

   this.newComment = {
    
      userID: currentUserID?.toString(),
      carID: this.carID,
      content: this.newComment.content,
      date:this.myDate.toLocaleString()
  };
  this.addComment(this.newComment)
  
}



addComment(comment: PostCommentPayload) {
  this.commentService.postComment(comment)
  .subscribe((comment) => this.comments.push(comment));
setTimeout(() => {
  this.getcomments()
    }, 500);
  this.newComment = {
    
      userID: "",
      carID:"",
      content:"",
      date:""
  };
}
deleteTask(comment:any){
  this.commentService.deleteComment(comment.toString()).subscribe(
    (comment)=>(this.comments=this.comments.filter(t=>t.id !== comment.data.id)))

    setTimeout(() => {
  this.getcomments()
    }, 500);
}
getcomments(){
      this.SpinnerService.show();
  this.commentService.getComment().subscribe(comments=>{
    this.comments=comments;
  });
   setTimeout(() => {
      this.SpinnerService.hide();
    }, 1000);
}

geturl(){
  this.url=window.location.href
}




}