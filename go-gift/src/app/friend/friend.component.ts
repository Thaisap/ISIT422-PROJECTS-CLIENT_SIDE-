import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {


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
