import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ProfileWithImg } from '../Profile';
import { AddTagsModalComponent } from '../add-tags-modal/add-tags-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WriteTagDoc } from '../tag';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {
  userId: string;
  imageData: any = "../../assets/white-seahorse-profile.png";
  userProfile?: ProfileWithImg;
  hideDisplay: boolean = false;
  hideProfile: boolean = true;
  hideEditProfile: boolean = true;
  addedTagsArray: string[] = [];
  hideEditTags: boolean = true;
  allTagNames: string[];
  allTagIds: string[];
  tagDoc: WriteTagDoc;
  tagIds: Promise<string[]>;
  originalTags: Set<string> = new Set();
  changedTag: boolean = false;
  hideOriginalTags: boolean = false;
  changedImageData: any;
  imageType: string;
  hideImage: boolean = true;
  hideEditImage: boolean = true;

  constructor(private userService: UserService, private modalService: NgbModal) {
    this.userService.loggedInUserAccount.subscribe((accountId) => {
      this.userId = accountId;
    });
  }

  ngOnInit() {
    if(this.userId == null){
      this.userId = localStorage.getItem('accountId');
    }
    this.getProfile(this.userId);
    this.getAllTags();
  }

  getProfile(id: string): void{
    this.userService.getUserWithImg(id)
      .subscribe( (info) => {
        if(info.profileImg !== null){
          let binary = '';
          let bytes = [].slice.call(new Uint8Array(info.profileImg.data.data));
          bytes.forEach((b) => binary += String.fromCharCode(b));
          let bufferData = window.btoa(binary);
          this.imageData = `data:${info.profileImg.contentType};base64,${bufferData}`;        
        }
        this.userProfile = info;      
      });
  }

  getAllTags(): void{
    this.userService.getAllTags()
    .subscribe(allTags => {
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

  openImage():void{
    if(this.hideImage){
      this.hideImage = false;
    }else{
      this.hideImage = true;
    }
  }

  editImage(): void{
    this.hideEditImage = false;
    this.changedImageData = this.imageData;
  }

  async onFileSelection(event){
    //Access the file object
    let imgFile = event.target.files[0];
    this.userProfile.profileImg = imgFile;
    this.imageType = imgFile.type;
    //Create preview image by getting the data url
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (e) => { 
      this.changedImageData = reader.result; 
    }
  }

  updateProfile(): void{
    this.hideEditProfile = true;
    let reqObj = {
      firstName: this.userProfile.firstName,
      lastName: this.userProfile.lastName,
      email: this.userProfile.email
    };
    this.userService.updatePersonalInfo(this.userId, reqObj)
      .subscribe((info) => {
        this.userProfile = info;
        this.userService.updateUserInfo(info);
      });    
  }

  updateImage():void{
    this.hideEditImage = true;
    let formData = new FormData();
    formData.append('profileImg', this.userProfile.profileImg);
    this.userService.updateProfilePicture(this.userId, formData).subscribe((newInfo) => {
      this.userProfile = newInfo
      this.userService.updateUserInfo(newInfo);

      //re-display profile image
      if(newInfo.profileImg !== null){
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(newInfo.profileImg.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        let bufferData = window.btoa(binary);
        this.imageData = `data:${newInfo.profileImg.contentType};base64,${bufferData}`;        
      }
    });
  }

  editBio(): void{
    this.hideDisplay = true;
  }

  updateBio(): void{
    this.hideDisplay = false;
    let reqObj = {
      bio: this.userProfile.bio
    };
    this.userService.updateBio(this.userId, reqObj)
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
    this.addedTagsArray = this.addedTagsArray.filter((tag) => tag !== tagName);
  }

  openAddTagsModal() {
    const modalRef = this.modalService.open(AddTagsModalComponent,  { windowClass : "addTagsModal"});
    modalRef.result.then((result) => result.map((tag) => this.addedTagsArray.push(tag)));
  }

  updateTagsInUserDoc(): void{
    this.hideEditTags = true;
    this.changedTag = true;
    this.getTagIdsArray().then((tagIdArray) => {
      this.userService.updateTagInUser(this.userId, tagIdArray).subscribe((userInfo) => console.log(userInfo))
    });
    
  }

  async getTagIdsArray(){
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
    let newTagArray = Promise.all(promArray).then((v) => v);
    return newTagArray;
  }

  userTagNames(tagName: string): Set<any>{
    this.originalTags.add(tagName);
    return this.originalTags;
  }
}
