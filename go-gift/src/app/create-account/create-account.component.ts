import { Component, OnInit } from '@angular/core';
import { ProfileWithImg } from '../Profile';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTagsModalComponent } from '../add-tags-modal/add-tags-modal.component';

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
    friend: [],
    
  
    }
 crendentialId: string;
 email: string;
 loginMethod: String;

  hasImg: boolean = false;
  imagePath: any = "../../assets/white-seahorse-profile.png";
  imageType: string;
  addedTagsArray: string[] = [];
  allTagNames: string[];
  allTagIds: string[];

  constructor(private userService: UserService, private modalService: NgbModal, public router: Router) { 
    // get the data that was passed by login page
    // need to get it through the constructor or it'll be lost 
    // (see here to know why: https://stackoverflow.com/questions/54891110/router-getcurrentnavigation-always-returns-null)
    let navigation = this.router.getCurrentNavigation();
    let navigationState = navigation.extras.state;
    console.log(navigationState);
    this.crendentialId = navigationState.CrId;
    this.email = navigationState.email;
    this.loginMethod = navigationState.loginMethod;
   }


  ngOnInit(): void {
    this.getAllTags();
  }

  getAllTags(): void{
    this.userService.getAllTags()
    .subscribe(allTags => {
      console.log(allTags);
      [this.allTagNames = allTags.tags, this.allTagIds = allTags.tagIds];
    });
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

  openAddTagsModal() {
    const modalRef = this.modalService.open(AddTagsModalComponent,  { windowClass : "addTagsModal"});
    modalRef.result.then((result) => result.map((tag) => {
      console.log(tag);
      this.addedTagsArray.push(tag);
      console.log(this.addedTagsArray);
    }), (reason) => {
      this.addedTagsArray = [];
    });
  }

  async getTagIdsArray(){
    let promArray = await this.addedTagsArray.map(async(tagName) => {
      tagName = tagName.trim();
        let index = this.allTagNames.indexOf(tagName);
        if(index !== -1){
          return this.allTagIds[index];
        }else{
          let tagDoc = {
            name: tagName,
            item: []
          };
          let newTagId = await this.userService.CreateTag(tagDoc).toPromise();
          return newTagId;
        }
    });
    let newTagArray = Promise.all(promArray).then((v) => v);
    return newTagArray;
  }


  CreateProfile() : void{    
    let formData = new FormData();
    formData.append('firstName', this.account.firstName);
    formData.append('lastName', this.account.lastName);
    formData.append('email', this.email);
    formData.append('bio', this.account.bio);
    formData.append('profileImg', this.account.profileImg);
    this.getTagIdsArray().then((tagIdArray) => {
      formData.append('tag', JSON.stringify(tagIdArray));
      this.userService.createUserWithImg(formData).subscribe((newUser) => {
        console.log(newUser);
        // once the user is created in the user collection, update the doc in credentials
        // call the route with passed in information: credentialsId (from naviagtion state) and gogift (from the createUserWithImg)
        this.userService.credentials ({accountId: newUser._id, loginMethod: this.loginMethod}, this.crendentialId).
        subscribe (
          data=> console.log(data) // check to see if gogift value is updated
        )
        // pass the userId to the welcome page to get the correct doc in user collection
        this.router.navigateByUrl('/main/welcome', { state: { userId: newUser._id } });
      });
    });
  };
 
}
