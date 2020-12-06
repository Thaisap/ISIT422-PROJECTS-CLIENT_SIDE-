import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Item } from '../item';
import { UserService } from '../user.service';


@Component({
  selector: 'app-tag-result',
  templateUrl: './tag-result.component.html',
  styleUrls: ['./tag-result.component.css']
})
export class TagResultComponent implements OnInit {
  searchTerm: string = '';
  userId: string;
  itemList: Item[];
  showResults: boolean;
  fromFriend: boolean;
  showToast: boolean = false;

  constructor(private activatedRouter: ActivatedRoute, public router: Router, public userService: UserService) { 
    const navigation = this.router.getCurrentNavigation();
    const navState = navigation.extras.state;
    if(navState == null){
      this.fromFriend = false;
    }
    if(navState.page === "user"){
      this.fromFriend = false;
    }
    if(navState.page === "friend"){
      this.fromFriend = true;
    }

    
    this.activatedRouter.params.subscribe( params => this.searchTerm = params['term']);
    this.userService.loggedInUserAccount.subscribe((accountId) => {
      this.userId = accountId;
    });
  }

  ngOnInit(): void {
    if(this.userId == null){
      this.userId = localStorage.getItem('accountId');
    }
    this.searchItems();
  }

  searchItems(): void{
    this.userService.getItemListByTagName(this.searchTerm)
      .subscribe((items) => {
        if(items.length === 0){
          this.showResults = false;
        }else{
          this.showResults = true;
        }
        console.log(this.showResults);
        return this.itemList = items;        
      });
  }

  addItemToUserWishlist(id:string){
    this.userService.addItemToUserWishlist(this.userId,id)
    .subscribe((info) => this.showToast = true);
  };
}
