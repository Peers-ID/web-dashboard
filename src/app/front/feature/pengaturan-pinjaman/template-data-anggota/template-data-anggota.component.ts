import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContentService, NotificationService } from '@app/core';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-template-data-anggota',
  templateUrl: './template-data-anggota.component.html',
  styleUrls: ['./template-data-anggota.component.scss']
})
export class TemplateDataAnggotaComponent implements OnInit {
  formgrouppostdata: FormGroup;
  nomoridentitasFc: FormControl = new FormControl(true);
  nomorhandphoneFc: FormControl = new FormControl(true);
  emailFc: FormControl = new FormControl();
  namalengkapFc: FormControl = new FormControl(true);
  tempatlahirFc: FormControl = new FormControl(true);
  tanggallahirFc: FormControl = new FormControl(true);
  usiaFc: FormControl = new FormControl();
  jeniskelaminFc: FormControl = new FormControl(true);
  statuspernikahanFc: FormControl = new FormControl(true);
  pendidikanterakhirFc: FormControl = new FormControl();
  namagadisibukandungFc: FormControl = new FormControl(true);
  ktpjalanFc: FormControl = new FormControl(true);
  ktpprovinsiFc: FormControl = new FormControl(true);
  ktpkotaFc: FormControl = new FormControl(true);
  ktpkecamatanFc: FormControl = new FormControl(true);
  ktpkelurahanFc: FormControl = new FormControl(true);
  ktpkodeposFc: FormControl = new FormControl(true);
  ktpstatustempatFc: FormControl = new FormControl(true);
  ktplamatinggalFc: FormControl = new FormControl(true);
  luasrumahFc: FormControl = new FormControl();
  jenisatapFc: FormControl = new FormControl();
  jenisdindingFc: FormControl = new FormControl();
  kondisirumahFc: FormControl = new FormControl();
  letakrumahFc: FormControl = new FormControl();
  tanggungankeluargaFc: FormControl = new FormControl();
  datafisikperabotFc: FormControl = new FormControl();
  akseslembagaFc: FormControl = new FormControl();
  informasiusahaFc: FormControl = new FormControl();
  indexrumahFc: FormControl = new FormControl();
  indexasetFc: FormControl = new FormControl();
  kepemilikanasetFc: FormControl = new FormControl();
  pendapatanluarFc: FormControl = new FormControl();
  perkembanganasetFc: FormControl = new FormControl();
  perkembanganusahaFc: FormControl = new FormControl();
  namapasanganFc: FormControl = new FormControl();
  nomorpasanganFc: FormControl = new FormControl();
  pekerjaanpasanganFc: FormControl = new FormControl();
  nomorhandphonepasanganFc: FormControl = new FormControl();
  memilikinpwpFc: FormControl = new FormControl(true);
  nomornpwpFc: FormControl = new FormControl();
  pekerjaanusahaFc: FormControl = new FormControl(true);
  jenisumkmFc: FormControl = new FormControl();
  namaperusahaanFc: FormControl = new FormControl();
  lamabekerjaFc: FormControl = new FormControl();
  penghasilFc: FormControl = new FormControl();
  provinsipekerjaanFc: FormControl = new FormControl();
  kotapekerjaanFc: FormControl = new FormControl();
  kecamatanpekerjaanFc: FormControl = new FormControl();
  kelurahanpekerjaanFc: FormControl = new FormControl();
  kodepospekerjaanFc: FormControl = new FormControl();
  domisilijalanFc: FormControl = new FormControl();
  domisiliprovinsiFc: FormControl = new FormControl();
  domisilikotaFc: FormControl = new FormControl();
  domisilikecamatanFc: FormControl = new FormControl();
  domisilikelurahanFc: FormControl = new FormControl();
  domisilikodeposFc: FormControl = new FormControl();
  domisilistatustempatFc: FormControl = new FormControl();
  domisililamatinggalFc: FormControl = new FormControl();
  namakontakdaruratFc: FormControl = new FormControl();
  nomorhandphonedaruratFc: FormControl = new FormControl();
  hubungandaruratFc: FormControl = new FormControl();
  namapenjaminFc: FormControl = new FormControl();
  nomorpenjaminFc: FormControl = new FormControl();
  hubunganpenjaminFc: FormControl = new FormControl();
  dokumenktpFc: FormControl = new FormControl(true);
  dokumensimFc: FormControl = new FormControl();
  dokumenkkFc: FormControl = new FormControl();
  dokumensuratkerjaFc: FormControl = new FormControl();
  dokumenslipgajiFc: FormControl = new FormControl();
  dokumenaktanikahFc: FormControl = new FormControl();
  dokumenbpkbFc: FormControl = new FormControl();
  dokumenlainnyaFc: FormControl = new FormControl();
  alamtsesuaiktpFc: FormControl = new FormControl();
  jalanpekerjaanFc: FormControl = new FormControl();
  statubutton: boolean;
  loadingshow: boolean;
  loaddata: boolean;
  constructor(
    private contentSvc: ContentService,
    private notifSvc: NotificationService,
    public fb: FormBuilder,
  ) {
    this.loaddata = false
  }

  ngOnInit() {
    this.getdata();
  }

  simpan() {
    this.postdata('create')
  }
  ubah() {
    this.statubutton = true
    this.trigerconditionform('enable')
  }
  changequestion() {
    if (this.alamtsesuaiktpFc.value === true) {
      this.domisilijalanFc.setValue(true)
      this.domisiliprovinsiFc.setValue(true)
      this.domisilikotaFc.setValue(true)
      this.domisilikecamatanFc.setValue(true)
      this.domisilikelurahanFc.setValue(true)
      this.domisilikodeposFc.setValue(true)
      this.domisilistatustempatFc.setValue(true)
      this.domisililamatinggalFc.setValue(true)
    } else {
      this.domisilijalanFc.setValue(false)
      this.domisiliprovinsiFc.setValue(false)
      this.domisilikotaFc.setValue(false)
      this.domisilikecamatanFc.setValue(false)
      this.domisilikelurahanFc.setValue(false)
      this.domisilikodeposFc.setValue(false)
      this.domisilistatustempatFc.setValue(false)
      this.domisililamatinggalFc.setValue(false)
    }
  }
  postdata(type: any) {
    this.loadingshow = true
    this.nomoridentitasFc.setValue(this.nomoridentitasFc.value === true ? 1 : 0)
    this.nomorhandphoneFc.setValue(this.nomorhandphoneFc.value === true ? 1 : 0)
    this.emailFc.setValue(this.emailFc.value === true ? 1 : 0)
    this.namalengkapFc.setValue(this.namalengkapFc.value === true ? 1 : 0)
    this.tempatlahirFc.setValue(this.tempatlahirFc.value === true ? 1 : 0)
    this.tanggallahirFc.setValue(this.tanggallahirFc.value === true ? 1 : 0)
    this.usiaFc.setValue(this.usiaFc.value === true ? 1 : 0)
    this.jeniskelaminFc.setValue(this.jeniskelaminFc.value === true ? 1 : 0)
    this.statuspernikahanFc.setValue(this.statuspernikahanFc.value === true ? 1 : 0)
    this.pendidikanterakhirFc.setValue(this.pendidikanterakhirFc.value === true ? 1 : 0)
    this.namagadisibukandungFc.setValue(this.namagadisibukandungFc.value === true ? 1 : 0)
    this.ktpjalanFc.setValue(this.ktpjalanFc.value === true ? 1 : 0)
    this.ktpprovinsiFc.setValue(this.ktpprovinsiFc.value === true ? 1 : 0)
    this.ktpkotaFc.setValue(this.ktpkotaFc.value === true ? 1 : 0)
    this.ktpkecamatanFc.setValue(this.ktpkecamatanFc.value === true ? 1 : 0)
    this.ktpkelurahanFc.setValue(this.ktpkelurahanFc.value === true ? 1 : 0)
    this.ktpkodeposFc.setValue(this.ktpkodeposFc.value === true ? 1 : 0)
    this.ktpstatustempatFc.setValue(this.ktpstatustempatFc.value === true ? 1 : 0)
    this.ktplamatinggalFc.setValue(this.ktplamatinggalFc.value === true ? 1 : 0)
    this.luasrumahFc.setValue(this.luasrumahFc.value === true ? 1 : 0)
    this.jenisatapFc.setValue(this.jenisatapFc.value === true ? 1 : 0)
    this.jenisdindingFc.setValue(this.nomoridentitasFc.value === true ? 1 : 0)
    this.kondisirumahFc.setValue(this.kondisirumahFc.value === true ? 1 : 0)
    this.letakrumahFc.setValue(this.letakrumahFc.value === true ? 1 : 0)
    this.tanggungankeluargaFc.setValue(this.tanggungankeluargaFc.value === true ? 1 : 0)
    this.datafisikperabotFc.setValue(this.datafisikperabotFc.value === true ? 1 : 0)
    this.akseslembagaFc.setValue(this.akseslembagaFc.value === true ? 1 : 0)
    this.informasiusahaFc.setValue(this.informasiusahaFc.value === true ? 1 : 0)
    this.indexrumahFc.setValue(this.indexrumahFc.value === true ? 1 : 0)
    this.indexasetFc.setValue(this.indexasetFc.value === true ? 1 : 0)
    this.kepemilikanasetFc.setValue(this.kepemilikanasetFc.value === true ? 1 : 0)
    this.pendapatanluarFc.setValue(this.pendapatanluarFc.value === true ? 1 : 0)
    this.perkembanganasetFc.setValue(this.perkembanganasetFc.value === true ? 1 : 0)
    this.perkembanganusahaFc.setValue(this.perkembanganusahaFc.value === true ? 1 : 0)
    this.namapasanganFc.setValue(this.namapasanganFc.value === true ? 1 : 0)
    this.nomorpasanganFc.setValue(this.nomorpasanganFc.value === true ? 1 : 0)
    this.pekerjaanpasanganFc.setValue(this.pekerjaanpasanganFc.value === true ? 1 : 0)
    this.nomorhandphonepasanganFc.setValue(this.nomorhandphonepasanganFc.value === true ? 1 : 0)
    this.memilikinpwpFc.setValue(this.memilikinpwpFc.value === true ? 1 : 0)
    this.nomornpwpFc.setValue(this.nomornpwpFc.value === true ? 1 : 0)
    this.pekerjaanusahaFc.setValue(this.pekerjaanusahaFc.value === true ? 1 : 0)
    this.jenisumkmFc.setValue(this.jenisumkmFc.value === true ? 1 : 0)
    this.namaperusahaanFc.setValue(this.namaperusahaanFc.value === true ? 1 : 0)
    this.lamabekerjaFc.setValue(this.lamabekerjaFc.value === true ? 1 : 0)
    this.penghasilFc.setValue(this.penghasilFc.value === true ? 1 : 0)
    this.provinsipekerjaanFc.setValue(this.provinsipekerjaanFc.value === true ? 1 : 0)
    this.kotapekerjaanFc.setValue(this.kotapekerjaanFc.value === true ? 1 : 0)
    this.kecamatanpekerjaanFc.setValue(this.kecamatanpekerjaanFc.value === true ? 1 : 0)
    this.kelurahanpekerjaanFc.setValue(this.kelurahanpekerjaanFc.value === true ? 1 : 0)
    this.kodepospekerjaanFc.setValue(this.kodepospekerjaanFc.value === true ? 1 : 0)
    this.domisilijalanFc.setValue(this.domisilijalanFc.value === true ? 1 : 0)
    this.domisiliprovinsiFc.setValue(this.domisiliprovinsiFc.value === true ? 1 : 0)
    this.domisilikotaFc.setValue(this.domisilikotaFc.value === true ? 1 : 0)
    this.domisilikecamatanFc.setValue(this.domisilikecamatanFc.value === true ? 1 : 0)
    this.domisilikelurahanFc.setValue(this.domisilikelurahanFc.value === true ? 1 : 0)
    this.domisilikodeposFc.setValue(this.domisilikodeposFc.value === true ? 1 : 0)
    this.domisilistatustempatFc.setValue(this.domisilistatustempatFc.value === true ? 1 : 0)
    this.domisililamatinggalFc.setValue(this.domisililamatinggalFc.value === true ? 1 : 0)
    this.namakontakdaruratFc.setValue(this.namakontakdaruratFc.value === true ? 1 : 0)
    this.nomorhandphonedaruratFc.setValue(this.nomorhandphonedaruratFc.value === true ? 1 : 0)
    this.hubungandaruratFc.setValue(this.hubungandaruratFc.value === true ? 1 : 0)
    this.namapenjaminFc.setValue(this.namapenjaminFc.value === true ? 1 : 0)
    this.nomorpenjaminFc.setValue(this.nomorpenjaminFc.value === true ? 1 : 0)
    this.hubunganpenjaminFc.setValue(this.hubunganpenjaminFc.value === true ? 1 : 0)
    this.dokumenktpFc.setValue(this.dokumenktpFc.value === true ? 1 : 0)
    this.dokumensimFc.setValue(this.dokumensimFc.value === true ? 1 : 0)
    this.dokumenkkFc.setValue(this.dokumenkkFc.value === true ? 1 : 0)
    this.dokumensuratkerjaFc.setValue(this.dokumensuratkerjaFc.value === true ? 1 : 0)
    this.dokumenslipgajiFc.setValue(this.dokumenslipgajiFc.value === true ? 1 : 0)
    this.dokumenaktanikahFc.setValue(this.dokumenaktanikahFc.value === true ? 1 : 0)
    this.dokumenbpkbFc.setValue(this.dokumenbpkbFc.value === true ? 1 : 0)
    this.dokumenlainnyaFc.setValue(this.dokumenlainnyaFc.value === true ? 1 : 0)
    this.alamtsesuaiktpFc.setValue(this.alamtsesuaiktpFc.value === true ? 1 : 0)
    this.jalanpekerjaanFc.setValue(this.jalanpekerjaanFc.value === true ? 1 : 0)
    this.formgrouppostdata = this.fb.group({
      "no_identitas": [this.nomoridentitasFc.value, [Validators.required]],
      "member_handphone": [this.nomorhandphoneFc.value, [Validators.required]],
      "email": [this.emailFc.value, [Validators.required]],
      "nama_lengkap": [this.namalengkapFc.value, [Validators.required]],
      "tanggal_lahir": [this.tanggallahirFc.value, [Validators.required]],
      "usia": [this.usiaFc.value, [Validators.required]],
      "tempat_lahir": [this.tempatlahirFc.value, [Validators.required]],
      "jenis_kelamin": [this.jeniskelaminFc.value, [Validators.required]],
      "nama_gadis_ibu": [this.namagadisibukandungFc.value, [Validators.required]],
      "status_perkawinan": [this.statuspernikahanFc.value, [Validators.required]],
      "pendidikan_terakhir": [this.pendidikanterakhirFc.value, [Validators.required]],
      "alamat_ktp_jalan": [this.ktpjalanFc.value, [Validators.required]],
      "alamat_ktp_kelurahan": [this.ktpkelurahanFc.value, [Validators.required]],
      "alamat_ktp_kecamatan": [this.ktpkecamatanFc.value, [Validators.required]],
      "alamat_ktp_kota": [this.ktpkotaFc.value, [Validators.required]],
      "alamat_ktp_provinsi": [this.ktpprovinsiFc.value, [Validators.required]],
      "alamat_ktp_status_tempat_tinggal": [this.ktpstatustempatFc.value, [Validators.required]],
      "alamat_ktp_lama_tinggal": [this.ktplamatinggalFc.value, [Validators.required]],
      "domisili_sesuai_ktp": [this.alamtsesuaiktpFc.value, [Validators.required]],
      "alamat_domisili_jalan": [this.domisilijalanFc.value, [Validators.required]],
      "alamat_domisili_kelurahan": [this.domisilikelurahanFc.value, [Validators.required]],
      "alamat_domisili_kecamatan": [this.domisilikecamatanFc.value, [Validators.required]],
      "alamat_domisili_kota": [this.domisilikotaFc.value, [Validators.required]],
      "alamat_domisili_provinsi": [this.domisiliprovinsiFc.value, [Validators.required]],
      "alamat_domisili_status_tempat_tinggal": [this.domisilistatustempatFc.value, [Validators.required]],
      "alamat_domisili_lama_tempat_tinggal": [this.domisililamatinggalFc.value, [Validators.required]],
      "memiliki_npwp": [this.memilikinpwpFc.value, [Validators.required]],
      "nomer_npwp": [this.nomornpwpFc.value, [Validators.required]],
      "pekerja_usaha": [this.pekerjaanusahaFc.value, [Validators.required]],
      "jenis_umkm": [this.jenisumkmFc.value, [Validators.required]],
      "nama_perusahaan": [this.namaperusahaanFc.value, [Validators.required]],
      "lama_bekerja": [this.lamabekerjaFc.value, [Validators.required]],
      "penghasilan_omset": [this.penghasilFc.value, [Validators.required]],
      "alamat_kantor_jalan": [this.jalanpekerjaanFc.value, [Validators.required]],
      "alamat_kantor_kelurahan": [this.kelurahanpekerjaanFc.value, [Validators.required]],
      "alamat_kantor_kecamatan": [this.kecamatanpekerjaanFc.value, [Validators.required]],
      "alamat_kantor_kota": [this.kotapekerjaanFc.value, [Validators.required]],
      "alamat_kantor_provinsi": [this.provinsipekerjaanFc.value, [Validators.required]],
      "nama_pasangan": [this.namapasanganFc.value, [Validators.required]],
      "no_identitas_pasangan": [this.nomorpasanganFc.value, [Validators.required]],
      "pekerjaan_pasangan": [this.pekerjaanpasanganFc.value, [Validators.required]],
      "no_hp_pasangan": [this.nomorhandphonepasanganFc.value, [Validators.required]],
      "nama_penjamin": [this.namapenjaminFc.value, [Validators.required]],
      "no_hp_penjamin": [this.nomorpenjaminFc.value, [Validators.required]],
      "hubungan_penjamin": [this.hubunganpenjaminFc.value, [Validators.required]],
      "dokumen_ktp": [this.dokumenktpFc.value, [Validators.required]],
      "dokumen_sim": [this.dokumensimFc.value, [Validators.required]],
      "dokumen_kk": [this.dokumenkkFc.value, [Validators.required]],
      "dokumen_keterangan_kerja": [this.dokumensuratkerjaFc.value, [Validators.required]],
      "dokumen_slip_gaji": [this.dokumenslipgajiFc.value, [Validators.required]],
      "dokumen_bpkb": [this.dokumenbpkbFc.value, [Validators.required]],
      "dokumen_lainnya": [this.dokumenlainnyaFc.value, [Validators.required]],
      "survey_luas_rumah": [this.luasrumahFc.value, [Validators.required]],
      "survey_jenis_atap": [this.jenisatapFc.value, [Validators.required]],
      "survey_jenis_dinding": [this.jenisdindingFc.value, [Validators.required]],
      "survey_kondisi_rumah": [this.kondisirumahFc.value, [Validators.required]],
      "survey_letak_rumah": [this.letakrumahFc.value, [Validators.required]],
      "survey_tanggungan_keluarga": [this.tanggungankeluargaFc.value, [Validators.required]],
      "survey_data_fisik_perabot": [this.datafisikperabotFc.value, [Validators.required]],
      "survey_akses_lembaga_keuangan": [this.akseslembagaFc.value, [Validators.required]],
      "survey_info_ttg_usaha": [this.informasiusahaFc.value, [Validators.required]],
      "survey_index_rumah": [this.indexrumahFc.value, [Validators.required]],
      "survey_index_asset": [this.indexasetFc.value, [Validators.required]],
      "survey_kepemilikan_asset": [this.kepemilikanasetFc.value, [Validators.required]],
      "survey_pendapatan_luar_usaha": [this.pendapatanluarFc.value, [Validators.required]],
      "survey_perkembangan_asset": [this.perkembanganasetFc.value, [Validators.required]],
      "survey_perkembangan_usaha": [this.perkembanganusahaFc.value, [Validators.required]]
    });
    if (this.formgrouppostdata.status === "VALID") {
      this.contentSvc.postMemberconfig(this.formgrouppostdata.value).subscribe(
        result => {
          if (result) {
            this.loadingshow = false;
            this.notifSvc.addNotification({
              type: 'success',
              head: 'Success',
              body: result.message
            });
            this.getdata();
          }
        }
      )
    } else {
      setTimeout(() => {
        this.loadingshow = false;
        this.notifSvc.addNotification({
          type: 'danger',
          head: 'Danger',
          body: 'Pastikan semua form sudah terisi dengan benar'
        });
      }, 500);
    }
  }
  getdata() {
    const koperasi_id = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'secret').toString(CryptoJS.enc.Utf8)).koperasi_id;
    this.contentSvc.getmemberConfig(koperasi_id).subscribe(
      result => {
        if (result.data.length > 0) {
          this.loaddata = true
          this.statubutton = false
          this.trigerconditionform('disable')
        } else {
          this.loaddata = true
          this.statubutton = true
          this.trigerconditionform('enable')
        }
      }
    )
  }

  trigerconditionform(type: any) {
    if (type === 'disable') {
      this.nomoridentitasFc.disable()
      this.nomorhandphoneFc.disable()
      this.emailFc.disable()
      this.namalengkapFc.disable()
      this.tempatlahirFc.disable()
      this.tanggallahirFc.disable()
      this.usiaFc.disable()
      this.jeniskelaminFc.disable()
      this.statuspernikahanFc.disable()
      this.pendidikanterakhirFc.disable()
      this.namagadisibukandungFc.disable()
      this.ktpjalanFc.disable()
      this.ktpprovinsiFc.disable()
      this.ktpkotaFc.disable()
      this.ktpkecamatanFc.disable()
      this.ktpkelurahanFc.disable()
      this.ktpkodeposFc.disable()
      this.ktpstatustempatFc.disable()
      this.ktplamatinggalFc.disable()
      this.luasrumahFc.disable()
      this.jenisatapFc.disable()
      this.jenisdindingFc.disable()
      this.kondisirumahFc.disable()
      this.letakrumahFc.disable()
      this.tanggungankeluargaFc.disable()
      this.datafisikperabotFc.disable()
      this.akseslembagaFc.disable()
      this.informasiusahaFc.disable()
      this.indexrumahFc.disable()
      this.indexasetFc.disable()
      this.kepemilikanasetFc.disable()
      this.pendapatanluarFc.disable()
      this.perkembanganasetFc.disable()
      this.perkembanganusahaFc.disable()
      this.namapasanganFc.disable()
      this.nomorpasanganFc.disable()
      this.pekerjaanpasanganFc.disable()
      this.nomorhandphonepasanganFc.disable()
      this.memilikinpwpFc.disable()
      this.nomornpwpFc.disable()
      this.pekerjaanusahaFc.disable()
      this.jenisumkmFc.disable()
      this.namaperusahaanFc.disable()
      this.lamabekerjaFc.disable()
      this.penghasilFc.disable()
      this.provinsipekerjaanFc.disable()
      this.kotapekerjaanFc.disable()
      this.kecamatanpekerjaanFc.disable()
      this.kelurahanpekerjaanFc.disable()
      this.kodepospekerjaanFc.disable()
      this.domisilijalanFc.disable()
      this.domisiliprovinsiFc.disable()
      this.domisilikotaFc.disable()
      this.domisilikecamatanFc.disable()
      this.domisilikelurahanFc.disable()
      this.domisilikodeposFc.disable()
      this.domisilistatustempatFc.disable()
      this.domisililamatinggalFc.disable()
      this.namakontakdaruratFc.disable()
      this.nomorhandphonedaruratFc.disable()
      this.hubungandaruratFc.disable()
      this.namapenjaminFc.disable()
      this.nomorpenjaminFc.disable()
      this.hubunganpenjaminFc.disable()
      this.dokumenktpFc.disable()
      this.dokumensimFc.disable()
      this.dokumenkkFc.disable()
      this.dokumensuratkerjaFc.disable()
      this.dokumenslipgajiFc.disable()
      this.dokumenaktanikahFc.disable()
      this.dokumenbpkbFc.disable()
      this.dokumenlainnyaFc.disable()
      this.alamtsesuaiktpFc.disable()
      this.jalanpekerjaanFc.disable()
    } else {
      this.nomoridentitasFc.enable()
      this.nomorhandphoneFc.enable()
      this.emailFc.enable()
      this.namalengkapFc.enable()
      this.tempatlahirFc.enable()
      this.tanggallahirFc.enable()
      this.usiaFc.enable()
      this.jeniskelaminFc.enable()
      this.statuspernikahanFc.enable()
      this.pendidikanterakhirFc.enable()
      this.namagadisibukandungFc.enable()
      this.ktpjalanFc.enable()
      this.ktpprovinsiFc.enable()
      this.ktpkotaFc.enable()
      this.ktpkecamatanFc.enable()
      this.ktpkelurahanFc.enable()
      this.ktpkodeposFc.enable()
      this.ktpstatustempatFc.enable()
      this.ktplamatinggalFc.enable()
      this.luasrumahFc.enable()
      this.jenisatapFc.enable()
      this.jenisdindingFc.enable()
      this.kondisirumahFc.enable()
      this.letakrumahFc.enable()
      this.tanggungankeluargaFc.enable()
      this.datafisikperabotFc.enable()
      this.akseslembagaFc.enable()
      this.informasiusahaFc.enable()
      this.indexrumahFc.enable()
      this.indexasetFc.enable()
      this.kepemilikanasetFc.enable()
      this.pendapatanluarFc.enable()
      this.perkembanganasetFc.enable()
      this.perkembanganusahaFc.enable()
      this.namapasanganFc.enable()
      this.nomorpasanganFc.enable()
      this.pekerjaanpasanganFc.enable()
      this.nomorhandphonepasanganFc.enable()
      this.memilikinpwpFc.enable()
      this.nomornpwpFc.enable()
      this.pekerjaanusahaFc.enable()
      this.jenisumkmFc.enable()
      this.namaperusahaanFc.enable()
      this.lamabekerjaFc.enable()
      this.penghasilFc.enable()
      this.provinsipekerjaanFc.enable()
      this.kotapekerjaanFc.enable()
      this.kecamatanpekerjaanFc.enable()
      this.kelurahanpekerjaanFc.enable()
      this.kodepospekerjaanFc.enable()
      this.domisilijalanFc.enable()
      this.domisiliprovinsiFc.enable()
      this.domisilikotaFc.enable()
      this.domisilikecamatanFc.enable()
      this.domisilikelurahanFc.enable()
      this.domisilikodeposFc.enable()
      this.domisilistatustempatFc.enable()
      this.domisililamatinggalFc.enable()
      this.namakontakdaruratFc.enable()
      this.nomorhandphonedaruratFc.enable()
      this.hubungandaruratFc.enable()
      this.namapenjaminFc.enable()
      this.nomorpenjaminFc.enable()
      this.hubunganpenjaminFc.enable()
      this.dokumenktpFc.enable()
      this.dokumensimFc.enable()
      this.dokumenkkFc.enable()
      this.dokumensuratkerjaFc.enable()
      this.dokumenslipgajiFc.enable()
      this.dokumenaktanikahFc.enable()
      this.dokumenbpkbFc.enable()
      this.dokumenlainnyaFc.enable()
      this.alamtsesuaiktpFc.enable()
      this.jalanpekerjaanFc.enable()
    }
  }
}
