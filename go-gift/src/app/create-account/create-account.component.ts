import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Profile} from '../Profile';
import {allTags} from '../allTags';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  account : Profile = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    profileImg:"",
    tag: [],
    wishlist: [],
    friend: []
}
getTags: allTags;



onSubmit(): void {
 
  console.log(this.account);
  //getting user input and comparing to the tags collection
//  this.account.tag;
 const L = this.account.tag[0].split(',');
 let dbTags =this.getTags.tags;
 let dbTIds =this.getTags.tagIds;
}


constructor(private userService: UserService) {  }

  ngOnInit(): void {
    this.getAlltags()
  }

  getAlltags () : void{
    this.userService.getAllTags()
    .subscribe( (info) => this.getTags = info );
 };
}
