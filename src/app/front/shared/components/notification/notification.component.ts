import { Component } from '@angular/core';
import { NotificationService } from '@app/core/notification.service';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('scaleState', [
      state('in', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('void => *', [
        animate('.3s ease', keyframes([
          style({ opacity: 0, transform: 'scale(0.7)', offset: 0 }),
          style({ opacity: 1, transform: 'scale(1.05)', offset: 0.7 }),
          style({ opacity: 1, transform: 'scale(1)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate('0.2s 0.1s ease-out', style({
          opacity: 0,
          transform: 'scale(0.9)'
        }))
      ])
    ])
  ]
})
export class NotificationComponent {
  constructor(
    public notificationSvc: NotificationService
  ) { }
}
