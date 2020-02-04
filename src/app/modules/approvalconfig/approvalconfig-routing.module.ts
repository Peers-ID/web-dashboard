import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalconfigComponent } from "./pages/approvalconfig.component";

const routes: Routes = [
  {
    path: '',
    component: ApprovalconfigComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalconfigRoutingModule { }
