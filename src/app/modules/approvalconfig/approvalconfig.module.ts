import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalconfigRoutingModule } from './approvalconfig-routing.module';
import { ApprovalconfigComponent } from "./pages/approvalconfig.component";
import { SharedModule } from "../.././shared/shared.module";
@NgModule({
  declarations: [ApprovalconfigComponent],
  imports: [
    CommonModule,
    ApprovalconfigRoutingModule,
    SharedModule
  ]
})
export class ApprovalconfigModule { }
