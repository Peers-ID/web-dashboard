import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from "./pages/account.component";
import { SharedModule } from "../.././shared/shared.module";
  import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class AccountModule { }
