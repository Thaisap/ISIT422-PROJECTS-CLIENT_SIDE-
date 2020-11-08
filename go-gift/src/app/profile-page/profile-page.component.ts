import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import { UserService } from '../user.service';
import {allTags} from '../allTags';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {


  user: User;
  allTags: allTags;

  constructor(private userService: UserService) {  }

  ngOnInit() {

    this.getUserInfo();
    this.getallTags();
 
  }
  

  getUserInfo(): void{
    this.userService.getUserInfo()
    .subscribe(users => this.user = users);
  }
getallTags(): void{
    this.userService.GetallTags()
    .subscribe(allTags => this.allTags = allTags);
  }

}
