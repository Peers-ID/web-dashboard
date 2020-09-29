import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService ,TokenService} from '@app/core';
@Injectable()
export class AuthGuard implements CanActivate , CanLoad{
  constructor(
    private authService: AuthService,
    private router: Router,
    private token : TokenService
  ) {
  }

  
  canLoad(): boolean {        
    if (this.authService.isSignedIn() && localStorage.getItem('currentUser') !== null)
      return true;
    else {
      // this.router.navigate(['login']);
      this.token.removeToken()
      return false;
    }
  }


  canActivate(): boolean {
    if (this.authService.isSignedIn() && localStorage.getItem('currentUser') !== null)
      return true;
    else {
      this.token.removeToken()
      this.router.navigate(['login']);
      return false;
    }
  }
}
