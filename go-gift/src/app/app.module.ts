import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'; // <--NgModel lives here
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import {UserService} from './user.service';
import { FriendComponent } from './friend/friend.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
      ],
  
  declarations: [
    AppComponent,
    UsersComponent,
    MessagesComponent,
    DashboardComponent,
    FriendComponent,
    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
