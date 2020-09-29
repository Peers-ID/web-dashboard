import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any
  ) {}
  
  get(name: string): string {
    if (isPlatformBrowser(this.platformId)) {
      const ca: Array<string> = document.cookie.split(';');
      const caLen: number = ca.length;
      const cookieName = `${name}=`;
      let c: string;
      for (let i = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) === 0) return c.substring(cookieName.length, c.length);
      }
      return '';
    } else return '';
  }

  set(name: string, value: string, expireDays: number, path = '/'): void {
    if (isPlatformBrowser(this.platformId)) {
      let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)};`;
      if (expireDays) {
        const dtExpires = new Date(new Date().getTime() + expireDays * 1000 * 60 * 60 * 24);
        cookieStr += `expires=${dtExpires.toUTCString()};`;
      }
      if (path) cookieStr += `path=${path};`;
      document.cookie = cookieStr;
    }
  }
}
