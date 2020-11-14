import { Component, OnInit } from '@angular/core';
import { Item, WriteItemDoc } from '../item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTagsModalComponent } from '../add-tags-modal/add-tags-modal.component';
import { allTags } from '../allTags';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-wishlist-item',
  templateUrl: './create-wishlist-item.component.html',
  styleUrls: ['./create-wishlist-item.component.css']
})
export class CreateWishlistItemComponent implements OnInit {
  createdItem: WriteItemDoc = {
    itemName: '',
    vendor: '',
    price: '',
    image: '',
    url: '',
    tag: []
  };
  tags: string[];
  tagInput: string = '';
  priceAsNum: number = 0.00;
  startingPrice: boolean = false;
  //allTagsInfo: allTags;
  allTagNames: string[];
  allTagIds: string[];


  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllTags();
  }

  getAllTags(): void{
    this.userService.getAllTags()
    .subscribe(allTags => {
      console.log(allTags);
      [this.allTagNames = allTags.tags, this.allTagIds = allTags.tagIds];
    });
  }

  createWishlistItem(): void{
    console.log(this.createdItem);
    console.log(this.allTagNames);
    console.log(this.allTagIds);
    //get the price value
    console.log(Number(this.priceAsNum).toFixed(2));
    if(this.startingPrice){
      this.createdItem.price = Number(this.priceAsNum).toFixed(2).toString() + "+";
    }else{
      this.createdItem.price = Number(this.priceAsNum).toFixed(2).toString();
    }
    //check the tags and find the ids
    this.tags = this.tagInput.split(",");
    this.tags.map((tag) => {
      tag = tag.trim();
      let index = this.allTagNames.indexOf(tag);
      //in db, get tag object id to write as a reference to item collection
      if(index !== -1){
        console.log(this.allTagIds[index]);
        this.createdItem.tag.push(this.allTagIds[index]);
      }else{
        //create new tag in tag collection and get object id
        console.log("No tag found");
        
      }
    });
    //need to add the item to the tag collection
  }

  openAddTagsModal() {
    const modalRef = this.modalService.open(AddTagsModalComponent);
    modalRef.result.then((result) => console.log(result), (reason) => console.log(reason));
  }
}
