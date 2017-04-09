import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RatingService } from '../shared/rating/rating.service';
import { Rating } from '../shared/rating/rating.model';
import { UserService } from '../shared/user/user.service';
import { User } from '../shared/user/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ RatingService ]
})

export class ProfileComponent implements OnInit {
  public user: User;
  public ratingsFor: Rating[];
  public paramsSub: any;
  public errorMsg: string;
  
  constructor(private userService: UserService, 
              private ratingService: RatingService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.getUser();
    
  }
  
  private getUser(): void {
    
    this.paramsSub = this.activatedRoute.params.subscribe(params => {
        
        let username = params['username'];
        
        this.userService.getUser(username).subscribe(user => {
            if (user) {
              this.user = user;
              this.getRatings();
            } else {
              this.errorMsg = "User Profile not found.";
            }
          }, 
          this.handleError
        );
      
      }, 
      
      this.handleError
    );
    
  }
  
  private getRatings(): void {
    
    this.ratingService.getRatingsFor(this.user._id).subscribe(ratings => {
      if (ratings) {
        this.ratingsFor = ratings;
      } else {
        this.errorMsg = "Unable to retrieve ratings for user.";
      }
    });
    
  }
  
  handleError(error): void {
    //console.error(error);
    this.errorMsg = "Error occured while loading user profile.";
  }

}
