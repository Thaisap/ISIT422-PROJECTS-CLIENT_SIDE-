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

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.getFriendInfo();
  }

  getFriendInfo(): void {
    this.userService.getFriendInfo()
    .subscribe(users => this.friend = users);
  }

}
