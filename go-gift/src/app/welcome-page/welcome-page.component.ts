import { Component, OnInit } from '@angular/core';
import { ProfileWithImg } from '../Profile';
import { UserService } from '../user.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  profileWithImg: ProfileWithImg;
  imageData: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getProfileWithImg('5fba28a10d11dd3e71231000');
  }

  getProfileWithImg(userId: string): void{
    this.userService.getUserWithImg(userId).subscribe((userInfo) => {
      console.log(userInfo.profileImg);
      let binary = '';
      let bytes = [].slice.call(new Uint8Array(userInfo.profileImg.data.data));
      bytes.forEach((b) => binary += String.fromCharCode(b));
      let bufferData = window.btoa(binary);
      console.log(bufferData);
      this.imageData = `data:${userInfo.profileImg.contentType};base64,${bufferData}`;
      this.profileWithImg = userInfo;
    });
  }

}
