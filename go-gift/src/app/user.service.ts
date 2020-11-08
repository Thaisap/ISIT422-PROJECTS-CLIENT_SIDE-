import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {User} from './user';
import {MessageService} from './message.service';
import { Profile } from './Profile';
import {tag} from './tag';
import {allTags} from './allTags';


@Injectable({
  providedIn: 'root',
})

export class UserService {


//private usersUrl = 'api/users'; //ULR to web api

  httpOptions = {headers: new HttpHeaders ({'Content-Type': 'application/jason'})
};

  constructor( private http: HttpClient, private messageService: MessageService) { }

/*  CreateProfile(body:Profile) : Observable<Profile> {
    return this.http.post<Profile> ('http://localhost:3000/profile' { title: 'Angular POST Request Example' }).subscribe(data => {
      this.AccountId = data.id;);
  }
  */
// Get users from the server
CreateTag(body:tag) : Observable<tag> {
  return this.http.post<tag> ('http://localhost:3000/tag',body);
}
GetallTags() : Observable<allTags> {
  return this.http.get<allTags> ('http://localhost:3000/allTags');
}


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

