import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'; // <--NgModel lives here
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import {UserService} from './user.service';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FindFriendsPageComponent } from './find-friends-page/find-friends-page.component';
import { SearchGiftPageComponent } from './search-gift-page/search-gift-page.component';
import { DisplayWishlistPageComponent } from './display-wishlist-page/display-wishlist-page.component';
import { HeaderEditComponent } from './header-edit/header-edit.component';
import { ModalComponent } from './modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  
  declarations: [
    AppComponent,
    MessagesComponent,
    DashboardComponent,
    NavigationComponent,
    ProfilePageComponent,
    FindFriendsPageComponent,
    SearchGiftPageComponent,
    DisplayWishlistPageComponent,
    HeaderEditComponent,
    ModalComponent,  
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
