import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProfileWithImg } from '../Profile';
import {allTags} from '../allTags';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  account: ProfileWithImg ={
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    profileImg:"",
    tag: [],
    wishlist: [],
    friend: []
    }

  hasImg: boolean = false;
  imagePath: any = "../../assets/white-seahorse-profile.png";

  constructor(private userService: UserService) {  }


  ngOnInit(): void {
  }

  async onFileSelection(event){
    //console.log(event.target.files);
    //Access the file object
    this.account.profileImg = event.target.files[0];
    
    //Create preview image by getting the data url
    //this.imagePath = await this.getImageDataUrl(event.target.files[0]);
    let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (e) => { 
        this.imagePath = reader.result; 
        this.hasImg = true;
      }
  }

  /* async getImageDataUrl(imageFile: any): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(imageFile); 
      reader.onload = (e) => { 
        resolve(reader.result); 
        //console.log(this.imagePath);
        this.hasImg = true;
      }
    });
  } */

  CreateProfile() : void{
    console.log(this.account);
    /* this.userService.CreateProfile(this.account)
    .subscribe( (info) => this.account = info );
 */
  };
 
}
