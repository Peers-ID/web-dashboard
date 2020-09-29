import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from '@app/core/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  latestToken: string;
  constructor(
    private cookie: CookieService,
    private router: Router,
  ) {
    this.latestToken = this.getToken();
  }
  setToken(token: string): void {
    this.cookie.set('token', token, 1, '/');
    this.latestToken = token;
  }
  getToken(): string {
    return this.cookie.get('token');
  }
  removeToken(): void {
    this.cookie.set('token', '', -1);
    this.latestToken = '';
    this.router.navigate(['login']);
    localStorage.clear();
    setTimeout(() => {
      this.router.navigate(["/login"]);
    }, 100);
  }
}
