import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AdminNotification } from '@app/model';

@Injectable()
export class NotificationService {
  notificationList: Array<AdminNotification>;
  defaultWarningHead = 'Operation Not Complete';
  defaultDangerHead = 'Operation Error';
  defaultSuccessHead = 'Operation Success';
  defaultTime = 7000;

  private notificationObject: any = {
    message: '',
    type: '',
    position: 'global',
    duration: 0
  };
  private queue: Array<any>;
  private notificationObs: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.queue = [];
    this.notificationObs.next(this.notificationObject);
  }

  getNotification(): Observable<any> {
    return this.notificationObs.asObservable();
  }

  setNotification(message = '', type = 'success', position = 'global', duration = 6000): void {
    this.notificationObject.message = message;
    this.notificationObject.type = type;
    this.notificationObject.position = position;
    this.notificationObject.duration = duration;
    if (this.queue.length === 0 || (this.queue.length > 0 && message !== this.queue[this.queue.length - 1].message))
      this.queue.push(this.notificationObject);
    if (this.queue.length === 1) this.next();
  }

  next(): void {
    if (this.queue.length > 0) this.pushNotification(this.queue[0]);
  }

  private pushNotification(obj: any): void {
    this.notificationObs.next(obj);
    if (this.queue.length > 0) this.queue.splice(0, 1);
    setTimeout(() => {
      this.clearNotification();
    }, obj.duration);
  }

  public clearNotification(): void {
    this.notificationObs.next({ message: '', type: '', position: 'global', duration: 0 });
    setTimeout(() => {
      this.next();
    }, 500);
  }


  /**
   * Admin notification
  */
  addNotification(notif: AdminNotification) {
    if (!this.notificationList) this.notificationList = [];
    const meta = notif;
    if (!notif.head) {
      switch (notif.type) {
        case 'default':
          meta.head = 'Note!';
          break;
        case 'success':
          meta.head = this.defaultSuccessHead;
          break;
        case 'danger':
          meta.head = this.defaultDangerHead;
          break;
        case 'warning':
          meta.head = this.defaultWarningHead;
          break;
        default:
          meta.head = '??';
          break;
      }
    }
    if (isPlatformBrowser(this.platformId)) {
      if (this.notificationList.length > 0) {
        this.notificationList.shift()
        setTimeout(() => {
          this.notificationList.push(notif);
        }, 300);
      } else {
        this.notificationList.push(notif);
      }
      if (notif.type !== 'danger') {
        setTimeout(() => {
          this.notificationList = [];
        }, this.defaultTime);
      }
    }
  }

  removenotif() {
    if (this.notificationList) {
      if (this.notificationList.length > 0) {
        this.notificationList = []
      }
    }

  }
  addDefaultSuccessNotification(): void {
    this.addNotification({
      type: 'success',
      body: 'The operation was a success',
      head: this.defaultSuccessHead
    });
  }

  addDefaultWarningNotification(): void {
    this.addNotification({
      type: 'warning',
      body: 'Please Check Again',
      head: this.defaultWarningHead
    });
  }

  addDefaultDangerNotification(): void {
    this.addNotification({
      type: 'danger',
      body: 'An Error has occured',
      head: this.defaultDangerHead
    });
  }

  deleteNotification(idx): void {
    this.notificationList.splice(idx, 1);
  }
}
