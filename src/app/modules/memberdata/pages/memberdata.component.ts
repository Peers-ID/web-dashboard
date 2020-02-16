import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
@Component({
  selector: "app-memberdata",
  templateUrl: "./memberdata.component.html",
  styleUrls: ["./memberdata.component.scss"]
})
export class MemberdataComponent implements OnInit {
  titlepage: string;
  checkBoxValue: any = false;
  getjenisidentitas: boolean = false;
  getnoidentitas: boolean = false;
  getnamalengkapsesuaiktp: boolean = false;
  gettanggallahir: boolean = false;
  getjeniskelamin: boolean = false;
  getnamagadisibukandung: boolean = false;
  getstatusperkawinan: boolean = false;
  getpendidikanterakhir: boolean = false;
  getjalan: boolean = false;
  getnomer: boolean = false;
  getrt: boolean = false;
  getrw: boolean = false;
  getkelurahan: boolean = false;
  getkecamatan: boolean = false;
  getstatustempattinggalktp: boolean = false;
  getlamatinggalktp: boolean = false;
  getapakahalamatsesuaidomisili: boolean = false;
  getdomisilijalan: boolean = false;
  getdomisilinomer: boolean = false;
  getdomisilirt: boolean = false;
  getdomisilirw: boolean = false;
  getdomisilikelurahan: boolean = false;
  getdomisilikecamatan: boolean = false;
  getkotaprovinsi: boolean = false;
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
  getalamatkantorkelurahan: boolean = false;
  getalamatkantorkecamatan: boolean = false;
  getalamatkantorkotaprovinsi: boolean = false;
  getnama: boolean = false;
  getnohandphone: boolean = false;
  gethubungan: boolean = false;
  constructor() {}

  ngOnInit() {
    if (window.location.pathname.split("/")[1] !== "peers") {
      this.titlepage = window.location.pathname.split("/")[1];
    } else {
      this.titlepage = window.location.pathname.split("/")[2];
    }
    $("body").addClass("sidebar-collapse");
  }

  FieldsChange(values, name) {
    console.log(name);
    
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
        this.getjalan= values.currentTarget.checked;
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
      case "domisilikelurahan":
        this.getdomisilikelurahan = values.currentTarget.checked;
        break;
      case "domisilikecamatan":
        this.getdomisilikecamatan = values.currentTarget.checked;
        break;
      case "kotaprovinsi":
        this.getkotaprovinsi = values.currentTarget.checked;
        break;
      case "statustempattinggal":
        this.getstatustempattinggal = values.currentTarget.checked;
        break;
      case "lamatinggal":
        this.getlamatinggal = values.currentTarget.checked;
        break;
      case "memilikinpwp":
        this.getmemilikinpwp= values.currentTarget.checked;
        break;
      case "nomernpwp":
        this.getnomernpwp= values.currentTarget.checked;
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
      case "alamatkantorkotaprovinsi":
        this.getalamatkantorkotaprovinsi= values.currentTarget.checked;
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
    }
  }
  savepersonal() {
  }
  saveaddress() {
  }
  saveoccupation() {
  }
  saveemergency() {
  }
}
