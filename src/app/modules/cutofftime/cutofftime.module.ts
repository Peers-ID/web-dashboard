import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CutofftimeRoutingModule } from './cutofftime-routing.module';
import { CutofftimeComponent } from "./pages/cutofftime.component";

@NgModule({
  declarations: [CutofftimeComponent],
  imports: [
    CommonModule,
    CutofftimeRoutingModule
  ]
})
export class CutofftimeModule { }
