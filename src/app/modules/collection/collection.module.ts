import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from "./pages/collection.component";
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [CollectionComponent],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    NgxPaginationModule
  ]
})
export class CollectionModule { }
