import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Profile, ProfileWithImg } from '../Profile';

@Component({
  selector: 'app-display-wishlist-page',
  templateUrl: './display-wishlist-page.component.html',
  styleUrls: ['./display-wishlist-page.component.css']
})
export class DisplayWishlistPageComponent implements OnInit {
  itemList : ProfileWithImg;
  userId: string;
  showToast: boolean = false;
  

  constructor(private userService : UserService) { 
    this.userService.loggedInUserAccount.subscribe((accountId) => {
      this.userId = accountId;
    });
  }

  ngOnInit(): void {
    if(this.userId == null){
      this.userId = localStorage.getItem('accountId');
    }
    this.takeWishlist(this.userId);
    this.userService.wishlistUserData.subscribe((updatedProfile) => this.itemList = updatedProfile);
  }

  editWishlist(): void{
    console.log('clicked on edit wishlist button')
    
  }
  takeWishlist(id: string): void {
    this.userService.getWishlistForUserWithImg(id)
    .subscribe((info) =>{
      console.log(info);
      

    return this.itemList= info;

    })
  
  }
deleteItemFromWislist(itemId: string){
  this.userService.deleteItemFromWislist(this.userId,itemId)
  .subscribe((info) =>{
    console.log(info);
    this.showToast = true;
    this.userService.updateWishListInfo(info);
  });

  
  //this.userService.updateWishListInfo(info);
}
 
}
