import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberdataComponent } from "./pages/memberdata.component";

const routes: Routes = [
  {
    path: '',
    component: MemberdataComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberdataRoutingModule { }
