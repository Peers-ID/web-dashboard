import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalloadingModule } from "./modalloading/modalloading.module";
import { NotificationModule } from './notification/notification.module';
import { FrontDigitOnlyDirective } from './validator/digit-only-validator-directive';
import { FrontPhoneFormatDirective } from './validator/phone-number-format-validator-directive';
import { FormatNumberDirective } from "./validator/format-number.directive";
import { FormatPercentageDirective } from "./validator/format-percentage.directive";
import { IdrOnlyDirective } from "./validator/idr-only.directive";
@NgModule({
  declarations: [FrontDigitOnlyDirective,FrontPhoneFormatDirective,FormatNumberDirective,FormatPercentageDirective,IdrOnlyDirective],
  exports:[ModalloadingModule,NotificationModule,FrontDigitOnlyDirective,FrontPhoneFormatDirective,FormatNumberDirective,FormatPercentageDirective,IdrOnlyDirective],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
