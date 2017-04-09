import { Injectable } from '@angular/core';

import { Rating } from './rating.model';


@Injectable()

export class RatingService {

  constructor() { }
    
    rate() {
        
    }
    
    getRatingsBy(userId) {
        
    }
    
    getRatingsFor(userId) {
        
    }
    
    public updateUser(user: User) {
        
        return this.http.post(UPDATE_URL, user).map((res: Response) => {
            return res.json();
        }).catch(this.handleError);
        
    }
    
    
    private handleError(error: Response | any) {
        let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || "";
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		
		console.error("Error in RatingService: ", errMsg);
        return Observable.throw(errMsg);
    }
}
