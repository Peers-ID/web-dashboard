import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsModule } from "./components/alerts/alerts.module";
import { ModalpopupModule } from './components/modalpopup/modalpopup.module';
@NgModule({
  declarations: [],
  exports:[AlertsModule,ModalpopupModule],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
