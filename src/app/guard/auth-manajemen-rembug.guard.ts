import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { isPlatformServer } from '@angular/common';

import { AuthService} from '@app/core';
import * as CryptoJS from 'crypto-js';
@Injectable()
export class AuthManajemenRembugGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>(observer => {
      if (this.authService.isSignedIn()) {
        let parselocalstorage = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'secret').toString(CryptoJS.enc.Utf8))        
        if (parselocalstorage.role !== 'Admin Peers'){
          if( parselocalstorage.access.mn_management_rembug === 1 || parselocalstorage.access === 'all')observer.next(true);
            else {
                observer.next(false); 
                this.router.navigate(['kinerja-koperasi'])
            }
        }else{
          observer.next(false);
          this.router.navigate(['kinerja-koperasi'])
        }
      }
    });
  }
}
