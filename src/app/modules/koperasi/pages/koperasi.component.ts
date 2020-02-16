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
            content: 'Form cannot null'
          };
          setTimeout(() => {
            this.trigeralerts = false;
          }, 5000)
    }else{
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
        if (data['message'] == 'Success. Koperasi created!'){
          this.trigeralerts = true;
          this.state.valuestatealerts = {
            type: "success",
            content: data['message']
          };
          setTimeout(() => {
            this.trigeralerts = false;
          }, 5000)
        }else{
          this.trigeralerts = true;
          this.state.valuestatealerts = {
            type: "danger",
            content: data['message']
          };
          setTimeout(() => {
            this.trigeralerts = false;
          }, 5000)
        }
      });
    }
  
  }
}
