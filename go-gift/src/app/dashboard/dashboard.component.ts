import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

username= '';


  constructor( private userService:UserService,
    private _router: Router) {
      this.userService.getUserName()
      .subscribe(
        data => this.username = data.toString(),
        error => this._router.navigate(['login'])
      )
   
     }

  ngOnInit() {
  }

/*   logout(){
    localStorage.removeItem('token');
    this._router.navigate(['login']);
  } */

}
