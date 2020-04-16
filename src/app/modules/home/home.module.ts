import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from "./pages/home.component";
import {NgxPaginationModule} from 'ngx-pagination';
import { SharedModule } from "../.././shared/shared.module";
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxPaginationModule,
    SharedModule,
    FormsModule , ReactiveFormsModule
  ]
})
export class HomeModule { }
