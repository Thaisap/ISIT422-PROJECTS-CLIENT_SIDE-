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

  email: string;
  showToast: boolean = false;
  editFriend: boolean = false;
  removeFriend: boolean = false;

  
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
    this.userService.friendUserData.subscribe((updatedFriendList) => {
      this.friendList = updatedFriendList;
      this.getFriendImageData();
    });
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
      //this.email = "";
  }

  addFriend(friendId: string): void{
    console.log(`Friend Id to Add: ${friendId}`);
    this.userService.addFriendToUserWithImg(this.userId, friendId).subscribe((updatedInfo) => {
      console.log(updatedInfo)
      this.showToast = true;
      this.userService.updateFriendListInfo(updatedInfo);
    });
  }

  updateFriend(): void{
    if(this.editFriend == false){
      this.editFriend = true;
    }else{
      this.editFriend = false;
    }
    
  }

  deleteFriend(friendId: string): void{
    this.removeFriend = true;
    console.log(friendId);
    this.userService.removeFriendFromUserWithImg(this.userId, friendId).subscribe((updatedInfo) => {
      console.log(updatedInfo)
      this.userService.updateFriendListInfo(updatedInfo);
    });
    this.editFriend = false;
  }

  sendInvite(email: string): void{
    this.retMsg = null;
    const emailItem ={to: email, sender: `${this.loggedInUser.firstName} ${this.loggedInUser.lastName}`};
    this.userService.sendFriendEmail(emailItem).subscribe(msg => this.retMsg = msg);
  }
  
  saveFriendId(friendId: string): void{
    // localStorage.setItem('friendId', friendId);
    localStorage.removeItem('friendId');
    localStorage.setItem('friendId', friendId);
  }
}
