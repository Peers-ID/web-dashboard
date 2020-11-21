import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ContentService } from '@app/core/content.service';
import { TokenService } from '@app/core/token.service';
import { AuthService } from '@app/core/auth.service';
import { UserService } from '@app/core/user.service';
import { NotificationService } from './notification.service';
import * as CryptoJS from 'crypto-js';
@Injectable()
export class AccountService {
  lastAccountCheck: Date;
  configData: Array<any>;
  private accountInitStatus: boolean;
  private accountInitialized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private content: ContentService,
    private token: TokenService,
    private auth: AuthService,
    public user: UserService,
    private notification: NotificationService,
  ) {
    this.accountInitStatus = false;
    if (this.auth.isSignedIn() && !this.accountInitStatus) {
    }
  }

  isAccountInitialized(): boolean {
    return this.accountInitStatus;
  }

  obsAccountInitialized(): Observable<boolean> {
    return this.accountInitialized.asObservable();
  }


  login(data: any): Observable<boolean> {
    const obs = new Observable<any>(observer => {
      this.content.postLogin(data).subscribe(
        res => {
          if (res.data.token) {
            this.token.setToken(res.data.token);
            var datapost = {
              userId: res.data.user.id,
              fullname: res.data.user.fullname,
              email: res.data.user.email,
              token: res.data.token,
              role: res.data.user.role,
              koperasi_id: res.data.user.koperasi_id,
              access:res.data.myRole === null ? 'all' : res.data.myRole 
            }
            localStorage.setItem("currentUser",CryptoJS.AES.encrypt(JSON.stringify(datapost), 'secret').toString());
            this.auth.signIn(data.email);
            observer.next(true);
          } else {
            this.notification.addNotification({
              type: 'danger',
              body: res.message || 'Fail to login'
            });
            this.notification.setNotification(res.message, 'danger', 'modal', 2500);
            observer.next(false);
          }
        },
        err => {
          observer.next(false);
        }
      );
    });
    return obs;
  }
  forgotpassword(data: any): Observable<boolean> {
    const obs = new Observable<any>(observer => {
      this.content.postForgotPassword(data).subscribe(
        res => {
          if (res.status === 200 ||res.status === 201) {
            observer.next(true);
            this.notification.addNotification({
              type: 'success',
              head: 'Success',
              body: res.message
            });
          } else {
            this.notification.addNotification({
              type: 'danger',
              head: 'Danger',
              body: res.message
            });
            observer.next(false);
          }
        },
        err => {
          observer.next(false);
        }
      );
    });
    return obs;
  }
}
