import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpResponse, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '@env/environment';

import { TokenService } from '@app/core/token.service';
import { AuthService } from '@app/core/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {
  private apiBaseUrl: string;
  private isBrowser: boolean;
  isMaintenance: boolean;
  isUnderMaintenancePage: boolean;
  constructor(
    private token: TokenService,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any) {
    this.apiBaseUrl = environment.apiUrl;
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isMaintenance = false;
    this.isUnderMaintenancePage = false;
  }

  ngOnInit(): void {
    this.token.getToken();
  }
  setUrl(url: string): void {
    this.apiBaseUrl = url;
  }
  getBaseUrlAPI(): string {
    return this.apiBaseUrl;
  }
  apiUrl(url: string): string {
    if (url.includes('+'))
      url = url.replace(/\+/g, '%2B');
    return `${this.apiBaseUrl}/${url}`;
  }
  getData(url: string, params = {}, header?: any): Observable<any> {
    return new Observable(observer => {
      if (!this.isUnderMaintenancePage) {
        const httpParams = new HttpParams();
        for (const key in params) if (params.hasOwnProperty(key)) httpParams.set(key, params[key]);
        let headerData = this.makeHeaders(this.header());
        if (header) {
          if (!this.header()) {
            headerData = this.makeHeaders(header);
          } else {
            const tempHeaders = this.header();
            for (const key in header) {
              if (header.hasOwnProperty(key)) {
                tempHeaders[key] = header[key];
              }
            }
            headerData = this.makeHeaders(tempHeaders);
          }
        }
        const getUrl = url.includes('http') ? url : this.apiUrl(url);
        this.http.get(getUrl, {
          headers: headerData,
          observe: 'response',
          params: httpParams
        }).subscribe(
          res => {
            this.revokeMaintenanceMode();
            this.setCookie(res.body);
            observer.next(res.body);
            // observer.unsubscribe();
          },
          (err: HttpErrorResponse) => {
            this.handleError(err);
            observer.error(err);
            // observer.unsubscribe();
          },
          () => {
            observer.complete();
          }
        );
      } else {
        observer.complete();
        // observer.unsubscribe();
      }
    });
  }
  postData(url: string, body = '', header?: any): Observable<any> {           
      return new Observable(observer => {
        let headerData = this.makeHeaders(this.header());
        if (header) {
          if (!this.header()) {
            headerData = this.makeHeaders(header);
          } else {
            const tempHeaders = this.header();
            for (const key in header) {
              if (header.hasOwnProperty(key)) {
                tempHeaders[key] = header[key];
              }
            }
            headerData = this.makeHeaders(tempHeaders);
          }
        }
        const postUrl = url.includes('http') ? url : this.apiUrl(url);
        this.http.post(postUrl, body, {
          headers: headerData,
          observe: 'response'
        }).subscribe(
          res => {
            this.revokeMaintenanceMode();
            this.setCookie(res.body);
            observer.next(res.body);
          },
          (err: HttpErrorResponse) => {
            this.handleError(err);
            observer.error(err);
          },
          () => {
            observer.complete();
          }
        );
      });
  }
  postformData(url: string, body = ''): Observable<any> {           
    return new Observable(observer => {
      let headerData = new HttpHeaders({
        'Authorization':`Bearer ${this.token.getToken()}`
      }) 
      const postUrl = url.includes('http') ? url : this.apiUrl(url);
      this.http.post(postUrl, body, {
        headers: headerData,
        observe: 'response'
      }).subscribe(
        res => {
          this.revokeMaintenanceMode();
          this.setCookie(res.body);
          observer.next(res.body);
        },
        (err: HttpErrorResponse) => {
          this.handleError(err);
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      );
    });
  }
  updateformData(url: string, body = ''): Observable<any> {           
    return new Observable(observer => {
      let headerData = new HttpHeaders({
        'Authorization':`Bearer ${this.token.getToken()}`
      }) 
      const postUrl = url.includes('http') ? url : this.apiUrl(url);
      this.http.put(postUrl, body, {
        headers: headerData,
        observe: 'response'
      }).subscribe(
        res => {
          this.revokeMaintenanceMode();
          this.setCookie(res.body);
          observer.next(res.body);
        },
        (err: HttpErrorResponse) => {
          this.handleError(err);
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      );
    });
  }
  updateData(url: string, body = '', header?: any): Observable<any> {           
    return new Observable(observer => {
      let headerData = this.makeHeaders(this.header());
      if (header) {
        if (!this.header()) {
          headerData = this.makeHeaders(header);
        } else {
          const tempHeaders = this.header();
          for (const key in header) {
            if (header.hasOwnProperty(key)) {
              tempHeaders[key] = header[key];
            }
          }
          headerData = this.makeHeaders(tempHeaders);
        }
      }
      const postUrl = url.includes('http') ? url : this.apiUrl(url);
      this.http.put(postUrl, body, {
        headers: headerData,
        observe: 'response'
      }).subscribe(
        res => {
          this.revokeMaintenanceMode();
          this.setCookie(res.body);
          observer.next(res.body);
        },
        (err: HttpErrorResponse) => {
          this.handleError(err);
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      );
    });
  }
  setCookie(result: any): void {
    if (this.isBrowser && result && result.status === 'success' && result.token)
      this.token.setToken(result.token);
  }

  handleError(err: HttpErrorResponse): void {
    switch (err.status) {
      case 0:
        this.revokeMaintenanceMode();
        break;
        case 401:
        this.revokeMaintenanceMode();
        if (this.auth.isSignedIn() && err.statusText == "Unauthorized") {
          this.auth.signOut();
          this.router.navigate(['login'], { queryParams: { redirect: 'back' } });
        }
        break;
      case 503:
        // internal server error
        break;  
      case 500:
        // server request time out
        break;
      default: this.revokeMaintenanceMode();
    }
  }

  revokeMaintenanceMode(): void {
    if (this.isMaintenance) this.isMaintenance = false;
  }

  header(): any {
    const header: any = {
      "content-type": "application/json",
    };
    if (this.token.getToken()) header.authorization = `Bearer ${this.token.getToken()}`;
    return header;
  }

  makeHeaders(headerObject: any): HttpHeaders {
    const tempHeader = this.header();
    for (const key in headerObject) {
      if (headerObject.hasOwnProperty(key)) tempHeader[key] = headerObject[key];
    }
    const headers = new HttpHeaders(tempHeader);
    return headers;
  }
}
