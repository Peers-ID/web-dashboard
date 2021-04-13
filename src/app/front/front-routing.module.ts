import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard,AuthVerifiedGuard,AuthVerifiedGuestGuard,AuthPengaturanParameterGuard,AuthManajemenAkunGuard,AuthManajemenPinjamanGuard,AuthManajemenAnggotaGuard, AuthManajemenRembugGuard} from '@app/guard';
import { FrontComponent } from "./front.component";
import { LoginComponent } from "./feature/login/login.component";
import { ForgotPasswordComponent } from './feature/forgot-password/forgot-password.component';
import { ManagementAkunComponent } from "./feature/management-akun/management-akun.component";
import { ManagementPinjamanComponent } from './feature/management-pinjaman/management-pinjaman.component';
import { GantiPasswordComponent } from "./feature/ganti-password/ganti-password.component";
import { KinerjaKoperasiComponent } from "./feature/kinerja-koperasi/kinerja-koperasi.component";
import { PendaftaranKoperasiComponent } from "./feature/admin/pendaftaran-koperasi/pendaftaran-koperasi.component";
import { ListKoperaiComponent } from "./feature/admin/list-koperai/list-koperai.component";
import { PinjamanComponent } from "./feature/management-anggota/pinjaman/pinjaman.component";
import { SimpananComponent } from "./feature/management-anggota/simpanan/simpanan.component";
import { SimpananDetailComponent } from "./feature/management-anggota/simpanan/simpanan-detail.component";
import { SimpananDetailByidComponent } from "./feature/management-anggota/simpanan/simpanan-detail-byid.component";
import { ParameterPinjamanComponent } from "./feature/pengaturan-pinjaman/parameter-pinjaman/parameter-pinjaman.component";
import { StrukturPinjamanComponent } from "./feature/pengaturan-pinjaman/struktur-pinjaman/struktur-pinjaman.component";
import { TemplateDataAnggotaComponent } from "./feature/pengaturan-pinjaman/template-data-anggota/template-data-anggota.component";
import { ManagementRembugComponent } from './feature/management-rembug/management-rembug.component';
const routes: Routes = [
  {
    path: "",
    component: FrontComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: 'list-koperasi',
      },
      {
        path: "list-koperasi",
        component:ListKoperaiComponent,
        canActivate: [AuthVerifiedGuard],
      },
      {
        path: "pendaftaran-koperasi",
        component:PendaftaranKoperasiComponent,
        canActivate: [AuthVerifiedGuard],
      },
      {
        path: "kinerja-koperasi",
        component: KinerjaKoperasiComponent,
        canActivate: [AuthVerifiedGuestGuard],
      },
      {
        path: "ganti-password",
        component: GantiPasswordComponent
      },
      {
        path: "pengaturan-parameter-pinjaman",
        component: ParameterPinjamanComponent,
        canActivate: [AuthPengaturanParameterGuard],
      },
      {
        path: "pengaturan-struktur-pinjaman",
        component: StrukturPinjamanComponent,
        canActivate: [AuthPengaturanParameterGuard],
      },
      {
        path: "pengaturan-template-data-anggota",
        component: TemplateDataAnggotaComponent,
        canActivate: [AuthPengaturanParameterGuard],
      },
      {
        path: "management-akun",
        component: ManagementAkunComponent,
        canActivate: [AuthManajemenAkunGuard],
      },
      {
        path: "management-pinjaman",
        component: ManagementPinjamanComponent,
        canActivate: [AuthManajemenPinjamanGuard],
      },
      {
        path: "management-rembug",
        component: ManagementRembugComponent,
        canActivate: [AuthManajemenRembugGuard],
      },
      {
        path: "management-anggota-pinjaman",
        component:PinjamanComponent,
        canActivate: [AuthManajemenAnggotaGuard],
      },
      {
        path: "management-anggota-simpanan",
        component:SimpananComponent,
        canActivate: [AuthManajemenAnggotaGuard],
      },
      {
        path: "management-anggota-simpanan/:id/:name",
        component:SimpananDetailComponent,
        canActivate: [AuthManajemenAnggotaGuard],
      },
      {
        path: "management-anggota-simpanan/:id/:name/:type/:product",
        component:SimpananDetailByidComponent,
        canActivate: [AuthManajemenAnggotaGuard],
      },
    ]
  },
  {
    path: "login",
    component:LoginComponent
  },
  {
    path: "forgot-password",
    component:ForgotPasswordComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
