import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
