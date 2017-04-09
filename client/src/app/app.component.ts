import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './shared/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public title = 'Impulse';
  
  constructor(private userService: UserService, private router: Router) {}
  
  public ngOnInit() {
    
    this.userService.userLogin.subscribe(user => {
      if (user)  {
       this.router.navigate(["/profile", user.username]);
      } else {
        console.log("Got login with no user...");
      }
    }, 
    console.error
    )
    
  }
}
