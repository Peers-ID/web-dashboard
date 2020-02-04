import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KoperasiRoutingModule } from './koperasi-routing.module';
import { KoperasiComponent } from "./pages/koperasi.component";

@NgModule({
  declarations: [KoperasiComponent],
  imports: [
    CommonModule,
    KoperasiRoutingModule
  ]
})
export class KoperasiModule { }
