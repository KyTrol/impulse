import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs/Subscription";

import { UserService } from './shared/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public title = 'Impulse';
  private loginSub: Subscription;
  
  constructor(private userService: UserService, private router: Router) {}
  
  public ngOnInit() {
    
    this.loginSub = this.userService.userLogin.subscribe(user => {
        if (user)  {
         this.router.navigate(["/profile", user.username]);
        } else {
          console.log("Got login with no user...");
        }
      }, 
      console.error
    );
    
    console.log(this.loginSub);
    
  }
}
