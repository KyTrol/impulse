import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../css/form.shared.scss']
})

export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public submitted: boolean = false;
  public errorMsg: String;
  
  constructor(private userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
    });
  }
  
  signup(values) {
    
    this.userService.signup(values.firstName, values.lastName, values.username, values.password, values.confirmPassword)
        .subscribe(user => {
          console.log(user),
          this.handleSignInError
        });
    
  }
  
  handleSignInError(err): void {
    this.errorMsg = "Error occured while attempting to sign up.";
  }

}
