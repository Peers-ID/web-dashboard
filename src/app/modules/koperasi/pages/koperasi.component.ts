import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ApiService } from "../../../core/services/api/api.service";
import { StatemanagementService } from "../../../core/services/statemanagement/statemanagement.service";
import * as $ from "jquery";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
@Component({
  selector: "app-koperasi",
  templateUrl: "./koperasi.component.html",
  styleUrls: ["./koperasi.component.scss"],
})
export class KoperasiComponent implements OnInit {
  file : File;
  form: FormGroup;
  data: any;
  titlepage: string;
  trigerselectkecamatan:boolean = true;
  trigeralerts: boolean = false;
  showmodalerror: boolean = false;
  showmodalsuccess: boolean = false;
  messagekoperasiregistration: string;
  dataimage:any;
  listprovinsi = [];
  listkabupaten = [];
  listkecamatan = [];
  listkelurahan = [];
  fcselectprovinsi:FormControl
  fcselectkabupaten:FormControl
  fcselectkecamatan:FormControl
  fcselectkelurahan:FormControl
  contentstatusmodal:any;
  constructor(
    private apiservice: ApiService,
    public fb: FormBuilder,
    private state: StatemanagementService
  ) {
    this.fcselectprovinsi = new FormControl('');
    this.fcselectkabupaten = new FormControl('');
    this.fcselectkecamatan = new FormControl('');
    this.fcselectkelurahan = new FormControl('');
    this.form = this.fb.group({
      nama_koperasi: [""],
      no_badan_hukum: [""],
      tgl_badan_hukum: [""],
      no_perubahan_anggaran_dasar: [""],
      tgl_perubahan_anggaran_dasar: [""],
      tgl_rat_terakhir: [""],
      alamat: [""],
      kelurahan_desa: [""],
      kecamatan: [""],
      kabupaten: [""],
      provinsi: [""],
      bentuk_koperasi: [""],
      jenis_koperasi: [""],
      kelompok_koperasi: [""],
      sektor_usaha: [""],
      nama_ketua: [""],
      nama_sekretaris: [""],
      nama_bendahara: [""],
      foto_ktp_ketua: [null],
      jml_anggota_pria: [""],
      jml_anggota_wanita: [""],
      total_anggota: [""],
      total_manajer: [""],
      total_karyawan: [""],
      no_induk_koperasi: [""],
      status_nik: [""],
      status_grade: [""],
      hp_pengurus: [""],
      email_pengurus: [""],
    });
  }
  @ViewChild("imageInput", { static: false }) imageInput: ElementRef;
  ngOnInit() {
    if (window.location.pathname.split("/")[1] !== "peers") {
      this.titlepage = window.location.pathname.split("/")[1];
    } else {
      this.titlepage = window.location.pathname.split("/")[2];
    }
    this.loadprovinsi();
    // $("body").addClass("sidebar-collapse");
  }
  processFile(event) {
    // this.form.patchValue({
    //   foto_ktp_ketua: this.imageInput.nativeElement.files[0],
    // });
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      foto_ktp_ketua: file
    });
    this.form.get('foto_ktp_ketua').updateValueAndValidity()
  }
  savekoperasi(
    nama_koperasi,
    no_badan_hukum,
    tgl_badan_hukum,
    no_perubahan_anggaran_dasar,
    tgl_perubahan_anggaran_dasar,
    tgl_rat_terakhir,
    alamat,
    bentuk_koperasi,
    jenis_koperasi,
    kelompok_koperasi,
    sektor_usaha,
    nama_ketua,
    nama_sekretaris,
    nama_bendahara,
    jml_anggota_pria,
    jml_anggota_wanita,
    total_anggota,
    total_manajer,
    total_karyawan,
    no_induk_koperasi,
    status_nik,
    status_grade,
    hp_pengurus,
    email_pengurus
  ) {    
    
    this.form.patchValue({
      nama_koperasi: nama_koperasi,
      no_badan_hukum: no_badan_hukum,
      tgl_badan_hukum: tgl_badan_hukum,
      no_perubahan_anggaran_dasar: no_perubahan_anggaran_dasar,
      tgl_perubahan_anggaran_dasar: tgl_perubahan_anggaran_dasar,
      tgl_rat_terakhir: tgl_rat_terakhir,
      alamat: alamat,
      kelurahan_desa: this.fcselectkelurahan.value.split(',')[1],
      kecamatan: this.fcselectkecamatan.value.split(',')[1],
      kabupaten: this.fcselectkabupaten.value.split(',')[1],
      provinsi: this.fcselectprovinsi.value.split(',')[1],
      bentuk_koperasi: bentuk_koperasi,
      jenis_koperasi: jenis_koperasi,
      kelompok_koperasi: kelompok_koperasi,
      sektor_usaha: sektor_usaha,
      nama_ketua: nama_ketua,
      nama_sekretaris: nama_sekretaris,
      nama_bendahara: nama_bendahara,
      jml_anggota_pria: jml_anggota_pria,
      jml_anggota_wanita: jml_anggota_wanita,
      total_anggota: total_anggota,
      total_manajer: total_manajer,
      total_karyawan: total_karyawan,
      no_induk_koperasi: no_induk_koperasi,
      status_nik: status_nik,
      status_grade: status_grade,
      hp_pengurus: hp_pengurus,
      email_pengurus: email_pengurus,
    });            
    if (
      nama_koperasi === "" ||
      alamat === "" ||
      this.fcselectkelurahan.value.split(',')[1] === undefined ||
      this.fcselectkecamatan.value.split(',')[1] === undefined ||
      this.fcselectkabupaten.value.split(',')[1] === undefined ||
      this.fcselectprovinsi.value.split(',')[1] === undefined ||
      jenis_koperasi === "" ||
      nama_ketua === "" ||
      total_karyawan === "" ||
      no_induk_koperasi === "" ||
      hp_pengurus === "" ||
      email_pengurus === ""
    ) {
      this.trigeralerts = true;
      this.state.valuestatealerts = {
        type: "danger",
        content: "Form dengan label merah tidak boleh kosong",
      };
      setTimeout(() => {
        this.trigeralerts = false;
      }, 5000);
    } else {      
      if (this.phonenumber(hp_pengurus) === false) {
        this.trigeralerts = true;
        this.state.valuestatealerts = {
          type: "danger",
          content: "Invalid phone format",
        };
        setTimeout(() => {
          this.trigeralerts = false;
        }, 3000);
      } else if (this.validateEmail(email_pengurus) === false) {
        this.trigeralerts = true;
        this.state.valuestatealerts = {
          type: "danger",
          content: "Invalid email format",
        };
        setTimeout(() => {
          this.trigeralerts = false;
        }, 3000);
      }
      if (
        this.phonenumber(hp_pengurus) === true &&
        this.validateEmail(email_pengurus) === true
      ) {
        const formData: FormData = new FormData();
        formData.append("nama_koperasi", this.form.get('nama_koperasi').value);
        formData.append("no_badan_hukum", this.form.get('no_badan_hukum').value);
        formData.append("tgl_badan_hukum", this.form.get('tgl_badan_hukum').value);
        formData.append("no_perubahan_anggaran_dasar", this.form.get('no_perubahan_anggaran_dasar').value);
        formData.append("tgl_perubahan_anggaran_dasar", this.form.get('tgl_perubahan_anggaran_dasar').value);
        formData.append("tgl_rat_terakhir", this.form.get('tgl_rat_terakhir').value);
        formData.append("alamat", this.form.get('alamat').value);
        formData.append("kelurahan_desa", this.form.get('kelurahan_desa').value);
        formData.append("kecamatan", this.form.get('kecamatan').value);
        formData.append("kabupaten", this.form.get('kabupaten').value);
        formData.append("provinsi", this.form.get('provinsi').value);
        formData.append("bentuk_koperasi", this.form.get('bentuk_koperasi').value);
        formData.append("jenis_koperasi", this.form.get('jenis_koperasi').value);
        formData.append("kelompok_koperasi", this.form.get('kelompok_koperasi').value);
        formData.append("sektor_usaha", this.form.get('sektor_usaha').value);
        formData.append("nama_ketua", this.form.get('nama_ketua').value);
        formData.append("nama_sekretaris", this.form.get('nama_sekretaris').value);
        formData.append("nama_bendahara", this.form.get('nama_bendahara').value);
        formData.append("foto_ktp_ketua", this.form.get('foto_ktp_ketua').value);
        formData.append("jml_anggota_pria", this.form.get('jml_anggota_pria').value);
        formData.append("jml_anggota_wanita", this.form.get('jml_anggota_wanita').value);
        formData.append("total_anggota", this.form.get('total_anggota').value);
        formData.append("total_manajer", this.form.get('total_manajer').value);
        formData.append("total_karyawan", this.form.get('total_karyawan').value);
        formData.append("no_induk_koperasi", this.form.get('no_induk_koperasi').value);
        formData.append("status_nik", this.form.get('status_nik').value);
        formData.append("status_grade", this.form.get('status_grade').value);
        formData.append("hp_pengurus", this.form.get('hp_pengurus').value);
        formData.append("email_pengurus", this.form.get('email_pengurus').value);
        this.apiservice.postkoperasiwithimage(formData).subscribe(data => {
              if (data['data'] !== ''){
                this.contentstatusmodal = data['message']
                this.showmodalsuccess = true;
              }else{
                this.contentstatusmodal = data['message']
                this.showmodalerror = true;
              }  
        })
      }
    }
  }
  validateEmail(input) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  }
  phonenumber(input) {
    if (input.toString().length < 10 || input.toString().length > 12) {
      return false;
    } else {
      return true;
    }
  }
  loadprovinsi(){
    this.apiservice.getcorelocation().subscribe(data => {
      data.forEach(element => {
          let dataobj = {
            id:element.id,
            name:element.name
          }
          this.listprovinsi.push(dataobj)
      });
    })
  }
  loadkabupaten(){
    this.apiservice.getcorelocation().subscribe(data => {      
      data.forEach(element => {
        element.regencies.forEach(element => {
           if (element.province_id === this.fcselectprovinsi.value.split(',')[0]){
          let dataobj = {
            id:element.id,
            name:element.name
          }
          this.listkabupaten.push(dataobj)
        }
        });
      });
    })
  }
  loadkecamatan(){
    this.apiservice.getcorelocation().subscribe(data => {      
      data.forEach(element => {
        element.regencies.forEach(element => {
            element.districts.forEach(element => {
              if (element.regency_id === this.fcselectkabupaten.value.split(',')[0]){
                let dataobj = {
                  id:element.id,
                  name:element.name
                }
                this.listkecamatan.push(dataobj)
              }     
            })
        });
      });
    })
  }
  loadkelurahan(){
    this.apiservice.getcorelocation().subscribe(data => {      
      data.forEach(element => {
        element.regencies.forEach(element => {
            element.districts.forEach(element => {
              element.villages.forEach(element => {
                if (element.district_id === this.fcselectkecamatan.value.split(',')[0]){
                  let dataobj = {
                    id:element.id,
                    name:element.name
                  }
                  this.listkelurahan.push(dataobj)
                }     
              });  
            })
        });
      });
    })
  }
  changeprovinsi(){
    this.listkabupaten = [];
    this.listkecamatan = [];
    this.listkelurahan = []
    this.loadkabupaten();
  }
  changekabupaten(){
    this.listkecamatan= [];
    this.listkelurahan = [];
    this.loadkecamatan();
  }
  changekecamatan(){
    this.listkelurahan = [];
    this.loadkelurahan();
  }
  closemodaldialog(status){
    if (status === 'success'){
      window.location.reload();
    }else{  
        this.showmodalerror = false;
    }
  }
}
