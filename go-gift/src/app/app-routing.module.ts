import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from './users/users.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FriendComponent} from './friend/friend.component';
const routes: Routes = [
  
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'user', component: UsersComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'friend', component:FriendComponent},
  //{path: 'detail/:id', component:UserDetailComponent},
  
];



@NgModule({
  
  imports: [
    RouterModule.forRoot(routes)],
    exports:[RouterModule]
  
})
export class AppRoutingModule { }
