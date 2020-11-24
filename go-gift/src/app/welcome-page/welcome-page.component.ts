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
    //Usage: https://stackoverflow.com/questions/54891110/router-getcurrentnavigation-always-returns-null
    const navigation = this.router.getCurrentNavigation();
    const navState = navigation.extras.state;
    this.userId = navState.userId;
  }

  ngOnInit(): void { 
    this.getProfileWithImg(this.userId);
  }

  getProfileWithImg(userId: string): void{
    this.userService.getUserWithImg(userId).subscribe((userInfo) => {
      console.log(userInfo.profileImg);
      //Usage: https://medium.com/@colinrlly/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed
      let binary = '';
      let bytes = [].slice.call(new Uint8Array(userInfo.profileImg.data.data));
      bytes.forEach((b) => binary += String.fromCharCode(b));
      let bufferData = window.btoa(binary);
      console.log(bufferData);
      this.imageData = `data:${userInfo.profileImg.contentType};base64,${bufferData}`;
      this.profileWithImg = userInfo;
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
