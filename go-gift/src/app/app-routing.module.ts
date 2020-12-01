import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { FindFriendsPageComponent } from './find-friends-page/find-friends-page.component';
import { SearchGiftPageComponent } from './search-gift-page/search-gift-page.component';
import { DisplayWishlistPageComponent } from './display-wishlist-page/display-wishlist-page.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CreateWishlistItemComponent } from './create-wishlist-item/create-wishlist-item.component';
import { SignupComponent} from './signup/signup.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TagResultComponent } from './tag-result/tag-result.component';
import { FriendWishlistComponent } from './friend-wishlist/friend-wishlist.component';

const routes: Routes = [
  {path: '', component:LoginComponent, pathMatch:'full'}, 
  //{path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'main', component: NavigationComponent,
    children: [
      {path: 'welcome', component: WelcomePageComponent},
      {path: 'profile', component: ProfilePageComponent},
      {path: 'find-friends', component:FindFriendsPageComponent},
      {path: 'search', component: SearchGiftPageComponent},
      {path: 'search/:term', component: TagResultComponent},
      {path: 'display-wishlist', component: DisplayWishlistPageComponent},
      {path: 'create-wishlist', component: CreateWishlistItemComponent},
    ]
  },
  {path: 'search/:term', component: TagResultComponent},
  {path: 'friend-wishlist', component: FriendWishlistComponent},
  {path: 'login', component: LoginComponent}  ,
  {path: 'create-account', component: CreateAccountComponent},
  {path: 'signup', component: SignupComponent},
];



@NgModule({
  
  imports: [
    RouterModule.forRoot(routes)],
    exports:[RouterModule]
  
})
export class AppRoutingModule { }
