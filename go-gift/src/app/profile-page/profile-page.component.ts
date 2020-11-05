import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {


  user: User;

  constructor(private userService: UserService) {  }

  ngOnInit() {

    this.getUserInfo();
 
  }
  

  getUserInfo(): void{
    this.userService.getUserInfo()
    .subscribe(users => this.user = users);
  }

}
