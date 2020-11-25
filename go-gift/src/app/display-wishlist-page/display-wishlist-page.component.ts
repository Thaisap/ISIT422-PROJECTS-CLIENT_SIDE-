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
  

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.takeWishlist('5f9725288c008df2d8d1c241');
  }

  editWishlist(): void{
    console.log('clicked on edit wishlist button')
    
  }
  takeWishlist(id: string): void {
    this.userService.takeWishlist('5f9725288c008df2d8d1c241')
    .subscribe((info) =>{
      console.log(info);
      

    return this.itemList= info;

    })
  
  }
deleteItemFromWislist(){
  
}
 
}
