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
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this._userservice.login(this.loginForm.value)
        .subscribe(
          data => {
            console.log(data);
            localStorage.setItem('token', data.token.toString());
          if (data.gogift == null) {
            this._router.navigateByUrl('/create-account', { state: { CrId: data.credId, email: data.email } });
  
              
          }
          else
          
            
            this._router.navigateByUrl('/welcome', {state: {userId: data.gogift}});
          },
          error => { }
        );
    }
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





