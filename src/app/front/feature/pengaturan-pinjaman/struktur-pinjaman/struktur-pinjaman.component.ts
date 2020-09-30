import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, ValidatorFn, Validators } from '@angular/forms';
import { ContentService, NotificationService } from '@app/core';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-struktur-pinjaman',
  templateUrl: './struktur-pinjaman.component.html',
  styleUrls: ['./struktur-pinjaman.component.scss']
})
export class StrukturPinjamanComponent implements OnInit {
  @ViewChild('strukturmodal', { static: false }) public strukturmodal: any;
  formgrouppostdata: FormGroup;
  statusmodal: string;
  namaprodukFc: FormControl = new FormControl();
  tenorFc: FormControl = new FormControl();
  optiontenorFc: FormControl = new FormControl();
  bungaFc: FormControl = new FormControl();
  optionbungaFc: FormControl = new FormControl();
  biayaadminFc: FormControl = new FormControl();
  optionbiayaprovisiFc: FormControl = new FormControl();
  provisiFc: FormControl = new FormControl();
  optionsimpananpokokFc: FormControl = new FormControl();
  simpananpokokFc: FormControl = new FormControl();
  simpananwajibFc: FormControl = new FormControl();
  dendaketerlambatanFc: FormControl = new FormControl();
  dendapelunasanawalFc: FormControl = new FormControl();
  typedendaketerlambatanFc: FormControl = new FormControl();
  typepelunasanawalFc: FormControl = new FormControl();
  loadingshow: boolean;
  datashow: boolean;
  liststruktur = [];
  produkshow: boolean;
  iddata:any;
  constructor(
    private contentSvc: ContentService,
    public fb: FormBuilder,
    private notifSvc: NotificationService
  ) {
    this.datashow = true;
    this.produkshow = false;
    this.provisiFc.disable()
    this.simpananpokokFc.disable()
    this.dendaketerlambatanFc.disable()
    this.dendapelunasanawalFc.disable()
  }

  ngOnInit() {
    this.contentSvc.getParameter().subscribe(
      result => {
        if (result) {
          this.typedendaketerlambatanFc.setValue(result.data[0].type_denda_keterlambatan)
          this.typepelunasanawalFc.setValue(result.data[0].type_pelunasan_dipercepat)
          if (this.typedendaketerlambatanFc.value !== '')this.dendaketerlambatanFc.enable()      
          else this.dendaketerlambatanFc.disable()
          if (this.typepelunasanawalFc.value !== '')this.dendapelunasanawalFc.enable()      
          else this.dendapelunasanawalFc.disable()
        }
      }
    )
    this.getdata();
  }
  getdata() {
    this.liststruktur = []
    this.contentSvc.getProduct().subscribe(
      result => {
        if (result) {
          this.resetform();
          this.datashow = false;
          result.data.forEach(element => {
            this.liststruktur.push(element)
          });
        }
      }
    )
  }
  tambahproduk() {
    this.statusmodal = 'create'
    this.produkshow = true;
    this.strukturmodal.show();
    this.resetform();
    if (this.optionbiayaprovisiFc.value !== '' )this.provisiFc.enable()
    else this.provisiFc.disable()
    if (this.optionsimpananpokokFc.value !== '' )this.simpananpokokFc.enable()
        else this.simpananpokokFc.disable()
  }
  editaktif(id) {
    this.statusmodal = 'active'
    this.strukturmodal.show();
    this.loadeditdataproduct(id);
    this.iddata = id
  }
  changetypeselect(type) {
    switch (type) {
      case 'biayaprovisi':
        if (this.optionbiayaprovisiFc.value !== '' )this.provisiFc.enable()
        else this.provisiFc.disable()
        break;
      case 'simpananpokok':
        if (this.optionsimpananpokokFc.value !== '' )this.simpananpokokFc.enable()
        else this.simpananpokokFc.disable()
        break;
    }
  }
  loadeditdataproduct(id: any) {
    this.resetform()
    this.produkshow = false
    this.contentSvc.getProductbyId(id).subscribe(
      result => {
        if (result) {
          this.produkshow = true
          this.namaprodukFc.setValue(result.data[0].nama_produk)
          console.log(result.data[0]);
          setTimeout(() => {
            this.pushdataform(result.data[0].nama_produk, result.data[0].tenor, result.data[0].satuan_tenor,
              result.data[0].bunga, result.data[0].tenor_bunga, result.data[0].admin, result.data[0].provisi, result.data[0].type_provisi,
              result.data[0].simpanan_pokok, result.data[0].type_simpanan_pokok, result.data[0].simpanan_wajib, result.data[0].denda_keterlambatan,
              result.data[0].pelunasan_dipercepat)
          }, 100);
        }
      }
    )
  }

  pushdataform(nama: any, tenor: any, optiontenor: any, bunga: any, optionbunga: any, biayaadmin: any, provisi: any, optionprovisi: any, simpananpokok: any,
    optionsimpananpokok: any, simpananwajib: any, dendaketerlambatan: any, dendapelunasanawal: any) {
    this.namaprodukFc.setValue(nama)
    this.tenorFc.setValue(tenor)
    this.optiontenorFc.setValue(optiontenor)
    this.bungaFc.setValue(bunga)
    this.optionbungaFc.setValue(optionbunga)
    this.biayaadminFc.setValue(biayaadmin)
    this.provisiFc.setValue(provisi === 0 ? '' : provisi)
    this.optionbiayaprovisiFc.setValue(optionprovisi)
    this.simpananpokokFc.setValue(simpananpokok === 0 ? '' : simpananpokok)
    this.optionsimpananpokokFc.setValue(optionsimpananpokok)
    this.simpananwajibFc.setValue(simpananwajib)
    this.dendaketerlambatanFc.setValue(dendaketerlambatan)
    this.dendapelunasanawalFc.setValue(dendapelunasanawal)
    if (this.optionbiayaprovisiFc.value !== '' )this.provisiFc.enable()
    else this.provisiFc.disable()
    if (this.optionsimpananpokokFc.value !== '' )this.simpananpokokFc.enable()
        else this.simpananpokokFc.disable()
  }
  resetform() {
    this.namaprodukFc.setValue('')
    this.tenorFc.setValue('')
    this.optiontenorFc.setValue('')
    this.bungaFc.setValue('')
    this.optionbungaFc.setValue('')
    this.biayaadminFc.setValue('')
    this.provisiFc.setValue('')
    this.optionbiayaprovisiFc.setValue('')
    this.simpananpokokFc.setValue('')
    this.optionsimpananpokokFc.setValue('')
    this.simpananwajibFc.setValue('')
    this.dendaketerlambatanFc.setValue('')
    this.dendapelunasanawalFc.setValue('')
  }
  editnonaktif(id) {
    this.statusmodal = 'inactive'
    this.strukturmodal.show();
    this.loadeditdataproduct(id);
    this.iddata = id
  }
  aktivasi(type) {
    this.postdata(type)
  }

  postdata(type: string) {
    this.loadingshow = true;
    if (this.optionbiayaprovisiFc.value === '')this.provisiFc.setValue(0)
    if (this.optionsimpananpokokFc.value === '')this.simpananpokokFc.setValue(0)
    this.biayaadminFc.setValue(this.biayaadminFc.value === '' ? 0 : this.biayaadminFc.value)
    this.simpananwajibFc.setValue(this.simpananwajibFc.value === '' ? 0 : this.simpananwajibFc.value)
    this.formgrouppostdata = this.fb.group({
      "nama_produk": [this.namaprodukFc.value, [Validators.required]],
      "tenor": [this.tenorFc.value, [Validators.required]],
      "satuan_tenor": [this.optiontenorFc.value, [Validators.required]],
      "bunga": [this.bungaFc.value, [Validators.required]],
      "tenor_bunga": [this.optionbungaFc.value, [Validators.required]],
      "admin": [this.biayaadminFc.value, [Validators.required]],
      "provisi": [this.provisiFc.value],
      "type_provisi": [this.optionbiayaprovisiFc.value],
      "simpanan_pokok": [this.simpananpokokFc.value],
      "type_simpanan_pokok": [this.optionsimpananpokokFc.value],
      "simpanan_wajib": [this.simpananwajibFc.value, [Validators.required]],
      "denda_keterlambatan": [this.dendaketerlambatanFc.value, [Validators.required]],
      "type_denda_keterlambatan": [this.typedendaketerlambatanFc.value, [Validators.required]],
      "pelunasan_dipercepat": [this.dendapelunasanawalFc.value, [Validators.required]],
      "type_pelunasan_dipercepat": [this.typepelunasanawalFc.value, [Validators.required]]
    });
    if (this.formgrouppostdata.status === "VALID") {
      switch (type) {
        case 'create':
          this.contentSvc.postProduct(this.formgrouppostdata.value).subscribe(
            result => {
              if (result.status !== 500 ) {
                this.loadingshow = false;
                this.strukturmodal.hide();
                this.notifSvc.addNotification({
                  type: 'success',
                  head: 'Success',
                  body: result.message
                });
                this.getdata();
              }else{
                this.loadingshow = false;
                this.strukturmodal.hide();
                this.notifSvc.addNotification({
                  type: 'danger',
                  head: 'Danger',
                  body: result.message
                });
                this.getdata();
              }
            }
          )
          break;
        case 'edit':
          setTimeout(() => {
            this.loadingshow = false
          }, 500);
          break;
        case 'statusnonaktif':
          let dataaktif = {
            "id": this.iddata,
            "status": "inactive"
          }
          this.contentSvc.updatestatusProduct(dataaktif).subscribe(
            result => {
              if (result.status !== 500 ) {
                this.loadingshow = false;
                this.strukturmodal.hide();
                this.notifSvc.addNotification({
                  type: 'success',
                  head: 'Success',
                  body: result.message
                });
                this.getdata();
              }else{
                this.loadingshow = false;
                this.strukturmodal.hide();
                this.notifSvc.addNotification({
                  type: 'danger',
                  head: 'Danger',
                  body: result.message
                });
                this.getdata();
              }
            }
          )
          break;
        case 'statusaktif':
          let datanonaktif = {
            "id": this.iddata,
            "status": "active"
          }
          this.contentSvc.updatestatusProduct(datanonaktif).subscribe(
            result => {
              if (result.status !== 500 ) {
                this.loadingshow = false;
                this.strukturmodal.hide();
                this.notifSvc.addNotification({
                  type: 'success',
                  head: 'Success',
                  body: result.message
                });
                this.getdata();
              }else{
                this.loadingshow = false;
                this.strukturmodal.hide();
                this.notifSvc.addNotification({
                  type: 'danger',
                  head: 'Danger',
                  body: result.message
                });
                this.getdata();
              }
            }
          )
          break;
      }
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
  btnnonaktif(type) {
    this.postdata(type)
  }
  btnaktif(type) {
    this.postdata(type)
  }
  ubah(type) {
    this.postdata(type)
  }
  percentinput() {
    // this.bungaFc.setValue(parseInt(this.bungaFc.value).toLocaleString())
  }
  simpananwajib() {
    // console.log(parseInt(this.simpananwajibFc.value).toLocaleString());
    // this.simpananwajibFc.setValue(parseInt(this.simpananwajibFc.value).toLocaleString())
  }
}
