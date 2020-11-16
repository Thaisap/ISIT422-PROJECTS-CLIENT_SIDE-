import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import { UserService } from '../user.service';
import {allTags} from '../allTags';
import { Profile } from '../Profile';
import { AddTagsModalComponent } from '../add-tags-modal/add-tags-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {
  userId: string;
  userProfile?: Profile;
  hideDisplay: boolean = false;
  hideProfile: boolean = true;
  hideEditProfile: boolean = true;
  //updatedProfile: Profile;
  //user: User;
  //allTags: allTags;
  addedTagsArray = new Set();
  hideEditTags: boolean = true;

  constructor(private userService: UserService, private modalService: NgbModal) {  }

  ngOnInit() {
    this.getProfile('5f9725288c008df2d8d1c241');
  }
  
  getProfile(id: string): void{
    this.userService.getCurrentUser(id)
      .subscribe( (info) => this.userProfile = info );
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
    this.userService.updateCurrentUser('5f9725288c008df2d8d1c241', this.userProfile)
      .subscribe((info) => this.userProfile = info);    
  }

  editBio(): void{
    this.hideDisplay = true;
    console.log("EDIT BIO");
  }

  updateBio(): void{
    this.hideDisplay = false;
    this.userService.updateCurrentUser('5f9725288c008df2d8d1c241', this.userProfile)
      .subscribe((info) => this.userProfile = info);    
  }

  editTags(): void{
    this.hideEditTags = false;
  }

  deleteTagName(tagName: string): void{
    this.addedTagsArray.delete(tagName);

  }

  openAddTagsModal() {
    const modalRef = this.modalService.open(AddTagsModalComponent,  { windowClass : "addTagsModal"});
    modalRef.result.then((result) => result.map((tag) => this.addedTagsArray.add(tag)));
  }

  updateTags(): void{
    this.hideEditTags = true;
    console.log(this.addedTagsArray);
    
  } 

  userTagNames(tagName: string): Set<any>{
    this.addedTagsArray.add(tagName);
    //console.log(Array.from(this.addedTagsArray));
    return this.addedTagsArray;
    //this.addedTagsArray.add(tag.name);
    //console.log(this.addedTagsArray);
  }

/* getallTags(): void{
    this.userService.GetallTags()
    .subscribe(allTags => this.allTags = allTags);
  }
 */
}
