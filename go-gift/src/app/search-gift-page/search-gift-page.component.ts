import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Item } from '../item';

@Component({
  selector: 'app-search-gift-page',
  templateUrl: './search-gift-page.component.html',
  styleUrls: ['./search-gift-page.component.css']
})
export class SearchGiftPageComponent implements OnInit {
  userId: string;
  tagName: string;
  itemList: Item[];
  hideSearchResults: boolean = true;
  message: string;
  allTagNames: string[];
  showToast: boolean = false;

  constructor(private userService: UserService) {
    this.userService.loggedInUserAccount.subscribe((accountId) => {
      this.userId = accountId;
    });
  }

  ngOnInit(): void {
    if(this.userId == null){
      this.userId = localStorage.getItem('accountId');
    }
    this.getAllTags();
  }

  getAllTags(): void{
    this.userService.getAllTags()
    .subscribe(allTags => this.allTagNames = allTags.tags);
  }

  checkTagName($event): void{
    this.hideSearchResults = true;
    this.itemList = [];
    this.tagName = $event;
    this.message = '';
    //should check whether tag name is in database
    let tagNameInDB = this.allTagNames.includes(this.tagName);
    if(tagNameInDB){
      //call db
      this.searchItems();
    }else{
      this.message = "No Results Found.";

      this.hideSearchResults = false;
    }  
  }

  searchItems(): void{
    this.userService.getItemListByTagName(this.tagName)
      .subscribe((items) => {
        if(items.length === 0){
          this.message = "No Results Found.";
        }
        this.hideSearchResults = false;
        return this.itemList = items;
        
      });
  }
  addItemToUserWishlist(id:string){
    this.userService.addItemToUserWishlist(this.userId,id)
    .subscribe((info) => this.showToast = true);
  };


 


}
