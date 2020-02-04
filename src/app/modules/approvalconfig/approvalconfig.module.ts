import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalconfigRoutingModule } from './approvalconfig-routing.module';
import { ApprovalconfigComponent } from "./pages/approvalconfig.component";

@NgModule({
  declarations: [ApprovalconfigComponent],
  imports: [
    CommonModule,
    ApprovalconfigRoutingModule
  ]
})
export class ApprovalconfigModule { }
