import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import { UserService } from '../user.service';
import {allTags} from '../allTags';
import { Profile, ProfileWithImg } from '../Profile';
import { AddTagsModalComponent } from '../add-tags-modal/add-tags-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { WriteTagDoc } from '../tag';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {
  userId: string;
  //_accountIdSubscription$: any
  userProfile?: ProfileWithImg;
  hideDisplay: boolean = false;
  hideProfile: boolean = true;
  hideEditProfile: boolean = true;
  //updatedProfile: Profile;
  //user: User;
  //allTags: allTags;
  addedTagsArray: string[] = [];
  hideEditTags: boolean = true;
  allTagNames: string[];
  allTagIds: string[];
  tagDoc: WriteTagDoc;
  tagIds: Promise<string[]>;
  originalTags: Set<string> = new Set();
  changedTag: boolean = false;
  hideOriginalTags: boolean = false;

  constructor(private userService: UserService, private modalService: NgbModal) {
    this.userService.loggedInUserAccount.subscribe((accountId) => {
      this.userId = accountId;
    });
  }

  ngOnInit() {
    //this.getAccountId();
    if(this.userId == null){
      this.userId = localStorage.getItem('accountId');
    }
    console.log(this.userId);
    this.getProfile(this.userId);
    this.getAllTags();
  }
  
  getAccountId(): void{
    
  }

  getProfile(id: string): void{
    this.userService.getUserWithImg(id)
      .subscribe( (info) => this.userProfile = info );
  }

  getAllTags(): void{
    this.userService.getAllTags()
    .subscribe(allTags => {
      console.log(allTags);
      [this.allTagNames = allTags.tags, this.allTagIds = allTags.tagIds];
    });
  }

  openProfile(): void{
    if(this.hideProfile){
      this.hideProfile = false;
    }else{
      this.hideProfile = true;
    }
  }

  editProfile(): void{
    this.hideEditProfile = false;
  }

  updateProfile(): void{
    this.hideEditProfile = true;
    console.log(this.userProfile);
    this.userService.updateCurrentUser(this.userId, this.userProfile)
      .subscribe((info) => this.userProfile = info);    
  }

  editBio(): void{
    this.hideDisplay = true;
    console.log("EDIT BIO");
  }

  updateBio(): void{
    this.hideDisplay = false;
    this.userService.updateCurrentUser(this.userId, this.userProfile)
      .subscribe((info) => this.userProfile = info);    
  }

  editTags(): void{
    this.hideOriginalTags = true;
    this.hideEditTags = false;
    if(this.changedTag === false){
      this.addedTagsArray = Array.from(this.originalTags);
    }
    this.changedTag = false;
  }

  deleteTagName(tagName: string): void{
    console.log('deleting!!')
    this.addedTagsArray = this.addedTagsArray.filter((tag) => tag !== tagName);
    console.log(this.addedTagsArray);
  }

  openAddTagsModal() {
    const modalRef = this.modalService.open(AddTagsModalComponent,  { windowClass : "addTagsModal"});
    modalRef.result.then((result) => result.map((tag) => this.addedTagsArray.push(tag)));
  }

  updateTagsInUserDoc(): void{
    this.hideEditTags = true;
    this.changedTag = true;
    this.getTagIdsArray().then((tagIdArray) => {
      console.log(`TAG ARRAY: ${tagIdArray}`);
      this.userService.updateTagInUser(this.userId, tagIdArray).subscribe((userInfo) => console.log(userInfo))
    });
    
  }

  async getTagIdsArray(){
    console.log('All Tags');
    console.log(this.addedTagsArray);
    let promArray = await this.addedTagsArray.map(async(tagName) => {
      tagName = tagName.trim();
        let index = this.allTagNames.indexOf(tagName);
        if(index !== -1){
          return this.allTagIds[index];
        }else{
          this.tagDoc = {
            name: tagName,
            item: []
          };
          let newTagId = await this.userService.CreateTag(this.tagDoc).toPromise();
          return newTagId;
        }
    });
    console.log(promArray);
    let newTagArray = Promise.all(promArray).then((v) => v);
    console.log(newTagArray);
    return newTagArray;
  }

  userTagNames(tagName: string): Set<any>{
    this.originalTags.add(tagName);
    //console.log(Array.from(this.addedTagsArray));
    return this.originalTags;
    //this.addedTagsArray.add(tag.name);
    //console.log(this.addedTagsArray);
  }
}
