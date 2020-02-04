import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberdataRoutingModule } from './memberdata-routing.module';
import { MemberdataComponent } from "./pages/memberdata.component";

@NgModule({
  declarations: [MemberdataComponent],
  imports: [
    CommonModule,
    MemberdataRoutingModule
  ]
})
export class MemberdataModule { }
