import { Component, OnInit } from '@angular/core';
import { NotificationService, ContentService, ApiService } from '@app/core';
import { FormBuilder, FormGroup, FormControl, Form, Validators } from "@angular/forms";
@Component({
  selector: 'app-pendaftaran-koperasi',
  templateUrl: './pendaftaran-koperasi.component.html',
  styleUrls: ['./pendaftaran-koperasi.component.scss']
})
export class PendaftaranKoperasiComponent implements OnInit {
  fileimage:any;
  file: File;
  form: FormGroup;
  loadingshow: boolean;
  namakoperasiFc: FormControl;
  nomorbadanhukumpendirianFc: FormControl;
  tanggalbadanhukumberdiriFc: FormControl;
  nomorperubahananggarandasarterbaruFc: FormControl;
  tanggalperubahananggarandasarFc: FormControl;
  tanggalratterakhirFc: FormControl;
  alamatsesuaiaktaFc: FormControl;
  nomorFc: FormControl;
  rtFc: FormControl;
  rwFc: FormControl;
  kodeposFc: FormControl;
  listprovinsi = [];
  listkabupaten = [];
  listkecamatan = [];
  listkelurahan = [];
  fcselectprovinsi: FormControl;
  fcselectkabupaten: FormControl;
  fcselectkecamatan: FormControl;
  fcselectkelurahan: FormControl;
  bentukkoperasiFc: FormControl;
  jeniskoperasiFc: FormControl;
  namalengkapketuaFc: FormControl;
  namalengkapsekretarisFc: FormControl;
  namalengkapbendaharaFc: FormControl;
  namapengelolahariankoperasiFc: FormControl;
  jumlahanggotapriaFc: FormControl;
  jumlahanggotawanitaFc: FormControl;
  totalanggotaFc: FormControl;
  totalmanajerFc: FormControl;
  totalkaryawanFc: FormControl;
  nomorindukkoperasiFc: FormControl;
  statusnomorindukkoperasiFc: FormControl;
  statusgradeFc: FormControl;
  jabatanFc: FormControl;
  nomorhandphoneFc: FormControl;
  emailFc: FormControl;
  constructor(
    private notifSvc: NotificationService,
    private contentSvc: ContentService,
    public fb: FormBuilder,
    private api:ApiService
  ) {
    this.loadingshow = false;
    this.namakoperasiFc = new FormControl();
    this.nomorbadanhukumpendirianFc = new FormControl();
    this.tanggalbadanhukumberdiriFc = new FormControl();
    this.nomorperubahananggarandasarterbaruFc = new FormControl();
    this.tanggalperubahananggarandasarFc = new FormControl();
    this.tanggalratterakhirFc = new FormControl();
    this.alamatsesuaiaktaFc = new FormControl();
    this.nomorFc = new FormControl();
    this.rtFc = new FormControl();
    this.rwFc = new FormControl();
    this.kodeposFc = new FormControl;
    this.fcselectprovinsi = new FormControl();
    this.fcselectkabupaten = new FormControl();
    this.fcselectkecamatan = new FormControl();
    this.fcselectkelurahan = new FormControl();
    this.bentukkoperasiFc = new FormControl();
    this.jeniskoperasiFc = new FormControl();
    this.namalengkapketuaFc = new FormControl();
    this.namalengkapsekretarisFc = new FormControl();
    this.namalengkapbendaharaFc = new FormControl();
    this.namapengelolahariankoperasiFc = new FormControl();
    this.jumlahanggotapriaFc = new FormControl();
    this.jumlahanggotawanitaFc = new FormControl();
    this.totalanggotaFc = new FormControl();
    this.totalmanajerFc = new FormControl();
    this.totalkaryawanFc = new FormControl();
    this.nomorindukkoperasiFc = new FormControl();
    this.statusnomorindukkoperasiFc = new FormControl();
    this.statusgradeFc = new FormControl();
    this.jabatanFc = new FormControl();
    this.nomorhandphoneFc = new FormControl();
    this.emailFc = new FormControl();
  }

  ngOnInit() {
    this.loadprovinsi();
  }
  processFile(event) {
    this.fileimage = (event.target as HTMLInputElement).files[0];
  }
  simpan() {
    if(this.jumlahanggotapriaFc.value !== null || this.jumlahanggotawanitaFc.value !== null){
      this.totalanggotaFc.setValue(this.jumlahanggotapriaFc.value + this.jumlahanggotawanitaFc.value)
    }else{
      this.totalanggotaFc.setValue(null)
    }
    if (this.totalanggotaFc.value !== null || this.totalmanajerFc.value !== null){
      this.totalkaryawanFc.setValue(this.totalanggotaFc.value + this.totalmanajerFc.value)
    }else{
      this.totalkaryawanFc.setValue(null)
    }
    if (this.fcselectprovinsi.value.includes(',')){
      this.fcselectprovinsi.setValue(this.fcselectprovinsi.value.split(',')[1])
    }
    if (this.fcselectkelurahan.value.includes(',')){
      this.fcselectkelurahan.setValue(this.fcselectkelurahan.value.split(',')[1])
    }
    if (this.fcselectkabupaten.value.includes(',')){
      this.fcselectkabupaten.setValue(this.fcselectkabupaten.value.split(',')[1])
    }
    if (this.fcselectkecamatan.value.includes(',')){
      this.fcselectkecamatan.setValue(this.fcselectkecamatan.value.split(',')[1])
    }
    this.loadingshow = true
    this.form = this.fb.group({
      nama_koperasi: [this.namakoperasiFc.value, [Validators.required]],
      no_badan_hukum: this.nomorbadanhukumpendirianFc.value,
      tgl_badan_hukum: this.tanggalbadanhukumberdiriFc.value,
      no_perubahan_anggaran_dasar: this.nomorperubahananggarandasarterbaruFc.value,
      tgl_perubahan_anggaran_dasar: this.tanggalperubahananggarandasarFc.value,
      tgl_rat_terakhir: this.tanggalratterakhirFc.value,
      alamat: [this.alamatsesuaiaktaFc.value, [Validators.required]],
      kelurahan_desa: [this.fcselectkelurahan.value, [Validators.required]],
      kecamatan: [this.fcselectkecamatan.value, [Validators.required]],
      kabupaten: [this.fcselectkabupaten.value, [Validators.required]],
      provinsi: [this.fcselectprovinsi.value, [Validators.required]],
      bentuk_koperasi: this.bentukkoperasiFc.value,
      jenis_koperasi: [this.jeniskoperasiFc.value, [Validators.required]],
      nama_ketua:[this.namalengkapketuaFc.value, [Validators.required]],
      nama_sekretaris: this.namalengkapsekretarisFc.value,
      nama_bendahara: this.namalengkapbendaharaFc.value,
      foto_ktp_ketua: this.fileimage,
      jml_anggota_pria: this.jumlahanggotapriaFc.value,
      jml_anggota_wanita: this.jumlahanggotawanitaFc.value,
      total_anggota: this.totalanggotaFc.value,
      total_manajer: this.totalmanajerFc.value,
      total_karyawan: this.totalkaryawanFc.value,
      no_induk_koperasi: [this.nomorindukkoperasiFc.value, [Validators.required]],
      status_nik: this.statusnomorindukkoperasiFc.value,
      status_grade: this.statusgradeFc.value,
      jabatan:this.jabatanFc.value,
      hp_pengurus: this.nomorhandphoneFc.value,
      email_pengurus: this.emailFc.value,
    });
    if (this.form.status === "INVALID"){
      this.loadingshow = false
      this.notifSvc.addNotification({
        type: 'danger',
        head: 'Invalid Form Value',
        body: 'Please check your form'
      });
    }else{
      this.loadingshow = false
      const formData: FormData = new FormData();
      formData.append("nama_koperasi", this.form.value.nama_koperasi);
      formData.append("no_badan_hukum", this.form.value.no_badan_hukum);
      formData.append("tgl_badan_hukum", this.form.value.tgl_badan_hukum);
      formData.append("no_perubahan_anggaran_dasar", this.form.value.no_perubahan_anggaran_dasar);
      formData.append("tgl_perubahan_anggaran_dasar", this.form.value.tgl_perubahan_anggaran_dasar);
      formData.append("tgl_rat_terakhir", this.form.value.tgl_rat_terakhir);
      formData.append("alamat", this.form.value.alamat);
      formData.append("kelurahan_desa", this.form.value.kelurahan_desa);
      formData.append("kecamatan", this.form.value.kecamatan);
      formData.append("kabupaten", this.form.value.kabupaten);
      formData.append("provinsi", this.form.value.provinsi);
      formData.append("bentuk_koperasi", this.form.value.bentuk_koperasi);
      formData.append("jenis_koperasi", this.form.value.jenis_koperasi);
      formData.append("nama_ketua", this.form.value.nama_ketua);
      formData.append("nama_sekretaris", this.form.value.nama_sekretaris);
      formData.append("nama_bendahara", this.form.value.nama_bendahara);
      formData.append("foto_ktp_ketua", this.form.value.foto_ktp_ketua);
      formData.append("jml_anggota_pria", this.form.value.jml_anggota_pria);
      formData.append("jml_anggota_wanita", this.form.value.jml_anggota_wanita);
      formData.append("total_anggota", this.form.value.total_anggota);
      formData.append("total_manajer", this.form.value.total_manajer);
      formData.append("total_karyawan", this.form.value.total_karyawan);
      formData.append("no_induk_koperasi", this.form.value.no_induk_koperasi);
      formData.append("status_nik", this.form.value.status_nik);
      formData.append("status_grade", this.form.value.status_grade);
      formData.append("jabatan", this.form.value.jabatan);
      formData.append("hp_pengurus", this.form.value.hp_pengurus);
      formData.append("email_pengurus", this.form.value.email_pengurus);
      this.contentSvc.postKoperasi(formData).subscribe(
        result => {
          this.loadingshow = false
          if (result.status !== 500){
            this.notifSvc.addNotification({
              type: 'success',
              head: 'Success',
              body: result.message
            });   
          }else{
            this.notifSvc.addNotification({
              type: 'danger',
              head: 'Danger',
              body: result.message
            });   
          }
        }
      )
    }    
  }
  loadprovinsi() {
    this.contentSvc.getcorelocation().subscribe(data => {
      data.forEach(element => {
        let dataobj = {
          id: element.id,
          name: element.name
        }
        this.listprovinsi.push(dataobj)
      });
    })
  }
  loadkabupaten() {
    this.contentSvc.getcorelocation().subscribe(data => {
      data.forEach(element => {
        element.regencies.forEach(element => {
          if (element.province_id === this.fcselectprovinsi.value.split(',')[0]) {
            let dataobj = {
              id: element.id,
              name: element.name
            }
            this.listkabupaten.push(dataobj)
          }
        });
      });
    })
  }
  loadkecamatan() {
    this.contentSvc.getcorelocation().subscribe(data => {
      data.forEach(element => {
        element.regencies.forEach(element => {
          element.districts.forEach(element => {
            if (element.regency_id === this.fcselectkabupaten.value.split(',')[0]) {
              let dataobj = {
                id: element.id,
                name: element.name
              }
              this.listkecamatan.push(dataobj)
            }
          })
        });
      });
    })
  }
  loadkelurahan() {
    this.contentSvc.getcorelocation().subscribe(data => {
      data.forEach(element => {
        element.regencies.forEach(element => {
          element.districts.forEach(element => {
            element.villages.forEach(element => {
              if (element.district_id === this.fcselectkecamatan.value.split(',')[0]) {
                let dataobj = {
                  id: element.id,
                  name: element.name
                }
                this.listkelurahan.push(dataobj)
              }
            });
          })
        });
      });
    })
  }
  changeprovinsi() {
    this.listkabupaten = [];
    this.listkecamatan = [];
    this.listkelurahan = []
    this.loadkabupaten();
  }
  changekabupaten() {
    this.listkecamatan = [];
    this.listkelurahan = [];
    this.loadkecamatan();
  }
  changekecamatan() {
    this.listkelurahan = [];
    this.loadkelurahan();
  }
}
