import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {Profile} from '../Profile';
import {UserService} from '../user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { EmailDoc } from '../item';

@Component({
  selector: 'app-find-friends-page',
  templateUrl: './find-friends-page.component.html',
  styleUrls: ['./find-friends-page.component.css']  
})
export class FindFriendsPageComponent implements OnInit {


  friend: User[];
  email:string;
  selectedUser: Profile;
  searchResult: User;
  showMain: boolean;
  emailItem: EmailDoc;
  retMsg: any;
  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getFriendInfo();
    this.showMain = true;
  }

  getFriendInfo(): void {
    this.userService.getFriendListById("5f9725288c008df2d8d1c241").subscribe(users => this.friend = users);
  }
  openModal(content): void {
    this.modalService.open(content);
  }
  onSearch(value: string) { 
      this.userService.getFriendByEmail(value).subscribe(user => this.searchResult = user);
  }
  sendInvite(email: string): void{
    this.retMsg = null;
    const emailItem ={to: email};
    this.userService.sendFriendEmail(emailItem).subscribe(msg => this.retMsg = msg);
  }
  getCurrentUser(id: string):void{
    this.showMain = !this.showMain;
    this.userService.getCurrentUser(id).subscribe(profile => {
      this.selectedUser = profile;
    });
  }
}
