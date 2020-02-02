import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {PagenotfoundComponent} from './modules/pagenotfound/pages/pagenotfound.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'Loan-Aplication',
        pathMatch: 'full'
      },
      {
        path: 'Loan-Aplication',
        loadChildren: './modules/home/home.module#HomeModule',
      },
    ]
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule'
  },
  {
    path: '**',
    redirectTo: '/404'
  },
  {
    path: '404',
    component: PagenotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
