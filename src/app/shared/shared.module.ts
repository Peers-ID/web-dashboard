import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsModule } from "./components/alerts/alerts.module";
@NgModule({
  declarations: [],
  exports:[AlertsModule],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
