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
  itemList: Item[];
  hideSearchResults: boolean = true;
  message: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  searchItems($event): void{
    this.tagName = $event;
    this.message = '';
    //console.log("Calling from parent: " + this.tagName);
    this.userService.getItemListByTagName(this.tagName)
      .subscribe((items) => {
        if(items.length === 0){
          this.message = "No Results Found.";
        }
        return this.itemList = items;
      });
    this.hideSearchResults = false;
  }


}
