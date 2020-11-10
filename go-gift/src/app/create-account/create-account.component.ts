import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
accountForm= new FormGroup({
  firstName : new FormControl(''),
  lastName: new FormControl(''),
  EmailAddress : new FormControl(''),
  tags : new FormControl('')

});

onSubmit(): void {
  // TODO: Use EventEmitter with form value
  console.warn(this.accountForm.value);
  console.log('hello');
}

  constructor() { }

  ngOnInit(): void {
  }

}
