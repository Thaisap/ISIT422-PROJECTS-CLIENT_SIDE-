import { Component, OnInit } from '@angular/core';
import {User} from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // hero property
user: User = {
  id: 1,
  name: 'Thais'
};


  constructor() { }

  ngOnInit(): void {
  }

}
