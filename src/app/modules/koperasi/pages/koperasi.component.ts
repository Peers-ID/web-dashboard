import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ApiService } from "../../../core/services/api/api.service";
import { StatemanagementService } from "../../../core/services/statemanagement/statemanagement.service";
import * as $ from "jquery";
@Component({
  selector: "app-koperasi",
  templateUrl: "./koperasi.component.html",
  styleUrls: ["./koperasi.component.scss"]
})
export class KoperasiComponent implements OnInit {
  data: any;
  titlepage: string;
  trigeralerts: boolean = false;
  showmodalerror:boolean = false;
  showmodalsuccess:boolean = false;
  messagekoperasiregistration:string;
  constructor(private apiservice: ApiService,
    private state: StatemanagementService,
    ) {}
  @ViewChild("imageInput", { static: false }) imageInput: ElementRef;
  ngOnInit() {
  
  
        if (window.location.pathname.split("/")[1] !== "peers") {
      this.titlepage = window.location.pathname.split("/")[1];
    } else {
      this.titlepage = window.location.pathname.split("/")[2];
    }
    $("body").addClass("sidebar-collapse");
  }
  processFile(event) {
    this.data = new FormData();
    this.data.append("file",this.imageInput.nativeElement.files[0])
  }
  savekoperasi(
    nama_koperasi,
    no_badan_hukum,
    tgl_badan_hukum,
    no_perubahan_anggaran_dasar,
    tgl_perubahan_anggaran_dasar,
    tgl_rat_terakhir,
    alamat,
    kelurahan_desa,
    kecamatan,
    kabupaten,
    provinsi,
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
    if ( nama_koperasi === '' || alamat === '' || kelurahan_desa === '' || kecamatan === '' || kabupaten === '' || provinsi === ''||
    jenis_koperasi === '' || nama_ketua === '' || total_karyawan === '' || no_induk_koperasi === '' || hp_pengurus === '' || email_pengurus === ''){
          this.trigeralerts = true;
          this.state.valuestatealerts = {
            type: "danger",
            content: 'Form dengan label merah tidak boleh kosong'
          };
          setTimeout(() => {
            this.trigeralerts = false;
          }, 5000)
    }else{
      if (this.phonenumber(hp_pengurus) === false) {
        this.trigeralerts = true;
        this.state.valuestatealerts = {
          type: "danger",
          content: "Invalid phone format"
        };
        setTimeout(() => {
          this.trigeralerts = false;
        }, 3000);
      }else  if (this.validateEmail(email_pengurus) === false) {
        this.trigeralerts = true;
        this.state.valuestatealerts = {
          type: "danger",
          content: "Invalid email format"
        };
        setTimeout(() => {
          this.trigeralerts = false;
        }, 3000);
      }
      if (
        this.phonenumber(hp_pengurus) === true &&
        this.validateEmail(email_pengurus) === true
      ){
  this.apiservice
      .postdatakoperasi(
        nama_koperasi,
        no_badan_hukum,
        tgl_badan_hukum,
        no_perubahan_anggaran_dasar,
        tgl_perubahan_anggaran_dasar,
        tgl_rat_terakhir,
        alamat,
        kelurahan_desa,
        kecamatan,
        kabupaten,
        provinsi,
        bentuk_koperasi,
        jenis_koperasi,
        kelompok_koperasi,
        sektor_usaha,
        nama_ketua,
        nama_sekretaris,
        nama_bendahara,
        'name.png',
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
      )
      .subscribe(data => {
        if (data['data'] !== ''){
          this.state.valuestatusmodal = {
            content: data['message']
          };
          this.showmodalsuccess = true;
        }else{
          this.state.valuestatusmodal = {
            content: data['message']
          };
          this.showmodalerror = true;
        }
      });
        
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
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (input.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  }
}
