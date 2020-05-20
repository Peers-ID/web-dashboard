import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { ApiService } from "../../../core/services/api/api.service";
import { StatemanagementService } from "../../../core/services/statemanagement/statemanagement.service";
@Component({
  selector: "app-memberdata",
  templateUrl: "./memberdata.component.html",
  styleUrls: ["./memberdata.component.scss"]
})
export class MemberdataComponent implements OnInit {
  titlepage: string;
  showsuccessmodal: boolean = false;
  showerrormodal: boolean = false;
  checkBoxValue: any = false;
  getjenisidentitas: boolean = true;
  getnoidentitas: boolean = false;
  getnamalengkapsesuaiktp: boolean = false;
  gettanggallahir: boolean = false;
  gettempatlahir:boolean = false;
  getjeniskelamin: boolean = false;
  getnamagadisibukandung: boolean = false;
  getstatusperkawinan: boolean = false;
  getpendidikanterakhir: boolean = false;
  getjalan: boolean = false;
  getnomer: boolean = false;
  getrt: boolean = false;
  getrw: boolean = false;
  getprovinsi: boolean = false;
  getkota: boolean = false;
  getkecamatan: boolean = false;
  getkelurahan: boolean = false;
  getstatustempattinggalktp: boolean = false;
  getlamatinggalktp: boolean = false;
  getapakahalamatsesuaidomisili: boolean = false;
  getdomisilijalan: boolean = false;
  getdomisilinomer: boolean = false;
  getdomisilirt: boolean = false;
  getdomisilirw: boolean = false;
  getdomisiliprovinsi: boolean = false;
  getdomisilikota: boolean = false;
  getdomisilikecamatan: boolean = false;
  getdomisilikelurahan: boolean = false;
  getstatustempattinggal: boolean = false;
  getlamatinggal: boolean = false;
  getmemilikinpwp: boolean = false;
  getnomernpwp: boolean = false;
  getpekerjausaha: boolean = false;
  getbidangpekerjaanusaha: boolean = false;
  getposisijabatan: boolean = false;
  getnamaperusahaanusaha: boolean = false;
  getlamabekerjausaha: boolean = false;
  getpenghasilanomsetusaha: boolean = false;
  getalamatkantorjalan: boolean = false;
  getalamatkantornomer: boolean = false;
  getalamatkantorrt: boolean = false;
  getalamatkantorrw: boolean = false;
  getalamatkantorprovinsi: boolean = false;
  getalamatkantorkota: boolean = false;
  getalamatkantorkecamatan: boolean = false;
  getalamatkantorkelurahan: boolean = false;
  getnama: boolean = false;
  getnohandphone: boolean = false;
  gethubungan: boolean = false;
  contentstatusmodal:any;
  constructor(private api: ApiService, private state: StatemanagementService) {}

  ngOnInit() {
    if (window.location.pathname.split("/")[1] !== "peers") {
      this.titlepage = window.location.pathname.split("/")[1];
    } else {
      this.titlepage = window.location.pathname.split("/")[2];
    }
    // $("body").addClass("sidebar-collapse");
    this.getdatamemberinit();
  }

  FieldsChange(values, name, datagetres) {
    switch (name) {
      case "jenisidentitas":
        this.getjenisidentitas = values.currentTarget.checked;
        break;
      case "noidentitas":
        this.getnoidentitas = values.currentTarget.checked;
        break;
      case "namalengkapsesuaiktp":
        this.getnamalengkapsesuaiktp = values.currentTarget.checked;
        break;
      case "tanggallahir":
        this.gettanggallahir = values.currentTarget.checked;
        break;
        case "tempatlahir":
        this.gettempatlahir = values.currentTarget.checked;
        break;
      case "jeniskelamin":
        this.getjeniskelamin = values.currentTarget.checked;
        break;
      case "namagadisibukandung":
        this.getnamagadisibukandung = values.currentTarget.checked;
        break;
      case "statusperkawinan":
        this.getstatusperkawinan = values.currentTarget.checked;
        break;
      case "pendidikanterakhir":
        this.getpendidikanterakhir = values.currentTarget.checked;
        break;
      case "jalan":
        this.getjalan = values.currentTarget.checked;
        break;
      case "nomer":
        this.getnomer = values.currentTarget.checked;
        break;
      case "rt":
        this.getrt = values.currentTarget.checked;
        break;
      case "rw":
        this.getrw = values.currentTarget.checked;
        break;
      case "provinsi":
        this.getprovinsi = values.currentTarget.checked;
        break;
      case "kota":
        this.getkota = values.currentTarget.checked;
        break;
      case "kelurahan":
        this.getkelurahan = values.currentTarget.checked;
        break;
      case "kecamatan":
        this.getkecamatan = values.currentTarget.checked;
        break;
      case "statustempattinggalktp":
        this.getstatustempattinggalktp = values.currentTarget.checked;
        break;
      case "lamatinggalktp":
        this.getlamatinggalktp = values.currentTarget.checked;
        break;
      case "apakahalamatsesuaidomisili":
        this.getapakahalamatsesuaidomisili = values.currentTarget.checked;
        break;
      case "domisilijalan":
        this.getdomisilijalan = values.currentTarget.checked;
        break;
      case "domisilinomer":
        this.getdomisilinomer = values.currentTarget.checked;
        break;
      case "domisilirt":
        this.getdomisilirt = values.currentTarget.checked;
        break;
      case "domisilirw":
        this.getdomisilirw = values.currentTarget.checked;
        break;
      case "domisiliprovinsi":
        this.getdomisiliprovinsi = values.currentTarget.checked;
        break;
      case "domisilikota":
        this.getdomisilikota = values.currentTarget.checked;
        break;
      case "domisilikelurahan":
        this.getdomisilikelurahan = values.currentTarget.checked;
        break;
      case "domisilikecamatan":
        this.getdomisilikecamatan = values.currentTarget.checked;
        break;
      case "statustempattinggal":
        this.getstatustempattinggal = values.currentTarget.checked;
        break;
      case "lamatinggal":
        this.getlamatinggal = values.currentTarget.checked;
        break;
      case "memilikinpwp":
        this.getmemilikinpwp = values.currentTarget.checked;
        break;
      case "nomernpwp":
        this.getnomernpwp = values.currentTarget.checked;
        break;
      case "pekerjausaha":
        this.getpekerjausaha = values.currentTarget.checked;
        break;
      case "bidangpekerjaanusaha":
        this.getbidangpekerjaanusaha = values.currentTarget.checked;
        break;
      case "posisijabatan":
        this.getposisijabatan = values.currentTarget.checked;
        break;
      case "namaperusahaanusaha":
        this.getnamaperusahaanusaha = values.currentTarget.checked;
        break;
      case "lamabekerjausaha":
        this.getlamabekerjausaha = values.currentTarget.checked;
        break;
      case "penghasilanomsetusaha":
        this.getpenghasilanomsetusaha = values.currentTarget.checked;
        break;
      case "alamatkantorjalan":
        this.getalamatkantorjalan = values.currentTarget.checked;
        break;
      case "alamatkantornomer":
        this.getalamatkantornomer = values.currentTarget.checked;
        break;
      case "alamatkantorrt":
        this.getalamatkantorrt = values.currentTarget.checked;
        break;
      case "alamatkantorrw":
        this.getalamatkantorrw = values.currentTarget.checked;
        break;
      case "alamatkantorkelurahan":
        this.getalamatkantorkelurahan = values.currentTarget.checked;
        break;
      case "alamatkantorkecamatan":
        this.getalamatkantorkecamatan = values.currentTarget.checked;
        break;
      case "alamatkantorprovinsi":
        this.getalamatkantorprovinsi = values.currentTarget.checked;
        break;
      case "alamatkantorkota":
        this.getalamatkantorkota = values.currentTarget.checked;
        break;
      case "nama":
        this.getnama = values.currentTarget.checked;
        break;
      case "nohandphone":
        this.getnohandphone = values.currentTarget.checked;
        break;
      case "hubungan":
        this.gethubungan = values.currentTarget.checked;
        break;
      case "emptydata":
        this.getjenisidentitas = true;
        this.getnoidentitas = true;
        this.getnamalengkapsesuaiktp = true;
        this.gettanggallahir = true;
        this.gettempatlahir = true;
        this.getjeniskelamin = true;
        this.getnamagadisibukandung = true;
        this.getstatusperkawinan = true;
        this.getpendidikanterakhir = true;
        this.getjalan = true;
        this.getnomer = true;
        this.getrt = true;
        this.getrw = true;
        this.getprovinsi = true;
        this.getkota = true;
        this.getkecamatan = true;
        this.getkelurahan = true;
        this.getstatustempattinggalktp = true;
        this.getlamatinggalktp = true;
        this.getapakahalamatsesuaidomisili = true;
        this.getdomisilijalan = true;
        this.getdomisilinomer = true;
        this.getdomisilirt = true;
        this.getdomisilirw = true;
        this.getdomisiliprovinsi = true;
        this.getdomisilikota = true;
        this.getdomisilikecamatan = true;
        this.getdomisilikelurahan = true;
        this.getstatustempattinggal = true;
        this.getlamatinggal = true;
        this.getmemilikinpwp = true;
        this.getnomernpwp = true;
        this.getpekerjausaha = true;
        this.getbidangpekerjaanusaha = true;
        this.getposisijabatan = true;
        this.getnamaperusahaanusaha = true;
        this.getlamabekerjausaha = true;
        this.getpenghasilanomsetusaha = true;
        this.getalamatkantorjalan = true;
        this.getalamatkantornomer = true;
        this.getalamatkantorrt = true;
        this.getalamatkantorrw = true;
        this.getalamatkantorprovinsi = true;
        this.getalamatkantorkota = true;
        this.getalamatkantorkecamatan = true;
        this.getalamatkantorkelurahan = true;
        this.getnama = true;
        this.getnohandphone = true;
        this.gethubungan = true;
        break;
      case "notemptydata":
        this.getjenisidentitas = datagetres[0].jenis_identitas ? true : false;
        this.getnoidentitas = datagetres[0].no_identitas ? true : false;
        this.getnamalengkapsesuaiktp = datagetres[0].nama_lengkap
          ? true
          : false;
        this.gettanggallahir = datagetres[0].tanggal_lahir ? true : false;
        this.gettempatlahir = datagetres[0].tempat_lahir ? true : false;
        this.getjeniskelamin = datagetres[0].jenis_kelamin ? true : false;
        this.getnamagadisibukandung = datagetres[0].nama_gadis_ibu
          ? true
          : false;
        this.getstatusperkawinan = datagetres[0].status_perkawinan
          ? true
          : false;
        this.getpendidikanterakhir = datagetres[0].pendidikan_terakhir
          ? true
          : false;
        this.getjalan = datagetres[0].alamat_ktp_jalan ? true : false;
        this.getnomer = datagetres[0].alamat_ktp_nomer ? true : false;
        this.getrt = datagetres[0].alamat_ktp_rt ? true : false;
        this.getrw = datagetres[0].alamat_ktp_rw ? true : false;
        this.getkelurahan = datagetres[0].alamat_ktp_kelurahan ? true : false;
        this.getprovinsi = datagetres[0].alamat_ktp_provinsi ? true : false;
        this.getkota = datagetres[0].alamat_ktp_kota ? true : false;
        this.getkecamatan = datagetres[0].alamat_ktp_kecamatan ? true : false;
        this.getstatustempattinggalktp = datagetres[0]
          .alamat_ktp_status_tempat_tinggal
          ? true
          : false;
        this.getlamatinggalktp = datagetres[0].alamat_ktp_lama_tinggal
          ? true
          : false;
        this.getapakahalamatsesuaidomisili = datagetres[0].domisili_sesuai_ktp
          ? true
          : false;
        this.getdomisilijalan = datagetres[0].alamat_domisili_jalan
          ? true
          : false;
        this.getdomisilinomer = datagetres[0].alamat_domisili_nomer
          ? true
          : false;
        this.getdomisilirt = datagetres[0].alamat_domisili_rt ? true : false;
        this.getdomisilirw = datagetres[0].alamat_domisili_rw ? true : false;
        this.getdomisilikelurahan = datagetres[0].alamat_domisili_kelurahan
          ? true
          : false;
        this.getdomisilikecamatan = datagetres[0].alamat_domisili_kecamatan
          ? true
          : false;
        this.getdomisiliprovinsi = datagetres[0].alamat_domisili_provinsi
          ? true
          : false;
        this.getdomisilikota = datagetres[0].alamat_domisili_kota
          ? true
          : false;
        this.getstatustempattinggal = datagetres[0]
          .alamat_domisili_status_tempat_tinggal
          ? true
          : false;
        this.getlamatinggal = datagetres[0].alamat_domisili_lama_tempat_tinggal
          ? true
          : false;
        this.getmemilikinpwp = datagetres[0].memiliki_npwp ? true : false;
        this.getnomernpwp = datagetres[0].nomer_npwp ? true : false;
        this.getpekerjausaha = datagetres[0].pekerja_usaha ? true : false;
        this.getbidangpekerjaanusaha = datagetres[0].bidang_pekerja
          ? true
          : false;
        this.getposisijabatan = datagetres[0].posisi_jabatan ? true : false;
        this.getnamaperusahaanusaha = datagetres[0].nama_perusahaan
          ? true
          : false;
        this.getlamabekerjausaha = datagetres[0].lama_bekerja ? true : false;
        this.getpenghasilanomsetusaha = datagetres[0].penghasilan_omset
          ? true
          : false;
        this.getalamatkantorjalan = datagetres[0].alamat_kantor_jalan
          ? true
          : false;
        this.getalamatkantornomer = datagetres[0].alamat_kantor_nomer
          ? true
          : false;
        this.getalamatkantorrt = datagetres[0].alamat_kantor_rt ? true : false;
        this.getalamatkantorrw = datagetres[0].alamat_kantor_rw ? true : false;
        this.getalamatkantorkelurahan = datagetres[0].alamat_kantor_kelurahan
          ? true
          : false;
        this.getalamatkantorkecamatan = datagetres[0].alamat_kantor_kecamatan
          ? true
          : false;
        this.getalamatkantorprovinsi = datagetres[0].alamat_kantor_provinsi
          ? true
          : false;
        this.getalamatkantorkota = datagetres[0].alamat_kantor_kota
          ? true
          : false;
        this.getnama = datagetres[0].nama ? true : false;
        this.getnohandphone = datagetres[0].no_hp ? true : false;
        this.gethubungan = datagetres[0].hubungan ? true : false;
        break;
    }
  }
  savenavtab() {
    this.api
      .postalldatamember(
        JSON.parse(localStorage.getItem("currentUser")).koperasi_id,
        this.getjenisidentitas ? 1 : 0,
        this.getnoidentitas ? 1 : 0,
        this.getnamalengkapsesuaiktp ? 1 : 0,
        this.gettanggallahir ? 1 : 0,
        this.gettempatlahir ? 1 : 0,
        this.getjeniskelamin ? 1 : 0,
        this.getnamagadisibukandung ? 1 : 0,
        this.getstatusperkawinan ? 1 : 0,
        this.getpendidikanterakhir ? 1 : 0,
        this.getjalan ? 1 : 0,
        this.getnomer ? 1 : 0,
        this.getrt ? 1 : 0,
        this.getrw ? 1 : 0,
        this.getkelurahan ? 1 : 0,
        this.getkecamatan ? 1 : 0,
        this.getkota ?1 : 0,
        this.getprovinsi ?1 : 0,
        this.getstatustempattinggalktp ? 1 : 0,
        this.getlamatinggalktp ? 1 : 0,
        this.getapakahalamatsesuaidomisili ? 1 : 0,
        this.getdomisilijalan ? 1 : 0,
        this.getdomisilinomer ? 1 : 0,
        this.getdomisilirt ? 1 : 0,
        this.getdomisilirw ? 1 : 0,
        this.getdomisilikelurahan ? 1 : 0,
        this.getdomisilikecamatan ? 1 : 0,
        this.getdomisilikota ?1 : 0,
        this.getdomisiliprovinsi ?1 : 0,
        this.getstatustempattinggal ? 1 : 0,
        this.getlamatinggal ? 1 : 0,
        this.getmemilikinpwp ? 1 : 0,
        this.getnomernpwp ? 1 : 0,
        this.getpekerjausaha ? 1 : 0,
        this.getbidangpekerjaanusaha ? 1 : 0,
        this.getposisijabatan ? 1 : 0,
        this.getnamaperusahaanusaha ? 1 : 0,
        this.getlamabekerjausaha ? 1 : 0,
        this.getpenghasilanomsetusaha ? 1 : 0,
        this.getalamatkantorjalan ? 1 : 0,
        this.getalamatkantornomer ? 1 : 0,
        this.getalamatkantorrt ? 1 : 0,
        this.getalamatkantorrw ? 1 : 0,
        this.getalamatkantorkelurahan ? 1 : 0,
        this.getalamatkantorkecamatan ? 1 : 0,
        this.getalamatkantorkota ? 1 : 0,
        this.getalamatkantorprovinsi? 1 : 0,
        this.getnama ? 1 : 0,
        this.getnohandphone ? 1 : 0,
        this.gethubungan ? 1 : 0
      )
      .subscribe(data => {
        if (data["status"] === 201) {
          this.contentstatusmodal = data['message']
          this.showsuccessmodal = true;
        } else {
          this.contentstatusmodal = data['message']
          this.showerrormodal = true;
        }
      });
  }

  clicknavtab(data) {
    if (data === "personal") {
      $("#navtabpersonal").attr("href", "#personal");
    } else if (data === "address") {
      $("#navtabaddress").attr("href", "#address");
    } else if (data === "occupation") {
      $("#navtaboccupation").attr("href", "#occupation");
    } else {
      $("#navtabemergency").attr("href", "#emergency");
    }
  }

  getdatamemberinit() {
    this.api.getalldatamember().subscribe(data => {
      if (data["data"].length > 0) {
        let datacountnumber1 = 0;
        Object.values(data["data"][0]).forEach(data =>{
          if (data === 1 ){
            datacountnumber1 += data
          }
        })
        if (datacountnumber1 === 1){
            this.FieldsChange("values", "emptydata", data["data"]);
        }else{
          this.FieldsChange("values", "notemptydata", data["data"]);
        }        
      } else {
        this.FieldsChange("values", "emptydata", data["data"]);
      }
    });
  }
  closemodaldialog(status){
    if (status === 'success'){
      this.showsuccessmodal = false
    }else{  
        this.showerrormodal = false;
    }
  }
}
