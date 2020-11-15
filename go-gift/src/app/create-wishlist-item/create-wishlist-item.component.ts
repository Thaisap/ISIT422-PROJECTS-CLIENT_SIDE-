import { Component, OnInit } from '@angular/core';
import { Item, WriteItemDoc } from '../item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTagsModalComponent } from '../add-tags-modal/add-tags-modal.component';
import { allTags } from '../allTags';
import { WriteTagDoc } from '../tag';
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
  startingPrice: string = "false";
  //allTagsInfo: allTags;
  allTagNames: string[];
  allTagIds: string[];
  tagDoc: WriteTagDoc;
  recordedItem: WriteItemDoc;


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
    this.recordedItem = this.createdItem;
    this.createdItem = {
      itemName: '',
      vendor: '',
      price: '',
      image: '',
      url: '',
      tag: []
    };
    console.log(this.recordedItem);
    console.log(this.allTagNames);
    console.log(this.allTagIds);
    //get the price value
    console.log(Number(this.priceAsNum).toFixed(2));
    console.log(this.startingPrice);
    if(this.startingPrice === "true"){
      this.recordedItem.price = Number(this.priceAsNum).toFixed(2).toString() + "+";
      this.priceAsNum = 0.00;
      this.startingPrice = "false";
    }else if(this.startingPrice === "false"){
      this.recordedItem.price = Number(this.priceAsNum).toFixed(2).toString();
      this.priceAsNum = 0.00;
    }else{
      this.priceAsNum = 0.00;
      this.startingPrice = "false";
    }
    //check the tags and find the ids
    this.tags = this.tagInput.split(",");
    this.tagInput = "";
    this.tags.map((tag) => {
      tag = tag.trim();
      let index = this.allTagNames.indexOf(tag);
      //in db, get tag object id to write as a reference to item collection
      if(index !== -1){
        console.log(this.allTagIds[index]);
        this.recordedItem.tag.push(this.allTagIds[index]);
      }else{
        //create new tag in tag collection and get object id
        console.log("No tag found");
        this.tagDoc = {
          name: tag,
          item: []
        };
        console.log(this.tagDoc);
        this.userService.CreateTag(this.tagDoc).subscribe(tagId => {
          console.log(tagId);
          this.recordedItem.tag.push(tagId);
        });
      }
      //console.log(this.recordedItem.tag);
    });
    //need to add the item to the tag collection
    this.userService.createItem(this.recordedItem).subscribe(itemId => {
      console.log(itemId);
      this.recordedItem.tag.map((tagId) => {
        this.userService.addItemToTag(tagId, itemId).subscribe((updatedTagInfo) => console.log(updatedTagInfo));
      });
      this.userService.addItemToUserWishlist('5f9725288c008df2d8d1c241', itemId).subscribe((updatedUserInfo) => console.log(updatedUserInfo));
    });
  }

  openAddTagsModal() {
    const modalRef = this.modalService.open(AddTagsModalComponent);
    modalRef.result.then((result) => console.log(result), (reason) => console.log(reason));
  }
}
