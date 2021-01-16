import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService, ContentService, ApiService } from '@app/core';
import { FormBuilder, FormGroup, FormControl, Form, Validators } from "@angular/forms";
import * as $ from "jquery";
@Component({
  selector: 'app-list-koperai',
  templateUrl: './list-koperai.component.html',
  styleUrls: ['./list-koperai.component.scss']
})
export class ListKoperaiComponent implements OnInit {
  fileimage: any;
  file: File;
  form: FormGroup;
  koperasishow: boolean = false;
  @ViewChild('listkoperasimodal', { static: false }) public listkoperasimodal: any;
  @ViewChild('previewimage', { static: false }) public previewimage: any;
  listkoperasi = [];
  datalistkoperasishow: boolean;
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
  loadingshow: boolean;
  idgetkoperasi:any;
  namechoosefile:any = 'Upload File'
  fotoktp:any;
  previewfoto:any;
  constructor(
    private notifSvc: NotificationService,
    private contentSvc: ContentService,
    public fb: FormBuilder,
  ) {
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
    this.loadingshow = false;
  }

  ngOnInit() {
    this.loaddata();
    this.loadprovinsi()
  }

  loaddata() {
    this.listkoperasi = []
    this.contentSvc.getListKoperasi().subscribe(
      result => {
        this.koperasishow = true
        if (result.status !== 500) {
          result.data.forEach(element => {
            this.listkoperasi.push(element)
          });
        } else {
          this.listkoperasi = []
        }
      }
    )
  }
  getdata(id: any) {
    this.datalistkoperasishow = false
    this.contentSvc.getKoperasibyId(id).subscribe(
      result => {
        if (result.status !== 500) {
          this.fotoktp = result.data.foto_ktp_ketua
          this.idgetkoperasi = result.data.id
          this.datalistkoperasishow = true
          this.namakoperasiFc.setValue(result.data.nama_koperasi)
          this.nomorbadanhukumpendirianFc.setValue(result.data.no_badan_hukum !== 'null' ? result.data.no_badan_hukum: '')
          this.tanggalbadanhukumberdiriFc.setValue(result.data.tgl_badan_hukum)
          this.nomorperubahananggarandasarterbaruFc.setValue(result.data.no_perubahan_anggaran_dasar)
          this.tanggalperubahananggarandasarFc.setValue(result.data.tgl_perubahan_anggaran_dasar)
          this.tanggalratterakhirFc.setValue(result.data.tgl_rat_terakhir)
          this.alamatsesuaiaktaFc.setValue(result.data.alamat)
          this.listprovinsi.forEach(element => {
            if (element.name === result.data.provinsi) {
              this.fcselectprovinsi.setValue(element.id + ',' + result.data.provinsi)
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
                this.listkabupaten.forEach(data => {
                  if (data.name === result.data.kabupaten) {
                    this.fcselectkabupaten.setValue(data.id + ',' + result.data.kabupaten)
                  }
                })
              })
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
                this.listkecamatan.forEach(item => {
                  if (item.name === result.data.kecamatan) {
                    this.fcselectkecamatan.setValue(item.id + ',' + result.data.kecamatan)
                  }
                })
              })
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
                this.listkelurahan.forEach(value => {
                  if (value.name === result.data.kelurahan_desa) {
                    this.fcselectkelurahan.setValue(value.id + ',' + result.data.kelurahan_desa)
                  }
                })
              })
            }
          })
          this.bentukkoperasiFc.setValue(result.data.bentuk_koperasi !== 'null' ? result.data.bentuk_koperasi : '')
          this.jeniskoperasiFc.setValue(result.data.jenis_koperasi)
          this.namalengkapketuaFc.setValue(result.data.nama_ketua)
          this.namalengkapsekretarisFc.setValue(result.data.nama_sekretaris !== 'null' ? result.data.nama_sekretaris : '')
          this.namalengkapbendaharaFc.setValue(result.data.nama_bendahara !== 'null' ? result.data.nama_bendahara : '')
          this.namapengelolahariankoperasiFc.setValue(result.data.nama_pengelola_harian)
          this.jumlahanggotapriaFc.setValue(result.data.jml_anggota_pria)
          this.jumlahanggotawanitaFc.setValue(result.data.jml_anggota_wanita)
          this.totalmanajerFc.setValue(result.data.total_manajer)
          this.nomorindukkoperasiFc.setValue(result.data.no_induk_koperasi)
          this.statusnomorindukkoperasiFc.setValue(result.data.status_nik !== 'null' ? result.data.status_nik : '')
          this.statusgradeFc.setValue(result.data.status_grade !== 'null' ? result.data.status_grade : '')
          this.jabatanFc.setValue(result.data.jabatan !== 'null' ? result.data.jabatan : '')
          this.nomorhandphoneFc.setValue(result.data.hp_pengurus)
          this.emailFc.setValue(result.data.email_pengurus)
        } else {
          this.datalistkoperasishow = false
        }
      }
    )
  }

  processFile(event) {
    this.fileimage = (event.target as HTMLInputElement).files[0];
  }
  simpan() {
    if (this.jumlahanggotapriaFc.value !== null || this.jumlahanggotawanitaFc.value !== null) {
      this.totalanggotaFc.setValue(this.jumlahanggotapriaFc.value + this.jumlahanggotawanitaFc.value)
    } else {
      this.totalanggotaFc.setValue(null)
    }
    if (this.totalanggotaFc.value !== null || this.totalmanajerFc.value !== null) {
      this.totalkaryawanFc.setValue(this.totalanggotaFc.value + this.totalmanajerFc.value)
    } else {
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
      nama_ketua: [this.namalengkapketuaFc.value, [Validators.required]],
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
    if (this.form.status === "INVALID") {
      this.loadingshow = false
      this.notifSvc.addNotification({
        type: 'danger',
        head: 'Invalid Form Value',
        body: 'Please check your form'
      });
    } else {
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
      
      this.contentSvc.updateKoperasibyid(formData,this.idgetkoperasi).subscribe(
        result => {
          this.loadingshow = false
          if (result.status !== 500) {
            this.notifSvc.addNotification({
              type: 'success',
              head: 'Success',
              body: result.message
            });
          } else {
            this.notifSvc.addNotification({
              type: 'danger',
              head: 'Danger',
              body: result.message
            });
            this.loaddata() ;
            this.listkoperasimodal.hide();
          }
        }
      )
    }
  }
  edit(id: any) {
    this.listkoperasimodal.show();
    this.getdata(id)
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
  preview(){
    this.previewimage.show()
    this.listkoperasimodal.hide();
    this.previewfoto = 'http://api.peers.id/files/'+this.fotoktp
    console.log(this.previewfoto);
    
  }
  previewClose(){
    this.previewimage.hide()
    this.listkoperasimodal.show();
  }
}
