import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { NavComponent } from './shared/nav/nav.component';
import { SearchComponent } from './shared/search/search.component';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { EditprofileComponent } from './shared/editprofile/editprofile.component';
import { RatingComponent } from './shared/rating/rating.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavComponent,
    SearchComponent,
    LoginComponent,
    SignupComponent,
    EditprofileComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
