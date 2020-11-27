import { Component, OnInit } from '@angular/core';
import { ProfileWithImg } from '../Profile';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  profileWithImg: ProfileWithImg;
  imageData: any;
  userId: string;
  constructor(private userService: UserService, public router: Router) {
    this.userService.loggedInUserAccount.subscribe((accountId) => {
      this.userId = accountId;
    });
  }

  ngOnInit(): void { 
    console.log(`UserID on Welcome Page: ${this.userId}`);
    if(this.userId == null){
      this.userId = localStorage.getItem('accountId');
    }
    this.getProfileWithImg(this.userId);
  }

  getProfileWithImg(userId: string): void{
    this.userService.getUserWithImg(userId).subscribe((userInfo) => {
      this.profileWithImg = userInfo;
    });
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('accountId');
    this.router.navigate(['login']);
  }

}
