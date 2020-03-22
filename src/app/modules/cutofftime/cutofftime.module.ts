import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CutofftimeRoutingModule } from './cutofftime-routing.module';
import { CutofftimeComponent } from "./pages/cutofftime.component";
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from "../.././shared/shared.module";
@NgModule({
  declarations: [CutofftimeComponent],
  imports: [
    CommonModule,
    CutofftimeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CutofftimeModule { }
