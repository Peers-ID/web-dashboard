import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangepasswordRoutingModule } from './changepassword-routing.module';
import { ChangepasswordComponent } from "./pages/changepassword.component";
import { SharedModule } from "../.././shared/shared.module";
@NgModule({
  declarations: [ChangepasswordComponent],
  imports: [
    CommonModule,
    ChangepasswordRoutingModule,
    SharedModule
  ]
})
export class ChangepasswordModule { }
