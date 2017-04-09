import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Rating } from './rating.model';

const RATINGS_FOR_URL = "/api/rating/for/";
const RATINGS_BY_URL = "/api/rating/by/";
const RATE_URL = "/api/rating/";

@Injectable()

export class RatingService {

    constructor(private http: Http) { }
    
    getRatingsFor(userId): Observable<Rating[]> {
        return this.http.get(RATINGS_FOR_URL + userId).map((res: Response) => {
            
            const obj = res.json();
            
            if (obj) {
                return obj;
            } else {
                return null;
            }
            
        }).catch(this.handleError);  
    }
    
    /*public rate(rating: Rating): Observable<Rating> {
        this.http.post(RATE_URL, rating).map((res: Response) => {
            
            
            
        }).catch(());
    }
    
    public getRatingsBy(userId: string) {
        
    }
    
    public updateUser(user: User) {
        
        return this.http.post(UPDATE_URL, user).map((res: Response) => {
            return res.json();
        }).catch(this.handleError);
        
    }*/
    
    
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
