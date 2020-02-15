import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KoperasiRoutingModule } from './koperasi-routing.module';
import { KoperasiComponent } from "./pages/koperasi.component";
import { SharedModule } from "../.././shared/shared.module";

@NgModule({
  declarations: [KoperasiComponent],
  imports: [
    CommonModule,
    KoperasiRoutingModule,
    SharedModule
  ]
})
export class KoperasiModule { }
