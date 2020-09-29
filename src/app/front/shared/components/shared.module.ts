import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalloadingModule } from "./modalloading/modalloading.module";
import { NotificationModule } from './notification/notification.module';
@NgModule({
  declarations: [],
  exports:[ModalloadingModule,NotificationModule],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
