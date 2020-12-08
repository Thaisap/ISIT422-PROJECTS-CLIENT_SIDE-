import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { ProfileWithImg } from '../Profile';
import { UserService } from '../user.service';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.css']
})
export class FriendProfileComponent implements OnInit {
  friendId: string;
  friendProfile: ProfileWithImg;
  friendImageData: any;

  constructor(public router: Router, public userService: UserService, private location: Location) {
    const navigation = this.router.getCurrentNavigation();
    const navState = navigation.extras.state;
    if(navState == null){
      this.friendId = localStorage.getItem('friendId');
    }else{
      this.friendId = navState.friendId;
    }
  }

  ngOnInit(): void {
    this.getFriendProfile(this.friendId);
  }

  getFriendProfile(friendId: string): void{
    this.userService.getUserWithImg(friendId).subscribe((friendProfile) => {
      this.friendProfile = friendProfile
      if(friendProfile.profileImg !== null){
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(friendProfile.profileImg.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        let bufferData = window.btoa(binary);
        console.log(bufferData);
        this.friendImageData = `data:${friendProfile.profileImg.contentType};base64,${bufferData}`;  
      }
    });
  }

  saveFriendId(friendId: string): void{
    // localStorage.setItem('friendId', friendId);
    localStorage.removeItem('friendId');
    localStorage.setItem('friendId', friendId);
  }

  back():void{
    this.location.back();
  }
}
