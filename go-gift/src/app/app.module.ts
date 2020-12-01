import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { LoginComponent } from './login/login.component';
import {SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider} from 'angularx-social-login';
import { SignupComponent } from './signup/signup.component';
import { RemovableChipComponent } from './removable-chip/removable-chip.component';
import { AddChipComponent } from './add-chip/add-chip.component';
import { AddTagsModalComponent } from './add-tags-modal/add-tags-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TagsAutocompleteComponent } from './tags-autocomplete/tags-autocomplete.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ItemCardComponent } from './item-card/item-card.component';
import { CreateWishlistItemComponent } from './create-wishlist-item/create-wishlist-item.component';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TagResultComponent } from './tag-result/tag-result.component';
import { FriendWishlistComponent } from './friend-wishlist/friend-wishlist.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    SocialLoginModule,
    NoopAnimationsModule,
    MatCardModule,
    ToastModule
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
    LoginComponent,
    SignupComponent,
    RemovableChipComponent,
    AddChipComponent,
    AddTagsModalComponent,
    TagsAutocompleteComponent,
    ItemCardComponent,
    CreateWishlistItemComponent,
    WelcomePageComponent,
    TagResultComponent,
    FriendWishlistComponent,  
  ],
  providers:[
    UserService,
    NgbActiveModal, {

    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('467762279715-rlf8q5drct208rsqki0g90d2otngm1nj.apps.googleusercontent.com')
      }
    ]
    } as SocialAuthServiceConfig,
  },
  
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
