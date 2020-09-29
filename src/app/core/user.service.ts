import { Injectable } from '@angular/core';
import { User } from '@app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;

  constructor(
  ) {}
  set(data: any, reset = true): void {
    if (reset) this.clear();
    this.user = new User(data);
  }

  get(): User {
    if (this.user) return this.user;
    else return undefined;
  }


  clear(): void {
    if (this.user) this.user = undefined;
  }

}
