import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CutofftimeComponent } from "./pages/cutofftime.component";

const routes: Routes = [
  {
    path: '',
    component: CutofftimeComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CutofftimeRoutingModule { }
