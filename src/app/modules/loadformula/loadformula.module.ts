import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadformulaRoutingModule } from './loadformula-routing.module';
import { LoadformulaComponent } from "./pages/loadformula.component";
@NgModule({
  declarations: [LoadformulaComponent],
  imports: [
    CommonModule,
    LoadformulaRoutingModule
  ]
})
export class LoadformulaModule { }
