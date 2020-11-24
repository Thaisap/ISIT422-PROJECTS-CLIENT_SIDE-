import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {Profile} from '../Profile';
import {UserService} from '../user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-find-friends-page',
  templateUrl: './find-friends-page.component.html',
  styleUrls: ['./find-friends-page.component.css']  
})
export class FindFriendsPageComponent implements OnInit {


  friend: User[];
  email:string;
  selectedUser: Profile;
  showMain: boolean;
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
    if(value.length==0){
      this.getFriendInfo();
    } else {
      this.userService.getFriendByEmail(value).subscribe(user => {
        this.friend = [];
        this.friend.push(user);
      });
    }
  }
  sendInvite(email: string): void{
    let mail = `mailto:${email}?subject=` + 'Hey ! Come Join me with this cool app!' +
               '&body= Hey! I found this cool app. Come Join me!' ;
    window.open(mail);
  }
  getCurrentUser(id: string):void{
    this.showMain = !this.showMain;
    this.userService.getCurrentUser(id).subscribe(profile => {
      this.selectedUser = profile;
    });
  }
}
