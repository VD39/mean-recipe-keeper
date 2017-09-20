import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { IUser } from "../../models/user.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  processing: boolean = false;
  error: boolean = false;
  errorMessage: string;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  disableForm() {
    this.loginForm.controls['email'].disable(); // Disable username field
    this.loginForm.controls['password'].disable(); // Disable password field
  }

  // Function to enable form
  enableForm() {
    this.loginForm.controls['email'].enable(); // Enable username field
    this.loginForm.controls['password'].enable(); // Enable password field
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required], // Email field
      password: ['', Validators.required] // Password field
    });
  }

  getUser() {
    return {
      email: this.loginForm.get('email').value, // Username input field
      password: this.loginForm.get('password').value // Password input field
    }
  }

  login() {
    this.processing = true;
    this.disableForm();
    const user: IUser = this.getUser();
    this.authenticationService.login(user).subscribe(
      (data) => {
        if (data.status === 'success') {
          this.processing = false;
          this.authenticationService.storeUserData(data.data.token);
          this.router.navigate([this.returnUrl]);
        }
      },
      (error) => {
        this.error = true;
        this.processing = false;
        this.errorMessage = error.message;
        this.enableForm();
      });
  }

}
