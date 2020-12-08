import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  user: SocialUser;
  loginForm: FormGroup;

  constructor(private authGService: SocialAuthService,
    private _userservice: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {

      this.loginForm = new FormGroup({
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
      });
     }

  ngOnInit() {
    this.authGService.authState.subscribe((user) => {
      this.user = user;
      
    });
    }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  login() {
//    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this._userservice.login(this.loginForm.value)
        .subscribe(
          data => {
    //        console.log(data);
            localStorage.setItem('token', data.token.toString());
          
     //     console.log(data.gogift == null);
          // need to check whether the user is a first time user or already has a gogift account
          // gogift will be null if they are first-time user  
          // else gogift will have ObjectId value from user collection
          if (data.gogift == null) {
            // create-account needs the credentialId (for updating credential doc) and email data (for inserting email field in user doc)
            // pass the data to the create-account page by setting navigation state so that create-account can have those data

            this._router.navigateByUrl('/create-account', { state: { CrId: data.credId, email: data.email, loginMethod: "jwt" } });              
          }else{
          
            // welcome page needs the gogift to know which doc to get in user collection
            // pass the data to the welcome page by setting navigation state so that welcome can have the data
            localStorage.setItem('accountId', data.gogift);
            this._router.navigateByUrl('/main/welcome', {state: {userId: data.gogift}});
          }
         },

          error => { }
        );
    }
  }
  

  googleLogin(){
    this.authGService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authGService.authState.subscribe((user)=> {
    this._userservice.postSocialLogin({username: user.name, email: user.email, image:user.photoUrl, gogift: null, googleId: user.id})
      .subscribe((res)=> {
  //      console.log(res)
    
   
        if (res['sucesss'] ){
            
        }
        if (res.usergData.gogift == null){
      this._router.navigateByUrl('/create-account', {state: { email: user.email, CrId: res.usergData._id, loginMethod: "google" }})
        }
        else{
       //   console.log()
          this._router.navigateByUrl('/main/welcome', {state: { userId: res.usergData.gogift} })
        }
//console.log(user)
      })
      
    })
  }
  

  movetoregister() {
    this._router.navigate(['../signup'], { relativeTo: this._activatedRoute });
  }


 
  signInWithGoogle(): void {
    this.authGService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 

 
  signOut(): void {
    this.authGService.signOut();
  }
 
}





