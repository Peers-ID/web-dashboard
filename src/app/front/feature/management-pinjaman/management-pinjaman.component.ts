
import { BoundElementProperty } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, ValidatorFn, Validators } from '@angular/forms';
import { ContentService, NotificationService } from '@app/core';
import * as CryptoJS from 'crypto-js';
import { ComponentLoaderFactory, idLocale } from 'ngx-bootstrap';
import { ignoreElements } from 'rxjs/operators';
import { UtilService } from "@app/core/util.service";
import { environment } from '@env/environment';

@Component({
  selector: 'app-management-pinjaman',
  templateUrl: './management-pinjaman.component.html',
  styleUrls: ['./management-pinjaman.component.scss']
})
export class ManagementPinjamanComponent implements OnInit {
  baseUrl:any = environment.apiUrl;
  searchFc: FormControl = new FormControl()
  listDataSearch = []
  dataSearchShow: boolean = false;
  pinjamanshow: boolean = false;
  listdatapinjaman = []
  datapinjamanshow: boolean = false;
  trigerclick: string = 'datapribadi';
  dataloandetailmember: any;
  dataloandetailloan: any;
  dataloandetailproduk: any;
  idstatuspinjaman: any;
  idmemberpinjaman: any;
  idloanpinjaman: any
  buttontriger: string;
  btnstatusvalue: string;
  contentkonfirmasi: string;
  gettypestatus: string;
  @ViewChild('pinajamanmodal', { static: false }) public pinajamanmodal: any;
  @ViewChild('konfirmasimodal', { static: false }) public konfirmasimodal: any;
  loadingshow:boolean;
  imageKtp: string = ''
  imageKk: string = ''
  imageSuratkerja: string = ''
  imageSIM: string = ''
  imageSlipgaji: string = ''
  imageAktanikah: string = ''
  imageBPKB: string = ''
  imageDokumenlainnya: string = ''
  imageBuktiPencairan:string = ''
  constructor(
    private contentSvc: ContentService,
    public fb: FormBuilder,
    private notifSvc: NotificationService,
    public utilSvc:UtilService,
  ) { }

  ngOnInit() {
    if (!localStorage.getItem("loan")) {
      this.contentSvc.getLoanStatus().subscribe(
        result => {
          if (result) {
            var data = {
              data: result.data,
            }
            localStorage.setItem("loan", CryptoJS.AES.encrypt(JSON.stringify(data), 'secret').toString());
            this.getdata();
          }
        }
      )
    } else {
      this.getdata();
    }
  }

  navtabclick(data) {
    this.trigerclick = data
  }
  getdata() {
    this.listdatapinjaman = []
    this.contentSvc.getLoadnPending().subscribe(
      result => {
        if (result.status !== 500) {
          this.pinjamanshow = true
          result.data.forEach(element => {
            this.listdatapinjaman.push(element)
          });
        } else {
          this.listdatapinjaman = []
          this.pinjamanshow = false
        }
      }
    )
  }

  loadata(id: any) {
    this.contentSvc.getDetailLoadbyId(id).subscribe(
      result => {
        if (result.status !== 500) {
          this.dataloandetailmember = result.data.member
          if (result.data.member.dokumen_ktp) this.imageKtp = this.baseUrl+'/files/' +  result.data.member.dokumen_ktp
          if (result.data.member.dokumen_kk) this.imageKk = this.baseUrl+'/files/' +  result.data.member.dokumen_kk
          if (result.data.member.dokumen_sim) this.imageSIM = this.baseUrl+'/files/' +  result.data.member.dokumen_sim
          if (result.data.member.dokumen_keterangan_kerja) this.imageSuratkerja = this.baseUrl+'/files/' +  result.data.member.dokumen_keterangan_kerja
          if (result.data.member.dokumen_slip_gaji) this.imageSlipgaji = this.baseUrl+'/files/' +  result.data.member.dokumen_slip_gaji
          if (result.data.member.dokumen_akta_nikah) this.imageAktanikah = this.baseUrl+'/files/' +  result.data.member.dokumen_akta_nikah
          if (result.data.member.dokumen_bpkb) this.imageBPKB = this.baseUrl+'/files/' +  result.data.member.dokumen_bpkb
          if (result.data.member.dokumen_lainnya) this.imageDokumenlainnya = this.baseUrl+'/files/' +  result.data.member.dokumen_lainnya
          this.dataloandetailloan = result.data.loan
          this.dataloandetailproduk = result.data.produk
          this.dataSearchShow = false
          this.datapinjamanshow = true
          this.idstatuspinjaman = result.data.loan.id_status
          this.idloanpinjaman = result.data.loan.id
          this.idmemberpinjaman = result.data.loan.id_member
          switch (this.idstatuspinjaman) {
            case 7:
              this.buttontriger = 'setuju'
              break;
            case 3:
              this.buttontriger = 'proseskantor'
              break;
            case 4:
              this.buttontriger = 'pencairankantor'
              break;
            case 2:
              this.buttontriger = 'proseskantor'
              break;
          }
        }
      }
    )
  }
  openkonfirmasi(type) {
    switch (type) {
      case 'setuju':
        this.contentkonfirmasi = 'Apakah anda yakin menyetujui pinjaman ini?'
        break;
      case 'tolak':
        this.contentkonfirmasi = 'Apakah anda yakin menolak pinjaman ini?'
        break;
      case 'proseskantor':
        this.contentkonfirmasi = 'Pencairan pinjaman akan dilakukan dikantor?'
        break;
      case 'prosesao':
        this.contentkonfirmasi = 'Pencairan pinjaman melalui AO/CMO?'
        break;
        case 'pencairankantor':
        this.contentkonfirmasi = 'Konfirmasi pencairan dikantor'
        break;
      default:
        break;
    }
    this.pinajamanmodal.hide()
    this.konfirmasimodal.show()
    this.gettypestatus = type
  }
  btnya() {
    let idpoststatus;
    this.loadingshow = true
    switch (this.gettypestatus) {
      case 'setuju':
        idpoststatus = 3
        break;
      case 'tolak':
        idpoststatus = 8
        break;
      case 'proseskantor':
        idpoststatus = 4
        break;
        case 'prosesao':
        idpoststatus = 6
        break;
      case 'pencairankantor':
        idpoststatus = 5
        break;
      default:
        break;
    }
    const datapost = {
      "id_member": this.idmemberpinjaman,
      "id_loan": this.idloanpinjaman,
      "id_status": idpoststatus
    }
    this.konfirmasimodal.hide()
    this.contentSvc.updateloanstatus(datapost).subscribe(
      result => {
        this.loadingshow = false;
        if (result.status !== 500) {
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
        this.getdata()
      }
    )
  }
  detailloan(id: any) {
    this.pinajamanmodal.show()
    this.loadata(id)
  }
  handleBrokenImage(data: any): void {
    const imgElement: HTMLElement = data.target;
    imgElement.setAttribute('src', '');
  }
  search(){
      this.listDataSearch = []
      this.listDataSearch = this.listdatapinjaman.filter( pinjaman => pinjaman.nama_member.toLowerCase().includes(this.searchFc.value.toLowerCase()))
      this.dataSearchShow = true
  }
}
