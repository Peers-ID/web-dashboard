import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserService } from '@app/core/user.service';
import { TokenService } from '@app/core/token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private status: boolean;
  private signedInStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private signedEmail: BehaviorSubject<any> = new BehaviorSubject<any>('');
  constructor(
    private userSvc: UserService,
    private tokenSvc: TokenService,
  ) { 
    this.status = this.tokenSvc.getToken() ? true : false;
    this.signedInStatus.next(this.status);
  }
  signIn(userEmail?: string): void {
    this.status = true;
    this.signedInStatus.next(this.status);    
    this.signedEmail.next(userEmail);    
  }

  signOut(): void {
    this.status = false;
    this.userSvc.clear();
    this.tokenSvc.removeToken();
    this.signedInStatus.next(this.status);
  }

  isSignedIn(): boolean {    
    return this.status;
  }

  obsIsSignedIn(): Observable<boolean> {
    return this.signedInStatus.asObservable();
  }

  obsIsSignedInEmail(): Observable<boolean> {
    return this.signedEmail.asObservable();
  }

}
