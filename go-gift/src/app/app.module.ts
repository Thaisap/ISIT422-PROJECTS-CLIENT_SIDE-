import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {ReactiveFormsModule} from '@angular/forms'; // <--NgModel lives here
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
import { CreateAccountComponent } from './create-account/create-account.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
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
    CreateAccountComponent,  
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
