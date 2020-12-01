import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Item } from '../item';

@Component({
  selector: 'app-search-gift-page',
  templateUrl: './search-gift-page.component.html',
  styleUrls: ['./search-gift-page.component.css']
})
export class SearchGiftPageComponent implements OnInit {
  tagName: string;
  //savedTagName: string;
  itemList: Item[];
  hideSearchResults: boolean = true;
  message: string;
  allTagNames: string[];
  showToast: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllTags();
    console.log(this.showToast);
  }

  getAllTags(): void{
    this.userService.getAllTags()
    .subscribe(allTags => this.allTagNames = allTags.tags);
  }

  checkTagName($event): void{
    this.hideSearchResults = true;
    this.itemList = [];
    this.tagName = $event;
    //this.savedTagName = $event;
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
    console.log(this.hideSearchResults);  
  }

  searchItems(): void{
    this.userService.getItemListByTagName(this.tagName)
      .subscribe((items) => {
        console.log(items);
        if(items.length === 0){
          this.message = "No Results Found.";
        }
        this.hideSearchResults = false;
        console.log(this.hideSearchResults); 
        return this.itemList = items;
        
      });
  }
  addItemToUserWishlist(id:string){
    this.userService.addItemToUserWishlist('5f9725288c008df2d8d1c241',id)
    .subscribe((info) => console.log(info));

    this.showToast = true;
  };


 


}
