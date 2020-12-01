import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ProfileWithImg } from '../Profile';

@Component({
  selector: 'app-friend-wishlist',
  templateUrl: './friend-wishlist.component.html',
  styleUrls: ['./friend-wishlist.component.css']
})
export class FriendWishlistComponent implements OnInit {
  friendId: string;
  friendProfile: ProfileWithImg;

  constructor(private location: Location, public userService: UserService, public router: Router) {
    const navigation = this.router.getCurrentNavigation();
     const navState = navigation.extras.state;
       
     if(navState == null){
       this.friendId = localStorage.getItem('friendId');
     }else{
       this.friendId = navState.friendId;
     }
  }

  ngOnInit(): void {
    this.getFriendWishlist(this.friendId);
  }

  back():void{
    this.location.back();
  }

  getFriendWishlist(userId: string){
    this.userService.getWishlistForUserWithImg(userId)
    .subscribe((info) =>{
      return this.friendProfile = info;
    });  
  }
}
