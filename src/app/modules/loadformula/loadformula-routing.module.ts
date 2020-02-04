import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadformulaComponent } from "./pages/loadformula.component";

const routes: Routes = [
  {
    path: '',
    component: LoadformulaComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadformulaRoutingModule { }
