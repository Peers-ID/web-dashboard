import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe ,CurrencyPipe} from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { FrontComponent } from "./front.component";
import { HeaderComponent } from "./feature/header/header.Component";
import { FooterComponent } from "./feature/footer/footer.Component";
import { SidebarComponent } from "./feature/sidebar/sidebar.Component";
import { AuthGuard,AuthVerifiedGuard,AuthVerifiedGuestGuard,AuthPengaturanParameterGuard,AuthManajemenAkunGuard,AuthManajemenPinjamanGuard,AuthManajemenAnggotaGuard, AuthManajemenRembugGuard} from '@app/guard';
import { LoginComponent } from "./feature/login/login.component";
import { ForgotPasswordComponent } from './feature/forgot-password/forgot-password.component';
import { ManagementAkunComponent } from './feature/management-akun/management-akun.component';
import { ManagementPinjamanComponent } from './feature/management-pinjaman/management-pinjaman.component';
import { ManagementRembugComponent } from './feature/management-rembug/management-rembug.component';
import { GantiPasswordComponent } from "./feature/ganti-password/ganti-password.component";
import { KinerjaKoperasiComponent } from "./feature/kinerja-koperasi/kinerja-koperasi.component";
import { SharedModule } from "./shared/components/shared.module";
import { PendaftaranKoperasiComponent } from "./feature/admin/pendaftaran-koperasi/pendaftaran-koperasi.component";
import { ListKoperaiComponent } from "./feature/admin/list-koperai/list-koperai.component";
import { PinjamanComponent } from "./feature/management-anggota/pinjaman/pinjaman.component";
import { SimpananComponent } from "./feature/management-anggota/simpanan/simpanan.component";
import { ParameterPinjamanComponent } from "./feature/pengaturan-pinjaman/parameter-pinjaman/parameter-pinjaman.component";
import { StrukturPinjamanComponent } from "./feature/pengaturan-pinjaman/struktur-pinjaman/struktur-pinjaman.component";
import { TemplateDataAnggotaComponent } from "./feature/pengaturan-pinjaman/template-data-anggota/template-data-anggota.component";
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChartModule } from 'angular2-highcharts';
import { SimpananDetailComponent } from './feature/management-anggota/simpanan/simpanan-detail.component';
import { SimpananDetailByidComponent } from './feature/management-anggota/simpanan/simpanan-detail-byid.component';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LampiranComponent } from './feature/management-laporan/lampiran/lampiran.component';
import { AuthManajemenLaporanGuard } from '@app/guard/auth-manajemen-lampiran.guard';
declare var require: any;

export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/modules/drilldown');
  dd(hc);

  return hc;
}

@NgModule({
  declarations: [
    ParameterPinjamanComponent,
    StrukturPinjamanComponent,
    TemplateDataAnggotaComponent,
    PinjamanComponent,
    LampiranComponent,
    SimpananComponent,
    ListKoperaiComponent,
    PendaftaranKoperasiComponent,
    FrontComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ManagementAkunComponent,
    ManagementRembugComponent,
    ManagementPinjamanComponent,
    GantiPasswordComponent,
    KinerjaKoperasiComponent,
    SimpananDetailComponent,
    SimpananDetailByidComponent
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    ModalModule.forRoot(),
    PdfViewerModule,
  ],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    CurrencyPipe,DecimalPipe,AuthGuard,AuthVerifiedGuard,AuthVerifiedGuestGuard,AuthPengaturanParameterGuard,AuthManajemenAkunGuard,AuthManajemenRembugGuard,AuthManajemenLaporanGuard,AuthManajemenPinjamanGuard,AuthManajemenAnggotaGuard
  ]
})
export class FrontModule { }
