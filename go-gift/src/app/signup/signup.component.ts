import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast } from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  showToast: boolean = false;

  myForm: FormGroup;
  successMessage: String = '';

  constructor(private _userservice: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { 
      this.myForm = new FormGroup({
        email: new FormControl(null, Validators.email),
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
        cnfpass: new FormControl(null, this.passValidator)
  
    });

    this.myForm.controls.password.valueChanges
      .subscribe(
        x => this.myForm.controls.cnfpass.updateValueAndValidity()
      );
    }

  ngOnInit(): void {
  }



  isValid(controlName) {
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }

    return null;
  }

  register() {
//    console.log(this.myForm.value);

    if (this.myForm.valid) {
      this._userservice.submitRegister(this.myForm.value)
        .subscribe(
          data => this.showToast = true,
          error => this.showToast = false
          
        );
    }
  }

  movetologin() {
    this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
  }
}
