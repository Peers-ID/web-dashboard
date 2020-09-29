import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";
import { ContentService } from "./content.service";
import { CookieService } from "./cookie.service";
import { LoaderService } from "./loader.service";
import { TokenService } from "./token.service";
import { UserService } from "./user.service";
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AccountService } from "./account.service";
import { StatemanagementService } from "./statemanagement.service";
import { NotificationService } from "./notification.service";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    ApiService,
    AuthService,
    ContentService,
    CookieService,
    LoaderService,
    TokenService,
    UserService,
    AccountService,
    StatemanagementService,
    NotificationService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
