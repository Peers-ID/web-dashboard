import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotpasswordRoutingModule } from './forgotpassword-routing.module';

import { SharedModule } from "../../shared/shared.module";
import { ForgotpasswordComponent } from "./pages/forgotpassword.component";
@NgModule({
  declarations: [ForgotpasswordComponent],
  imports: [
    CommonModule,
    ForgotpasswordRoutingModule,
    SharedModule
  ]
})
export class ForgotpasswordModule { }
