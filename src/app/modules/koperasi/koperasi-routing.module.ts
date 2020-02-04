import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KoperasiComponent } from "./pages/koperasi.component";

const routes: Routes = [
  {
    path: '',
    component: KoperasiComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KoperasiRoutingModule { }
