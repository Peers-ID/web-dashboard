import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangepasswordComponent } from "./pages/changepassword.component";

const routes: Routes = [
  {
    path: '',
    component: ChangepasswordComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangepasswordRoutingModule { }
