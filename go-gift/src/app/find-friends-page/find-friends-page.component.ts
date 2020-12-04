import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {Profile, ProfileWithImg} from '../Profile';
import {UserService} from '../user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { EmailDoc } from '../item';

@Component({
  selector: 'app-find-friends-page',
  templateUrl: './find-friends-page.component.html',
  styleUrls: ['./find-friends-page.component.css']  
})
export class FindFriendsPageComponent implements OnInit {
  userId: string;
  friendList: ProfileWithImg[];
  friendImageData: any[];
  loggedInUser: ProfileWithImg;
  searchResult: ProfileWithImg;
  searched: boolean = false;
  searchedFriendImageData: any;

  selectedUser: Profile;
  showMain: boolean;
  emailItem: EmailDoc;
  retMsg: any;
  constructor(private userService: UserService, private modalService: NgbModal) {
    this.userService.loggedInUserAccount.subscribe((accountId) => {
      this.userId = accountId;
    });
  }

  ngOnInit(): void {
    if(this.userId == null){
      this.userId = localStorage.getItem('accountId');
    }
    this.getFriendList(this.userId);
    this.getAccountUser(this.userId);
    this.showMain = true;
  }

  getFriendList(userId: string): void {
    this.userService.getFriendListById(userId).subscribe(users => {
      this.friendList = users;
      this.getFriendImageData();
    });
  }

  getFriendImageData(): void{
    this.friendImageData = this.friendList.map((friend) => {
      if(friend.profileImg !== null){
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(friend.profileImg.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        let bufferData = window.btoa(binary);
        console.log(bufferData);
        return `data:${friend.profileImg.contentType};base64,${bufferData}`;        
      }
    });
    console.log(this.friendImageData);
  }

  getAccountUser(userId: string): void{
    this.userService.getUserWithImg(userId).subscribe((userInfo) => this.loggedInUser = userInfo);
  }

  openModal(content): void {
    this.modalService.open(content);
  }
  onSearch(value: string) { 
      this.userService.getFriendByEmail(value).subscribe(user => {
        this.searchResult = user
        if(user.profileImg !== null){
          let binary = '';
          let bytes = [].slice.call(new Uint8Array(user.profileImg.data.data));
          bytes.forEach((b) => binary += String.fromCharCode(b));
          let bufferData = window.btoa(binary);
          console.log(bufferData);
          this.searchedFriendImageData = `data:${user.profileImg.contentType};base64,${bufferData}`;        
        }
      });
      this.searched = true;
  }

  addFriend(friendId: string): void{
    console.log(`Friend Id to Add: ${friendId}`);
  }

  sendInvite(email: string): void{
    this.retMsg = null;
    const emailItem ={to: email, sender: `${this.loggedInUser.firstName} ${this.loggedInUser.lastName}`};
    this.userService.sendFriendEmail(emailItem).subscribe(msg => this.retMsg = msg);
  }
  getCurrentUser(id: string):void{
    this.showMain = !this.showMain;
    this.userService.getCurrentUser(id).subscribe(profile => {
      this.selectedUser = profile;
    });
  }

  saveFriendId(friendId: string): void{
    // localStorage.setItem('friendId', friendId);
    localStorage.setItem('friendId', '5fbd71a6620f1164e5a3142d');
  }
}
