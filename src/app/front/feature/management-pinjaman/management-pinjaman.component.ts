
import { BoundElementProperty } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, ValidatorFn, Validators } from '@angular/forms';
import { ContentService, NotificationService } from '@app/core';
import * as CryptoJS from 'crypto-js';
import { ComponentLoaderFactory, idLocale } from 'ngx-bootstrap';
import { ignoreElements } from 'rxjs/operators';
@Component({
  selector: 'app-management-pinjaman',
  templateUrl: './management-pinjaman.component.html',
  styleUrls: ['./management-pinjaman.component.scss']
})
export class ManagementPinjamanComponent implements OnInit {
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
  constructor(
    private contentSvc: ContentService,
    public fb: FormBuilder,
    private notifSvc: NotificationService
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
          this.dataloandetailloan = result.data.loan
          this.dataloandetailproduk = result.data.produk
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
}
