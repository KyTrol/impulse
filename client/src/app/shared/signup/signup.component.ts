import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../css/form.shared.scss']
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted: boolean = false;
  
  constructor(private formBuilder: FormBuilder) {
    this.signupForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

}
