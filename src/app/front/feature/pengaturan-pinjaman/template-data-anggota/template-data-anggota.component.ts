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
  nomornpwpFc: FormControl = new FormControl(true);
  pekerjaanusahaFc: FormControl = new FormControl(true);
  jenisumkmFc: FormControl = new FormControl(true);
  namaperusahaanFc: FormControl = new FormControl();
  lamabekerjaFc: FormControl = new FormControl();
  penghasilFc: FormControl = new FormControl();
  provinsipekerjaanFc: FormControl = new FormControl();
  kotapekerjaanFc: FormControl = new FormControl();
  kecamatanpekerjaanFc: FormControl = new FormControl();
  kelurahanpekerjaanFc: FormControl = new FormControl();
  kodepospekerjaanFc: FormControl = new FormControl();
  domisilijalanFc: FormControl = new FormControl(true);
  domisiliprovinsiFc: FormControl = new FormControl(true);
  domisilikotaFc: FormControl = new FormControl(true);
  domisilikecamatanFc: FormControl = new FormControl(true);
  domisilikelurahanFc: FormControl = new FormControl(true);
  domisilikodeposFc: FormControl = new FormControl(true);
  domisilistatustempatFc: FormControl = new FormControl(true);
  domisililamatinggalFc: FormControl = new FormControl(true);
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
  alamtsesuaiktpFc: FormControl = new FormControl(true);
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
    this.nomoridentitasFc.disable()
    this.nomorhandphoneFc.disable()
    this.namalengkapFc.disable()
    this.tempatlahirFc.disable()
    this.tanggallahirFc.disable()
    this.jeniskelaminFc.disable()
    this.statuspernikahanFc.disable()
    this.namagadisibukandungFc.disable()
    this.ktpjalanFc.disable()
    this.ktpprovinsiFc.disable()
    this.ktpkotaFc.disable()
    this.ktpkecamatanFc.disable()
    this.ktpkelurahanFc.disable()
    this.ktpkodeposFc.disable()
    this.dokumenktpFc.disable()
    this.ktpstatustempatFc.disable()
    this.ktplamatinggalFc.disable()
    this.alamtsesuaiktpFc.disable()
    this.domisilijalanFc.disable()
    this.domisiliprovinsiFc.disable()
    this.domisilikotaFc.disable()
    this.domisilikecamatanFc.disable()
    this.domisilikelurahanFc.disable()
    this.domisilikodeposFc.disable()
    this.domisilistatustempatFc.disable()
    this.domisililamatinggalFc.disable()
    this.memilikinpwpFc.disable()
    this.pekerjaanusahaFc.disable()
    this.nomornpwpFc.disable()
    this.jenisumkmFc.disable()
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
    // if (this.alamtsesuaiktpFc.value === true) {
    //   this.domisilijalanFc.setValue(true)
    //   this.domisiliprovinsiFc.setValue(true)
    //   this.domisilikotaFc.setValue(true)
    //   this.domisilikecamatanFc.setValue(true)
    //   this.domisilikelurahanFc.setValue(true)
    //   this.domisilikodeposFc.setValue(true)
    //   this.domisilistatustempatFc.setValue(true)
    //   this.domisililamatinggalFc.setValue(true)
    // } else {
    //   this.domisilijalanFc.setValue(false)
    //   this.domisiliprovinsiFc.setValue(false)
    //   this.domisilikotaFc.setValue(false)
    //   this.domisilikecamatanFc.setValue(false)
    //   this.domisilikelurahanFc.setValue(false)
    //   this.domisilikodeposFc.setValue(false)
    //   this.domisilistatustempatFc.setValue(false)
    //   this.domisililamatinggalFc.setValue(false)
    // }
  }
  postdata(type: any) {
    this.loadingshow = true
    this.nomoridentitasFc.setValue(1)
    this.nomorhandphoneFc.setValue(1)
    this.emailFc.setValue(this.emailFc.value === true ? 1 : 0)
    this.namalengkapFc.setValue(1)
    this.tempatlahirFc.setValue(1)
    this.tanggallahirFc.setValue(1)
    this.usiaFc.setValue(this.usiaFc.value === true ? 1 : 0)
    this.jeniskelaminFc.setValue(1)
    this.statuspernikahanFc.setValue(1)
    this.pendidikanterakhirFc.setValue(this.pendidikanterakhirFc.value === true ? 1 : 0)
    this.namagadisibukandungFc.setValue(1)
    this.ktpjalanFc.setValue(1)
    this.ktpprovinsiFc.setValue(1)
    this.ktpkotaFc.setValue(1)
    this.ktpkecamatanFc.setValue(1)
    this.ktpkelurahanFc.setValue(1)
    this.ktpkodeposFc.setValue(1)
    this.ktpstatustempatFc.setValue(1)
    this.ktplamatinggalFc.setValue(1)
    this.luasrumahFc.setValue(this.luasrumahFc.value === true ? 1 : 0)
    this.jenisatapFc.setValue(this.jenisatapFc.value === true ? 1 : 0)
    this.jenisdindingFc.setValue(this.jenisdindingFc.value === true ? 1 : 0)
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
    this.memilikinpwpFc.setValue(1)
    this.nomornpwpFc.setValue(1)
    this.pekerjaanusahaFc.setValue(1)
    this.jenisumkmFc.setValue(1)
    this.namaperusahaanFc.setValue(this.namaperusahaanFc.value === true ? 1 : 0)
    this.lamabekerjaFc.setValue(this.lamabekerjaFc.value === true ? 1 : 0)
    this.penghasilFc.setValue(this.penghasilFc.value === true ? 1 : 0)
    this.provinsipekerjaanFc.setValue(this.provinsipekerjaanFc.value === true ? 1 : 0)
    this.kotapekerjaanFc.setValue(this.kotapekerjaanFc.value === true ? 1 : 0)
    this.kecamatanpekerjaanFc.setValue(this.kecamatanpekerjaanFc.value === true ? 1 : 0)
    this.kelurahanpekerjaanFc.setValue(this.kelurahanpekerjaanFc.value === true ? 1 : 0)
    this.kodepospekerjaanFc.setValue(this.kodepospekerjaanFc.value === true ? 1 : 0)
    this.domisilijalanFc.setValue(1)
    this.domisiliprovinsiFc.setValue(1)
    this.domisilikotaFc.setValue(1)
    this.domisilikecamatanFc.setValue(1)
    this.domisilikelurahanFc.setValue(1)
    this.domisilikodeposFc.setValue(1)
    this.domisilistatustempatFc.setValue(1)
    this.domisililamatinggalFc.setValue(1)
    this.namakontakdaruratFc.setValue(this.namakontakdaruratFc.value === true ? 1 : 0)
    this.nomorhandphonedaruratFc.setValue(this.nomorhandphonedaruratFc.value === true ? 1 : 0)
    this.hubungandaruratFc.setValue(this.hubungandaruratFc.value === true ? 1 : 0)
    this.namapenjaminFc.setValue(this.namapenjaminFc.value === true ? 1 : 0)
    this.nomorpenjaminFc.setValue(this.nomorpenjaminFc.value === true ? 1 : 0)
    this.hubunganpenjaminFc.setValue(this.hubunganpenjaminFc.value === true ? 1 : 0)
    this.dokumenktpFc.setValue(1)
    this.dokumensimFc.setValue(this.dokumensimFc.value === true ? 1 : 0)
    this.dokumenkkFc.setValue(this.dokumenkkFc.value === true ? 1 : 0)
    this.dokumensuratkerjaFc.setValue(this.dokumensuratkerjaFc.value === true ? 1 : 0)
    this.dokumenslipgajiFc.setValue(this.dokumenslipgajiFc.value === true ? 1 : 0)
    this.dokumenaktanikahFc.setValue(this.dokumenaktanikahFc.value === true ? 1 : 0)
    this.dokumenbpkbFc.setValue(this.dokumenbpkbFc.value === true ? 1 : 0)
    this.dokumenlainnyaFc.setValue(this.dokumenlainnyaFc.value === true ? 1 : 0)
    this.alamtsesuaiktpFc.setValue(1)
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
      "alamat_ktp_kode_pos": [this.ktpkodeposFc.value, [Validators.required]],
      "domisili_sesuai_ktp": [this.alamtsesuaiktpFc.value, [Validators.required]],
      "alamat_domisili_jalan": [this.domisilijalanFc.value, [Validators.required]],
      "alamat_domisili_kelurahan": [this.domisilikelurahanFc.value, [Validators.required]],
      "alamat_domisili_kecamatan": [this.domisilikecamatanFc.value, [Validators.required]],
      "alamat_domisili_kota": [this.domisilikotaFc.value, [Validators.required]],
      "alamat_domisili_provinsi": [this.domisiliprovinsiFc.value, [Validators.required]],
      "alamat_domisili_status_tempat_tinggal": [this.domisilistatustempatFc.value, [Validators.required]],
      "alamat_domisili_lama_tempat_tinggal": [this.domisililamatinggalFc.value, [Validators.required]],
      "alamat_domisili_kode_pos": [this.domisilikodeposFc.value, [Validators.required]],
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
      "alamat_kantor_kode_pos": [this.kodepospekerjaanFc.value, [Validators.required]],
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
      "dokumen_akta_nikah": [this.dokumenaktanikahFc.value, [Validators.required]],
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
      "survey_perkembangan_usaha": [this.perkembanganusahaFc.value, [Validators.required]],
      "nama_kontak_darurat":  [this.namakontakdaruratFc.value, [Validators.required]],
      "nomor_ponsel_darurat" : [this.nomorhandphonedaruratFc.value, [Validators.required]],
      "hubungan_kontak_darurat" : [this.hubungandaruratFc.value, [Validators.required]],
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
          this.pushdataform(
            result.data[0].email,
            result.data[0].usia,
            result.data[0].pendidikan_terakhir,
            result.data[0].survey_luas_rumah,
            result.data[0].survey_jenis_atap,
            result.data[0].survey_jenis_dinding,
            result.data[0].survey_kondisi_rumah,
            result.data[0].survey_letak_rumah,
            result.data[0].survey_tanggungan_keluarga,
            result.data[0].survey_data_fisik_perabot,
            result.data[0].survey_akses_lembaga_keuangan,
            result.data[0].survey_info_ttg_usaha,
            result.data[0].survey_index_rumah,
            result.data[0].survey_index_asset,
            result.data[0].survey_kepemilikan_asset,
            result.data[0].survey_pendapatan_luar_usaha,
            result.data[0].survey_perkembangan_asset,
            result.data[0].survey_perkembangan_usaha,
            result.data[0].nama_pasangan,
            result.data[0].no_identitas_pasangan,
            result.data[0].pekerjaan_pasangan,
            result.data[0].no_hp_pasangan,
            result.data[0].nama_perusahaan,
            result.data[0].lama_bekerja,
            result.data[0].penghasilan_omset,
            result.data[0].alamat_kantor_provinsi,
            result.data[0].alamat_kantor_kota,
            result.data[0].alamat_kantor_kecamatan,
            result.data[0].alamat_kantor_kelurahan,
            result.data[0].alamat_kantor_kode_pos,
            result.data[0].nama_kontak_darurat,
            result.data[0].nomor_ponsel_darurat,
            result.data[0].hubungan_kontak_darurat,
            result.data[0].nama_penjamin,
            result.data[0].no_hp_penjamin,
            result.data[0].hubungan_penjamin,
            result.data[0].dokumen_sim,
            result.data[0].dokumen_kk,
            result.data[0].dokumen_keterangan_kerja,
            result.data[0].dokumen_slip_gaji,
            result.data[0].dokumen_akta_nikah,
            result.data[0].dokumen_bpkb,
            result.data[0].dokumen_lainnya,
            result.data[0].alamat_kantor_jalan
          )
        } else {
          this.loaddata = true
          this.statubutton = true
          this.trigerconditionform('enable')
        }
      }
    )
  }

  pushdataform(
    email: any,
    usia: any,
    pendidikanterakhir:any,
    luasrumah: any,
    jenisatap: any,
    jenisdinding: any,
    kondisirumah: any,
    letakrumah: any,
    tanggungankeluarga: any,
    datafisikperabot: any,
    akseslembaga: any,
    informasiusaha: any,
    indexrumah: any,
    indexaset: any,
    kepemilikanaset: any,
    pendapatanluar: any,
    perkembanganaset: any,
    perkembanganusaha: any,
    namapasangan: any,
    nomorpasangan: any,
    pekerjaanpasangan: any,
    nomorhandphonepasangan: any,
    namaperusahaan: any,
    lamabekerja: any,
    penghasil: any,
    provinsipekerjaan: any,
    kotapekerjaan: any,
    kecamatanpekerjaan: any,
    kelurahanpekerjaan: any,
    kodepospekerjaan: any,
    namakontakdarurat: any,
    nomorhandphonedarurat: any,
    hubungandarurat: any,
    namapenjamin: any,
    nomorpenjamin: any,
    hubunganpenjamin: any,
    dokumensim: any,
    dokumenkk: any,
    dokumensuratkerja: any,
    dokumenslipgaji: any,
    dokumenaktanikah: any,
    dokumenbpkb: any,
    dokumenlainnya: any,
    jalanpekerjaan: any
  ) {
    this.emailFc.setValue(email === 1 ? true : false)
    this.usiaFc.setValue(usia === 1 ? true : false)
    this.pendidikanterakhirFc.setValue(pendidikanterakhir === 1 ? true : false)
    this.luasrumahFc.setValue(luasrumah === 1 ? true : false)
    this.jenisatapFc.setValue(jenisatap === 1 ? true : false)
    this.jenisdindingFc.setValue(jenisdinding === 1 ? true : false)
    this.kondisirumahFc.setValue(kondisirumah === 1 ? true : false)
    this.letakrumahFc.setValue(letakrumah === 1 ? true : false)
    this.tanggungankeluargaFc.setValue(tanggungankeluarga === 1 ? true : false)
    this.datafisikperabotFc.setValue(datafisikperabot === 1 ? true : false)
    this.akseslembagaFc.setValue(akseslembaga === 1 ? true : false)
    this.informasiusahaFc.setValue(informasiusaha === 1 ? true : false)
    this.indexrumahFc.setValue(indexrumah === 1 ? true : false)
    this.indexasetFc.setValue(indexaset === 1 ? true : false)
    this.kepemilikanasetFc.setValue(kepemilikanaset === 1 ? true : false)
    this.pendapatanluarFc.setValue(pendapatanluar === 1 ? true : false)
    this.perkembanganasetFc.setValue(perkembanganaset === 1 ? true : false)
    this.perkembanganusahaFc.setValue(perkembanganusaha === 1 ? true : false)
    this.namapasanganFc.setValue(namapasangan === 1 ? true : false)
    this.nomorpasanganFc.setValue(nomorpasangan === 1 ? true : false)
    this.pekerjaanpasanganFc.setValue(pekerjaanpasangan === 1 ? true : false)
    this.nomorhandphonepasanganFc.setValue(nomorhandphonepasangan === 1 ? true : false)
    this.namaperusahaanFc.setValue(namaperusahaan === 1 ? true : false)
    this.lamabekerjaFc.setValue(lamabekerja === 1 ? true : false)
    this.penghasilFc.setValue(penghasil === 1 ? true : false)
    this.provinsipekerjaanFc.setValue(provinsipekerjaan === 1 ? true : false)
    this.kotapekerjaanFc.setValue(kotapekerjaan === 1 ? true : false)
    this.kecamatanpekerjaanFc.setValue(kecamatanpekerjaan === 1 ? true : false)
    this.kelurahanpekerjaanFc.setValue(kelurahanpekerjaan === 1 ? true : false)
    this.kodepospekerjaanFc.setValue(kodepospekerjaan === 1 ? true : false)
    this.namakontakdaruratFc.setValue(namakontakdarurat === 1 ? true : false)
    this.nomorhandphonedaruratFc.setValue(nomorhandphonedarurat === 1 ? true : false)
    this.hubungandaruratFc.setValue(hubungandarurat === 1 ? true : false)
    this.namapenjaminFc.setValue(namapenjamin === 1 ? true : false)
    this.nomorpenjaminFc.setValue(nomorpenjamin === 1 ? true : false)
    this.hubunganpenjaminFc.setValue(hubunganpenjamin === 1 ? true : false)
    this.dokumensimFc.setValue(dokumensim === 1 ? true : false)
    this.dokumenkkFc.setValue(dokumenkk === 1 ? true : false)
    this.dokumensuratkerjaFc.setValue(dokumensuratkerja === 1 ? true : false)
    this.dokumenslipgajiFc.setValue(dokumenslipgaji === 1 ? true : false)
    this.dokumenaktanikahFc.setValue(dokumenaktanikah === 1 ? true : false)
    this.dokumenbpkbFc.setValue(dokumenbpkb === 1 ? true : false)
    this.dokumenlainnyaFc.setValue(dokumenlainnya === 1 ? true : false)
    this.jalanpekerjaanFc.setValue(jalanpekerjaan === 1 ? true : false)
  }
  trigerconditionform(type: any) {
    if (type === 'disable') {
      this.emailFc.disable()
      this.usiaFc.disable()
      this.pendidikanterakhirFc.disable()
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
      this.namaperusahaanFc.disable()
      this.lamabekerjaFc.disable()
      this.penghasilFc.disable()
      this.provinsipekerjaanFc.disable()
      this.kotapekerjaanFc.disable()
      this.kecamatanpekerjaanFc.disable()
      this.kelurahanpekerjaanFc.disable()
      this.kodepospekerjaanFc.disable()
      this.namakontakdaruratFc.disable()
      this.nomorhandphonedaruratFc.disable()
      this.hubungandaruratFc.disable()
      this.namapenjaminFc.disable()
      this.nomorpenjaminFc.disable()
      this.hubunganpenjaminFc.disable()
      this.dokumensimFc.disable()
      this.dokumenkkFc.disable()
      this.dokumensuratkerjaFc.disable()
      this.dokumenslipgajiFc.disable()
      this.dokumenaktanikahFc.disable()
      this.dokumenbpkbFc.disable()
      this.dokumenlainnyaFc.disable()
      this.jalanpekerjaanFc.disable()
    } else {
      this.emailFc.enable()
      this.usiaFc.enable()
      this.pendidikanterakhirFc.enable()
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
      this.namaperusahaanFc.enable()
      this.lamabekerjaFc.enable()
      this.penghasilFc.enable()
      this.provinsipekerjaanFc.enable()
      this.kotapekerjaanFc.enable()
      this.kecamatanpekerjaanFc.enable()
      this.kelurahanpekerjaanFc.enable()
      this.kodepospekerjaanFc.enable()
      this.namakontakdaruratFc.enable()
      this.nomorhandphonedaruratFc.enable()
      this.hubungandaruratFc.enable()
      this.namapenjaminFc.enable()
      this.nomorpenjaminFc.enable()
      this.hubunganpenjaminFc.enable()
      this.dokumensimFc.enable()
      this.dokumenkkFc.enable()
      this.dokumensuratkerjaFc.enable()
      this.dokumenslipgajiFc.enable()
      this.dokumenaktanikahFc.enable()
      this.dokumenbpkbFc.enable()
      this.dokumenlainnyaFc.enable()
      this.jalanpekerjaanFc.enable()
    }
  }
}
