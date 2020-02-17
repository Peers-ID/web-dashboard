import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {PagenotfoundComponent} from './modules/pagenotfound/pages/pagenotfound.component';
import { AuthGuard } from './core/guard/auth.guard';
let directurl;
if(JSON.parse(localStorage.getItem('currentUser')).role == 'Admin Peers'){
  directurl = 'koperasiregistration'
}else{
  directurl = 'loanapplication'
}
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: directurl,
        pathMatch: 'full'
      },
      {
        path: 'loanapplication',
        loadChildren: './modules/home/home.module#HomeModule',
      },
      {
        path: 'collectiondata',
        loadChildren: './modules/collection/collection.module#CollectionModule'
      },
      {
        path: 'accountmanagement',
        loadChildren: './modules/account/account.module#AccountModule'
      },    
      {
        path: 'koperasiregistration',
        loadChildren: './modules/koperasi/koperasi.module#KoperasiModule'
      },    
      {
        path: 'changepassword',
        loadChildren: './modules/changepassword/changepassword.module#ChangepasswordModule'
      },    
      {
        path: 'memberdata',
        loadChildren: './modules/memberdata/memberdata.module#MemberdataModule'
      },    
      {
        path: 'loanformula',
        loadChildren: './modules/loadformula/loadformula.module#LoadformulaModule'
      },    
      {
        path: 'approvalconfig',
        loadChildren: './modules/approvalconfig/approvalconfig.module#ApprovalconfigModule'
      },    
      {
        path: 'cutofftime',
        loadChildren: './modules/cutofftime/cutofftime.module#CutofftimeModule'
      },    
    ]
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule'
  },
  {
    path: 'forgotpassword',
    loadChildren: './modules/forgotpassword/forgotpassword.module#ForgotpasswordModule'
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
