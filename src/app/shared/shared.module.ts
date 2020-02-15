import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsModule } from "./components/alerts/alerts.module";
import { ModalpopupModule } from './components/modalpopup/modalpopup.module';
import { ModalstatusModule } from "./components/modalstatus/modalstatus.module";
@NgModule({
  declarations: [],
  exports:[AlertsModule,ModalpopupModule , ModalstatusModule],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
