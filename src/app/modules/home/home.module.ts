import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from "./pages/home.component";
import { MatButtonModule } from "@angular/material/button";
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    NgxPaginationModule
  ]
})
export class HomeModule { }
