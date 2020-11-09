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
  constructor(private userService: UserService) { this.email = ''; }

  ngOnInit(): void {

    this.getFriendInfo();
  }

  getFriendInfo(): void {
    this.userService.getFriendInfo()
    .subscribe(users => this.friend = users);
  }
  onSearch(value: string) { this.email = value; }
}
