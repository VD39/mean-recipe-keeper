// Import dependencies
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

// Import services
import { AuthenticationService } from '../../services/authentication.service';

// Import interfaces
import { IUser, IResponse } from '../../interfaces';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private returnUrl: string; // return URL
  public loginForm: FormGroup; // Form group
  public errorMessage: string; // Error message
  public processing: boolean = false; // Processing set to false
  public error: boolean = false; // Error set to false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.createForm(); // Creates form
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'; // Set the return URL
  }

  /**
   * Disabled the form inputs.
   */
  disableForm(): void {
    this.loginForm.controls['email'].disable(); // Disable username field
    this.loginForm.controls['password'].disable(); // Disable password field
  }

  /**
   * Enables the form inputs.
   */
  enableForm(): void {
    this.loginForm.controls['email'].enable(); // Enable username field
    this.loginForm.controls['password'].enable(); // Enable password field
  }

  /**
   * Creates the form with fields.
   */
  createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required], // Email field
      password: ['', Validators.required] // Password field
    });
  }

  /**
   * Gets the values from the login form.
   */
  getUser(): IUser {
    return {
      email: this.loginForm.get('email').value, // Username input field
      password: this.loginForm.get('password').value // Password input field
    }; // Returns email and password
  }

  /**
   * Does the log action, and checks the users email and password.
   */
  login(): void {
    this.processing = true; // Set processing to true
    this.disableForm(); // Disable form
    const user: IUser = this.getUser(); // Get user data from form
    // Login the user with user data
    this.authenticationService.login(user).subscribe(
      (data: IResponse) => {
        if (data.status === 'success') {
          this.processing = false; // Set processing to false
          this.authenticationService.storeUserData(data.data.token); // Store the user data
          this.router.navigate([this.returnUrl]); // Navigate to the return URL
        }
      },
      (error: IResponse | any) => {
        this.error = true; // Set error to true
        this.processing = false; // Set processing to false
        this.errorMessage = error.message; // Set the error message
        this.enableForm(); // Enable the form
      });
  }
}
