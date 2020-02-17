import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberdataRoutingModule } from './memberdata-routing.module';
import { MemberdataComponent } from "./pages/memberdata.component";
import { SharedModule } from "../.././shared/shared.module";
@NgModule({
  declarations: [MemberdataComponent],
  imports: [
    CommonModule,
    MemberdataRoutingModule,
    SharedModule
  ]
})
export class MemberdataModule { }
