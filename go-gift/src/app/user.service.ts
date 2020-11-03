import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {User} from './user';
import {MessageService} from './message.service';


@Injectable({
  providedIn: 'root',
})

export class UserService {


//private usersUrl = 'api/users'; //ULR to web api

  httpOptions = {headers: new HttpHeaders ({'Content-Type': 'application/jason'})
};

  constructor( private http: HttpClient, private messageService: MessageService) { }

// Get users from the server

getUserInfo() : Observable<User> {
  return this.http.get<User> ('http://localhost:3000/getUserInfo');
}

getFriendInfo() : Observable<User[]> {
  return this.http.get<User[]> ('http://localhost:3000/getFriendInfo');
}

/* getUser(id: number): Observable<User>{
  return this.http.get<User>('http://localhost:3000/'+ id);
}
 *//*   getUser(id: number) : Observable<User> {
    //ToDO: send the message _after_ fetching the heroes
    this.messageService.add(`UserService: fetched heroes id=${id}`);
    return of(USERS.find(user => user.id === id));
  }
 */

private log(message:string) {
  this.messageService.add(`UserService: ${message}`);
}
}

