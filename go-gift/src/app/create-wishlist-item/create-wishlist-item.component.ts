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
  //allTagsInfo: allTags;
  allTagNames: string[];
  allTagIds: string[];
  tagDoc: WriteTagDoc;
  recordedItem: WriteItemDoc;
  showToast: boolean = false;


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
    console.log(this.showToast);
  }

  getAllTags(): void{
    this.userService.getAllTags()
    .subscribe(allTags => {
      console.log(allTags);
      [this.allTagNames = allTags.tags, this.allTagIds = allTags.tagIds];
    });
  }

  createDemoWishlistItem(): void{
    this.createdItem = {
      itemName: 'Octobuddies',
      vendor: 'TheCapedCrocheters',
      price: '15.00+',
      image: 'https://i.etsystatic.com/22470977/r/il/095af6/2397363138/il_1588xN.2397363138_54qu.jpg',
      url: 'https://www.etsy.com/listing/767877758/octobuddies',
      tag: []
    }
    this.recordedItem = this.createdItem;
    this.tags = ['amigurumi', 'octopus'];

    /* this.createdItem = {
      itemName: 'Amethyst the Unicorn - Crochet Amigurumi Pattern',
      vendor: 'SmileyCrochetThings',
      price: '6.21',
      image: 'https://i.etsystatic.com/15416813/r/il/6eaf37/2239661361/il_794xN.2239661361_2bud.jpg',
      url: 'https://www.etsy.com/listing/770208591/amethyst-the-unicorn-crochet-amigurumi',
      tag: []
    }
    this.recordedItem = this.createdItem;
    this.tags = ['amigurumi', 'unicorn']; */

    this.getTagIdsArray().then((tagArray) => {
      this.recordedItem.tag = tagArray;
      //need to add the item to the tag collection
      this.userService.createItem(this.recordedItem).subscribe(itemId => {
        console.log(itemId);
        this.recordedItem.tag.map((tagId) => {
          this.userService.addItemToTag(tagId, itemId).subscribe((updatedTagInfo) => console.log(updatedTagInfo));
        });
        this.userService.addItemToUserWishlist(this.userId, itemId).subscribe((updatedUserInfo) => console.log(updatedUserInfo));
        //
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

    this.getTagIdsArray().then((tagArray) => {
      this.recordedItem.tag = tagArray;
      //need to add the item to the tag collection
      this.userService.createItem(this.recordedItem).subscribe(itemId => {
        console.log(itemId);
        this.recordedItem.tag.map((tagId) => {
          this.userService.addItemToTag(tagId, itemId).subscribe((updatedTagInfo) => console.log(updatedTagInfo));
        });
        this.userService.addItemToUserWishlist(this.userId, itemId).subscribe((updatedUserInfo) => console.log(updatedUserInfo));
      });
    });
  }

  async getTagIdsArray(){
    let promArray = await this.tags.map(async(tag) => {
      tag = tag.trim();
      let index = this.allTagNames.indexOf(tag);
      //in db, get tag object id to write as a reference to item collection
      if(index !== -1){
        console.log(this.allTagIds[index]);
        return this.allTagIds[index];
      }else{
        //create new tag in tag collection and get object id
        console.log("No tag found");
        this.tagDoc = {
          name: tag,
          item: []
        };
        console.log(this.tagDoc);
        let newTagId = await this.userService.CreateTag(this.tagDoc).toPromise();
        return newTagId
      }
    });
    let newTagArray = Promise.all(promArray).then((v) => v);
    return newTagArray;
  }

  openAddTagsModal() {
    const modalRef = this.modalService.open(AddTagsModalComponent);
    modalRef.result.then((result) => console.log(result), (reason) => console.log(reason));
  }
}
