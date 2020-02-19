import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalloadingComponent } from "./pages/modalloading.component";

@NgModule({
  declarations: [ModalloadingComponent],
  imports: [
    CommonModule,
  ],
  exports:[ModalloadingComponent]
})
export class ModalloadingModule { }
