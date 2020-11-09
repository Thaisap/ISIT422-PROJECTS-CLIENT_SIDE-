import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import { UserService } from '../user.service';
import {allTags} from '../allTags';
import { Profile } from '../Profile';

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

  constructor(private userService: UserService) {  }

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

//OldCode 
 /*  getUserInfo(): void{
    this.userService.getUserInfo()
    .subscribe(users => this.user = users);
  } */

/* getallTags(): void{
    this.userService.GetallTags()
    .subscribe(allTags => this.allTags = allTags);
  }
 */
}
