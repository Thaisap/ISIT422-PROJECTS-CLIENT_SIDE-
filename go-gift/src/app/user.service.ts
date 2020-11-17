import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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

  httpOptions = {headers: new HttpHeaders ({'Content-Type': 'application/json'})
};

  constructor( private http: HttpClient, private messageService: MessageService) { }

CreateProfile(body:Profile) : Observable<Profile> {
  return this.http.post<Profile> ('http://localhost:3000/profile', body, this.httpOptions);
}

login(body: any){
  return this.http.post('http://locahost:3000/users/login', body,{
    observe:'body'
  });
}

register(body: any){
  return this.http.post('http://locahost:3000/users/register', body,{
    observe:'body'
  });
}

getUserName(){
  return this.http.post('http://locahost:3000/users/username', {  
  observe:'body',
  params: new HttpParams().append('token', localStorage.getItem('token'))
  });
}

//Create Account Page: used to check all the tags currently in the tags collection
getAllTags() : Observable<allTags> {
  return this.http.get<allTags> ('http://localhost:3000/allTags');
}

//Create Account Page: used to create a new tag doc in the tag collection
CreateTag(body:tag) : Observable<tag> {
  return this.http.post<tag> ('http://localhost:3000/tag', body, this.httpOptions);
}

// Profile Page: used to populate data
getCurrentUser(id: string): Observable<Profile>{
  return this.http.get<Profile>(`http://localhost:3000/profile/${id}`);
}

// Profile Page: used to update profile
updateCurrentUser(id: string, body: Profile): Observable<Profile>{
  console.log(body);
  return this.http.patch<Profile>(`http://localhost:3000/profile/${id}`, body, this.httpOptions);
}

//Find Friends Page: used to get friend info based on email address
getFriendByEmail(email: string): Observable<User>{
  return this.http.get<User>(`http://localhost:3000/friend/${email}`);
}

//Find Friends Page: used to get a list of user's friends (id is user's id)
getFriendListById(id: string):Observable<User[]>{
  return this.http.get<User[]>(`http://localhost:3000/friends/${id}`);
}


////////////////////////////////////////////////////////////

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

