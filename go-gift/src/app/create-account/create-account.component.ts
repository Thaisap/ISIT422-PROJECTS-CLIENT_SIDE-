import { Component, OnInit } from '@angular/core';
import { ProfileWithImg } from '../Profile';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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
  imageType: string;

  constructor(private userService: UserService, public router: Router) {  }


  ngOnInit(): void {
  }

  async onFileSelection(event){
    console.log(event.target.files[0]);
    //Access the file object
    let imgFile = event.target.files[0];
    this.account.profileImg = imgFile;
    this.imageType = imgFile.type;
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
    let formData = new FormData();
    formData.append('firstName', this.account.firstName);
    formData.append('lastName', this.account.lastName);
    formData.append('email', this.account.email);
    formData.append('bio', this.account.bio);
    formData.append('profileImg', this.account.profileImg);
    this.userService.createUserWithImg(formData).subscribe((newUser) => {
      console.log(newUser);
      this.router.navigateByUrl('/welcome', { state: { userId: newUser._id } });
    });
  };
 
}
