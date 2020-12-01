import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ProfileWithImg } from '../Profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  userId: string;
  profileWithImg: ProfileWithImg;
  imageData: any = "../../assets/white-seahorse-profile.png";

  constructor(private userService: UserService, public router: Router) {
     //Usage: https://stackoverflow.com/questions/54891110/router-getcurrentnavigation-always-returns-null
     const navigation = this.router.getCurrentNavigation();
     const navState = navigation.extras.state;
       
     if(navState == null){
       this.userId = localStorage.getItem('accountId');
     }else{
       this.userId = navState.userId;
     }
     this.userService.userAccountChange(this.userId);
  }

  ngOnInit(): void {
    this.getProfileWithImg(this.userId);
    this.userService.userData.subscribe((updatedData) => {
      console.log(updatedData);
      this.profileWithImg = updatedData;
      if(updatedData.profileImg !== null){
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(updatedData.profileImg.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        let bufferData = window.btoa(binary);
        this.imageData = `data:${updatedData.profileImg.contentType};base64,${bufferData}`;        
      }
    });
  }

  getProfileWithImg(userId: string): void{
    this.userService.getUserWithImg(userId).subscribe((userInfo) => {
      console.log(userInfo.profileImg);
      //Usage: https://medium.com/@colinrlly/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed
      if(userInfo.profileImg !== null){
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(userInfo.profileImg.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        let bufferData = window.btoa(binary);
        this.imageData = `data:${userInfo.profileImg.contentType};base64,${bufferData}`;        
      }
      this.profileWithImg = userInfo;
    });
  }
}
