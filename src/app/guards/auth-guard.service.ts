import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { AuthenticationService } from "../services/authentication.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiresLogin = route.data.requiresLogin || false;
    if (requiresLogin) {
      // Check that the user is logged in...
    }

    if (!this.authenticationService.isLoggedIn()) {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    return true;
  }
}
