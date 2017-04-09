import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { User } from './user.model';

const USER_URL = "/api/user/";
const LOGIN_URL = "/api/user/login/";
const AUTH_URL = "/api/user/auth/";
const SIGNUP_URL = "/api/user/signup/";
const UPDATE_URL = "/api/user/update/";

@Injectable()
export class UserService {

  private userSource: BehaviorSubject<User>;
  private userLoginSource: BehaviorSubject<User>;
  private userLogoutSource: BehaviorSubject<User>;
  public user;
  public userLogin;
  public userLogout;

  constructor(private http: Http) {
    this.userSource = new BehaviorSubject<User>(null);
    this.userLoginSource = new BehaviorSubject<User>(null);
	this.userLogoutSource = new BehaviorSubject<User>(null);
    
    this.user = this.userSource.asObservable();
	this.userLogin = this.userLoginSource.asObservable();
    this.userLogout = this.userLogoutSource.asObservable();
      
  }
  
	public login(username: string, password: string): Observable<User> {

		const payload = {
			username: username,
			password: password
		};

		return this.http.post(LOGIN_URL, payload).map((res: Response) => {
		    const user = this.extractUser(res);
		    
		    if (user) {
		        console.log("Got user: ", user);
		        
		        this.userLoginSource.next(user);
		    }
		    
		}).catch(this.handleError);
	}
	
    public signup(firstName: string, lastName: string, username: string, password: string, confirmPassword: string): Observable<User> {
      
        const payload = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            confirmPassword: confirmPassword
        };
        
        return this.http.post(SIGNUP_URL, payload).map(this.extractUser).catch(this.handleError);
      
    }
    
    public getUser(username: string) {
      
      return this.http.get(USER_URL + "/" + username).map((res: Response) => {
         const jsonUser = res.json();
         console.log("Got user:", jsonUser);
         return jsonUser;
      }).catch(this.handleError);
      
    }
    
    public updateUser(user: User) {
        
        return this.http.post(UPDATE_URL, user).map((res: Response) => {
            return res.json();
        }).catch(this.handleError);
        
    }
    
    public auth() {
      return this.http.get(AUTH_URL).map(this.extractUser.bind(this)).catch(this.handleError);
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
		
		console.error("Error in UserService: ", errMsg);
        return Observable.throw(errMsg);
    }

    private extractUser(res: Response): User {
    	const user = res.json();

        if (user) {
            //this.userLoginSource.next(user);
            return user;            
        } else { 
            return null;
        } 

    }

}
