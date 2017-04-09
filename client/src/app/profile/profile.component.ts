import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../shared/user/user.service';
import { User } from '../shared/user/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  public user: User;
  public userId: string;
  public paramsSub: any;
  public errorMsg: string;
  
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.paramsSub = this.activatedRoute.params.subscribe(params => {
        
        let username = params['username'];
        
        this.userService.getUser(username).subscribe(user => {
            if (user) {
              console.log("User found!");
              this.user = user;
            } else {
              console.log("No user found.");
              this.errorMsg = "User Profile not found.";
            }
          }, 
          this.handleError
        );
      
      }, 
      
      this.handleError
    );
    
  }
  
  handleError(error): void {
    //console.error(error);
    this.errorMsg = "Error occured while loading user profile.";
  }

}
