import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../css/form.shared.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted = false;
  public errorMsg: string;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit(values): void {
    console.log(values);
    console.log('Submitting..', this.loginForm.value.username, this.loginForm.value.password);

    this.userService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(console.log, this.handleAuthError);
  }

  handleAuthError(err): void {
    console.log('Failed to login.', err);
    this.errorMsg = 'Username or password is invalid';
  }

}
