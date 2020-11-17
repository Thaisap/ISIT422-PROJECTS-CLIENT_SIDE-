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
  userProfile: Profile;
  hideDisplay: boolean = false;
  hideProfile: boolean = true;
  hideEditProfile: boolean = true;
  //updatedProfile: Profile;
  //user: User;
  //allTags: allTags;

  constructor(private userService: UserService, private modalService: NgbModal) {  }

  ngOnInit() {
    this.getProfile('5f9725288c008df2d8d1c241');
    //OldCode  this.getUserInfo();
    //this.getallTags();
 
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
    console.log("EDIT Tags");
  }

  openAddTagsModal() {
    const modalRef = this.modalService.open(AddTagsModalComponent);
    modalRef.result.then((result) => console.log(result), (reason) => console.log(reason));
  }

  addItemToUserWishlist() : void{
    this.hideDisplay = false;
    this.userService.updateCurrentUser('5f9725288c008df2d8d1c241', this.userProfile)
      .subscribe((info) => this.userProfile = info);
 
  }

/* getallTags(): void{
    this.userService.GetallTags()
    .subscribe(allTags => this.allTags = allTags);
  }
 */
}
