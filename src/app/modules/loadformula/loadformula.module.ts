import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadformulaRoutingModule } from './loadformula-routing.module';
import { LoadformulaComponent } from "./pages/loadformula.component";
import { SharedModule } from "../.././shared/shared.module";

@NgModule({
  declarations: [LoadformulaComponent],
  imports: [
    CommonModule,
    LoadformulaRoutingModule,
    SharedModule
  ]
})
export class LoadformulaModule { }
