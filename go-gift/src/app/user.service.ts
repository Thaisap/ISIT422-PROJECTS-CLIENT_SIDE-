import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {User} from './user';
import {MessageService} from './message.service';
import { Profile, ProfileWithImg } from './Profile';
import {tag, WriteTagDoc} from './tag';
import {allTags} from './allTags';
import { Item, WriteItemDoc } from './item';
import {Credentials} from './credentials'



@Injectable({
  providedIn: 'root',
})

export class UserService {
//item = [] ;

//private usersUrl = 'api/users'; //ULR to web api

  httpOptions = {headers: new HttpHeaders ({'Content-Type': 'application/json'})
};

  constructor( private http: HttpClient, private messageService: MessageService) { }

CreateProfile(body:Profile) : Observable<Profile> {
  return this.http.post<Profile> ('http://localhost:3000/profile', body, this.httpOptions);
}

submitRegister(body: any){
  return this.http.post('http://localhost:3000/usercredential/register', body,{
    observe:'body'
  });
}

// response will pass back Credentials object (token, email, gogift, credentialsId)
// Observable<T> and http.post<T>, the T has to match and will be the data type of the response
login(body: any): Observable<Credentials>{
  return this.http.post<Credentials>('http://localhost:3000/usercredential/login', body)
//  ,{  observe:'body'});
}

// response will pass back {gogift: value} so for Observable<T> and http.patch<T>, the T is Object
// we need to pass the following fields for calling the Express route
// body: this will have an object like this {accountId: newObjectId} [key needs to match what is in the credentials route in Express]
// id: this will be the credential id to locate the doc to update
credentials (body: any, id: string): Observable<Object>{
  return this.http.patch<Object>(`http://localhost:3000/usercredential/credentials/${id}`, body)
//  ,{  observe:'body'});
}

getUserName() {
  return this.http.get('http://localhost:3000/usercredential/username', {
    observe: 'body',
    params: new HttpParams().append('token', localStorage.getItem('token'))
  });
}

//Create Account Page: used to check all the tags currently in the tags collection
getAllTags() : Observable<allTags> {
  return this.http.get<allTags> ('http://localhost:3000/allTags');
}

//Create Account Page: used to create a new tag doc in the tag collection
CreateTag(body:WriteTagDoc) : Observable<string> {
  return this.http.post<string> ('http://localhost:3000/tag', body, this.httpOptions);
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
takeWishlist(id: string):Observable<Profile>{
  return this.http.get<Profile>(`http://localhost:3000/takeWishlist/${id}`);
}

deleteItemFromWislist(id: string):Observable<Profile>{
  return this.http.get<Profile>(`http://localhost:3000/deleteItemFromWislist/${id}`);
}

//Search Gifts Page: used to get a list of items based on tag name
getItemListByTagName(tagName: string): Observable<Item[]>{
  return this.http.get<Item[]>(`http://localhost:3000/itemsByTag/${tagName}`);
}

//Create Wishlist Item Page: used to create a new item in the item collection
createItem(body: WriteItemDoc) : Observable<string> {
  return this.http.post<string> ('http://localhost:3000/item', body, this.httpOptions);
}

//Create Wishlist Item Page: used to add newly created item to tag collection
addItemToTag(tagId: string, itemId: string): Observable<tag>{
  return this.http.patch<tag>(`http://localhost:3000/tag/${tagId}`, [itemId], this.httpOptions)
}

//Create Wishlist Item Page: used to add newly created item to user collection
addItemToUserWishlist(userId: string, itemId: string): Observable<Profile>{
  return this.http.patch<Profile>(`http://localhost:3000/profile/item/${userId}`, [itemId], this.httpOptions)
}

//Profile Page: update user's tags
updateTagInUser(userId: string, tagIds: string[]): Observable<Profile>{
  return this.http.patch<Profile>(`http://localhost:3000/profile/tag/${userId}`, tagIds, this.httpOptions);
}

createUserWithImg(body: FormData): Observable<ProfileWithImg>{
  return this.http.post<ProfileWithImg>('http://localhost:3000/profileWithImg', body)
}

getUserWithImg(userId: string): Observable<ProfileWithImg>{
  return this.http.get<ProfileWithImg>(`http://localhost:3000/profileWithImg/${userId}`);
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

