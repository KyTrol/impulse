import { NgModule, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { SignupComponent } from './shared/signup/signup.component';
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',
      component: HomeComponent,
      children: [
        { path: '', component: SignupComponent, pathMatch: 'full' },
        { path: 'signup', component: SignupComponent },
        { path: 'login', component: LoginComponent }
      ]
    },
    { path: 'profile/:username', component: ProfileComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
