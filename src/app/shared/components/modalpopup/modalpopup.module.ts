import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalpopupComponent } from "./pages/modalpopup.component";
@NgModule({
  declarations: [ModalpopupComponent],
  imports: [
    CommonModule
  ],
  exports:[ModalpopupComponent],
})
export class ModalpopupModule { }
