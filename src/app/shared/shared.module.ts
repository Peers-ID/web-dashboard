import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsModule } from "./components/alerts/alerts.module";
import { ModalpopupModule } from './components/modalpopup/modalpopup.module';
import { ModalerrorModule } from "./components/modalerror/modalerror.module";
import { ModalsuccessModule } from "./components/modalsuccess/modalsuccess.module";
import { ModalloadingModule } from "./components/modalloading/modalloading.module";
@NgModule({
  declarations: [],
  exports:[AlertsModule,ModalpopupModule,ModalsuccessModule,ModalerrorModule,ModalloadingModule],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
