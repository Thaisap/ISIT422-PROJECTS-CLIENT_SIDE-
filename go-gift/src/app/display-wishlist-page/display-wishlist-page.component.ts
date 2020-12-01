import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Profile } from '../Profile';

@Component({
  selector: 'app-display-wishlist-page',
  templateUrl: './display-wishlist-page.component.html',
  styleUrls: ['./display-wishlist-page.component.css']
})
export class DisplayWishlistPageComponent implements OnInit {
  itemList : Profile;
  userId: string;
  

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
deleteItemFromWislist(){
  
}
 
}
