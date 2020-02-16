import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalerrorComponent } from "./pages/modalerror.component";


@NgModule({
  declarations: [ModalerrorComponent],
  imports: [
    CommonModule
  ],
  exports:[ModalerrorComponent]
})
export class ModalerrorModule { }
