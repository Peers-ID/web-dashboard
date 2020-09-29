import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from "./pages/alerts.component";


@NgModule({
  declarations: [AlertsComponent],
  exports:[AlertsComponent],
  imports: [
    CommonModule
  ]
})
export class AlertsModule { }
