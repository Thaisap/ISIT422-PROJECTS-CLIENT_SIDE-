import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-find-friends-page',
  templateUrl: './find-friends-page.component.html',
  styleUrls: ['./find-friends-page.component.css']
})
export class FindFriendsPageComponent implements OnInit {


  friend: User[];
  email:string;
  oFriends: User[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getFriendInfo();
  }

  getFriendInfo(): void {
    this.userService.getFriendInfo().subscribe(users => {
      this.oFriends = users;
      this.friend = this.oFriends;
    });
  }

  onSearch(value: string) { 
    this.friend = this.oFriends.filter(user => user.email.includes(value));
  }
}
