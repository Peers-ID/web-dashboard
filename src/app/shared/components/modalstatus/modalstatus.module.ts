import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalstatusComponent } from "./pages/modalstatus.component";
@NgModule({
  declarations: [ModalstatusComponent],
  imports: [
    CommonModule
  ],
  exports:[ModalstatusComponent],
})
export class ModalstatusModule { }
