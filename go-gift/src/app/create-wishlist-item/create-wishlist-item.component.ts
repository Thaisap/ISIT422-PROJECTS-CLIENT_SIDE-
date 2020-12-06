import { Component, OnInit } from '@angular/core';
import { WriteItemDoc } from '../item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTagsModalComponent } from '../add-tags-modal/add-tags-modal.component';
import { WriteTagDoc } from '../tag';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-wishlist-item',
  templateUrl: './create-wishlist-item.component.html',
  styleUrls: ['./create-wishlist-item.component.css']
})
export class CreateWishlistItemComponent implements OnInit {
  userId: string;
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
  allTagNames: string[];
  allTagIds: string[];
  tagDoc: WriteTagDoc;
  recordedItem: WriteItemDoc;
  showToast: boolean = false;
  addedTagsArray: string[] = [];

  constructor(private userService: UserService, private modalService: NgbModal) {
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
    .subscribe(allTags => {
      [this.allTagNames = allTags.tags, this.allTagIds = allTags.tagIds];
    });
  }

  createDemoWishlistItem(): void{
    this.createdItem = {
      itemName: 'Water\'s Edge by David Hale - 1000 piece jigsaw puzzle',
      vendor: 'verygoodpuzzle',
      price: '24.00',
      image: 'https://i.etsystatic.com/19002028/r/il/11a5f0/1746826817/il_1588xN.1746826817_afpe.jpg',
      url: 'https://www.etsy.com/listing/662204297/waters-edge-by-david-hale-1000-piece',
      tag: []
    }
    this.recordedItem = this.createdItem;
    this.tags = ['puzzle', 'black', 'red'];

    this.getTagIdsArray().then((tagArray) => {
      this.recordedItem.tag = tagArray;
      //need to add the item to the tag collection
      this.userService.createItem(this.recordedItem).subscribe(itemId => {
        this.recordedItem.tag.map((tagId) => {
          this.userService.addItemToTag(tagId, itemId).subscribe((updatedTagInfo) => console.log(updatedTagInfo));
        });
        this.userService.addItemToUserWishlist(this.userId, itemId).subscribe((updatedUserInfo) => console.log(updatedUserInfo));
        this.showToast = true;
      });
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
    //get the price value
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
   /*  this.tags = this.tagInput.split(",");
    this.tagInput = ""; */
    this.tags = this.addedTagsArray;

    this.getTagIdsArray().then((tagArray) => {
      this.recordedItem.tag = tagArray;
      //need to add the item to the tag collection
      this.userService.createItem(this.recordedItem).subscribe(itemId => {
        this.recordedItem.tag.map((tagId) => {
          this.userService.addItemToTag(tagId, itemId).subscribe((updatedTagInfo) => console.log(updatedTagInfo));
        });
        this.userService.addItemToUserWishlist(this.userId, itemId).subscribe((updatedUserInfo) => console.log(updatedUserInfo));
        this.showToast = true;
      });
    });
    this.addedTagsArray = [];
  }

  async getTagIdsArray(){
    let promArray = await this.tags.map(async(tag) => {
      tag = tag.trim();
      let index = this.allTagNames.indexOf(tag);
      //in db, get tag object id to write as a reference to item collection
      if(index !== -1){
        return this.allTagIds[index];
      }else{
        //create new tag in tag collection and get object id
        this.tagDoc = {
          name: tag,
          item: []
        };
        let newTagId = await this.userService.CreateTag(this.tagDoc).toPromise();
        return newTagId
      }
    });
    let newTagArray = Promise.all(promArray).then((v) => v);
    return newTagArray;
  }

  openAddTagsModal() {
    const modalRef = this.modalService.open(AddTagsModalComponent,  { windowClass : "addTagsModal"});
    modalRef.result.then((result) => result.map((tag) => {
      console.log(tag);
      this.addedTagsArray.push(tag);
      console.log(this.addedTagsArray);
    }), (reason) => {
      this.addedTagsArray = [];
    });
  }
}
