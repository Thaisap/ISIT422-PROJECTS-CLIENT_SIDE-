import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { FindFriendsPageComponent } from './find-friends-page/find-friends-page.component';
import { SearchGiftPageComponent } from './search-gift-page/search-gift-page.component';
import { DisplayWishlistPageComponent } from './display-wishlist-page/display-wishlist-page.component';

const routes: Routes = [
  
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'profile', component: ProfilePageComponent},
  {path: 'find-friends', component:FindFriendsPageComponent},
  {path: 'search', component: SearchGiftPageComponent},
  {path: 'display-wishlist', component: DisplayWishlistPageComponent},  
];



@NgModule({
  
  imports: [
    RouterModule.forRoot(routes)],
    exports:[RouterModule]
  
})
export class AppRoutingModule { }
