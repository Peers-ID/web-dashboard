import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, ValidatorFn, Validators } from '@angular/forms';
import { ContentService, NotificationService } from '@app/core';
import * as CryptoJS from 'crypto-js';
import { ComponentLoaderFactory } from 'ngx-bootstrap';
import { UtilService } from "@app/core/util.service";
@Component({
  selector: 'app-struktur-pinjaman',
  templateUrl: './struktur-pinjaman.component.html',
  styleUrls: ['./struktur-pinjaman.component.scss']
})
export class StrukturPinjamanComponent implements OnInit {
  @ViewChild('strukturmodalcreate', { static: false }) public strukturmodalcreate: any;
  formgrouppostdata: FormGroup;
  statusmodal: string;
  namaprodukFc: FormControl = new FormControl();
  tenorFc: FormControl = new FormControl();
  optiontenorFc: FormControl = new FormControl();
  bungaFc: FormControl = new FormControl();
  optionbungaFc: FormControl = new FormControl();
  biayaadminFc: FormControl = new FormControl();
  optionbiayaprovisiFc: FormControl = new FormControl();
  optionasuransiFc: FormControl = new FormControl();
  optionjpkFc: FormControl = new FormControl();
  provisiFc: FormControl = new FormControl();
  asuransiFc: FormControl = new FormControl();
  jpkFc: FormControl = new FormControl();
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
  iddata: any;
  produkshowcreate: boolean;
  trigerdatavalidationketerlambatan: boolean;
  trigerdatavalidationpelunasan: boolean;
  editfieldketerlambatan: boolean = false
  editfieldpelunasan: boolean = false
  constructor(
    private contentSvc: ContentService,
    public fb: FormBuilder,
    private notifSvc: NotificationService,
    private utilSvc: UtilService
  ) {
    this.datashow = true;
    this.produkshow = false;
    this.produkshowcreate = false
    this.provisiFc.disable()
    this.asuransiFc.disable()
    this.jpkFc.disable()
    this.simpananpokokFc.disable()
    this.dendaketerlambatanFc.disable()
    this.dendapelunasanawalFc.disable()
  }

  ngOnInit() {
    this.getdata();
  }
  getparameterdata() {
    this.contentSvc.getParameter().subscribe(
      result => {
        if (result.data.length > 0) {
          this.produkshowcreate = true
          this.typedendaketerlambatanFc.setValue(result.data[0].type_denda_keterlambatan)
          this.typepelunasanawalFc.setValue(result.data[0].type_pelunasan_dipercepat)
          if (result.data[0].type_denda_keterlambatan === 'tidak') {
            this.dendaketerlambatanFc.disable()
            this.trigerdatavalidationketerlambatan = false
            this.editfieldketerlambatan = false
          } else {
            this.trigerdatavalidationketerlambatan = true
            this.dendaketerlambatanFc.enable()
            this.editfieldketerlambatan = true
          }
          if (this.typepelunasanawalFc.value === 'tidak') {
            this.dendapelunasanawalFc.disable()
            this.trigerdatavalidationpelunasan = true
            this.editfieldpelunasan = false
          } else {
            this.dendapelunasanawalFc.enable()
            this.trigerdatavalidationpelunasan = false
            this.editfieldpelunasan = true
          }
        } else {
          this.produkshowcreate = false
        }
      }
    )
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
    this.strukturmodalcreate.show();
    this.resetform();
    this.getparameterdata();
    this.statusmodal = 'create'
  }
  editaktif(id) {
    this.statusmodal = 'active'
    this.strukturmodalcreate.show();
    this.loadeditdataproduct(id);
    this.iddata = id
  }
  changetypeselect(type) {
    switch (type) {
      case 'biayaprovisi':
        this.provisiFc.setValue('')
        if (this.optionbiayaprovisiFc.value !== '' && this.optionbiayaprovisiFc.value !== 'tidak') this.provisiFc.enable()
        else {
          this.provisiFc.disable()
          this.provisiFc.setValue('')
        }
        break;
      case 'asuransi':
        this.asuransiFc.setValue('')
        if (this.optionasuransiFc.value !== '' && this.optionasuransiFc.value !== 'tidak') this.asuransiFc.enable()
        else {
          this.asuransiFc.disable()
          this.asuransiFc.setValue('')
        }
        break;
      case 'jpk':
        this.jpkFc.setValue('')
        if (this.optionjpkFc.value !== '' && this.optionjpkFc.value !== 'tidak') this.jpkFc.enable()
        else {
          this.jpkFc.disable()
          this.jpkFc.setValue('')
        }
        break;
      case 'simpananpokok':
        this.simpananpokokFc.setValue('')
        if (this.optionsimpananpokokFc.value !== '' && this.optionsimpananpokokFc.value !== 'tidak') this.simpananpokokFc.enable()
        else {
          this.simpananpokokFc.disable()
          this.simpananpokokFc.setValue('')
        }
        break;
    }
  }
  loadeditdataproduct(id: any) {
    this.resetform()
    this.produkshowcreate = false
    this.contentSvc.getProductbyId(id).subscribe(
      result => {
        if (result) {
          console.log(result)
          this.produkshowcreate = true
          this.namaprodukFc.setValue(result.data[0].nama_produk)
          if (result.data[0].denda_keterlambatan !== '' && result.data[0].denda_keterlambatan !== 0) {
            this.editfieldketerlambatan = true
            this.dendaketerlambatanFc.enable();
          } else {
            this.editfieldketerlambatan = false
            this.dendaketerlambatanFc.setValue('')
          }
          if (result.data[0].pelunasan_dipercepat !== '' && result.data[0].pelunasan_dipercepat !== 0) {
            this.editfieldpelunasan = true
            this.dendapelunasanawalFc.enable()
          } else {
            this.editfieldpelunasan = false
            this.dendapelunasanawalFc.setValue('')
          }
          setTimeout(() => {
            this.pushdataform(result.data[0].nama_produk, result.data[0].tenor, result.data[0].satuan_tenor,
              result.data[0].bunga, result.data[0].tenor_bunga, result.data[0].admin, result.data[0].provisi,result.data[0].asuransi,result.data[0].dana_jpk, result.data[0].type_provisi,result.data[0].type_asuransi,result.data[0].type_dana_jpk,
              result.data[0].simpanan_pokok, result.data[0].type_simpanan_pokok, result.data[0].simpanan_wajib, result.data[0].denda_keterlambatan,
              result.data[0].pelunasan_dipercepat, result.data[0].type_denda_keterlambatan, result.data[0].type_pelunasan_dipercepat)
          }, 100);
        }
      }
    )
  }

  pushdataform(nama: any, tenor: any, optiontenor: any, bunga: any, optionbunga: any, biayaadmin: any, provisi: any,asuransi: any,jpk: any, optionprovisi: any,optionasuransi: any,optionjpk: any, simpananpokok: any,
    optionsimpananpokok: any, simpananwajib: any, dendaketerlambatan: any, dendapelunasanawal: any, typedendaketerlambatan: any, typepelunasandipercepat: any) {

    this.namaprodukFc.setValue(nama)
    this.tenorFc.setValue(tenor)
    this.optiontenorFc.setValue(optiontenor)
    this.bungaFc.setValue(this.utilSvc.formatPercentage(bunga))
    this.optionbungaFc.setValue(optionbunga)
    this.biayaadminFc.setValue(this.utilSvc.formatNumber(biayaadmin))

    this.optionasuransiFc.setValue(optionasuransi)
    this.optionjpkFc.setValue(optionjpk)
    
    if (optionprovisi === 'Persen') this.provisiFc.setValue(provisi == 0 ? '' : provisi)
    else this.provisiFc.setValue(this.utilSvc.formatNumber(provisi) == 0 ? '' : this.utilSvc.formatNumber(provisi))

    if (optionasuransi === 'Persen') this.asuransiFc.setValue(asuransi == 0 ? '' : asuransi)
    else this.asuransiFc.setValue(this.utilSvc.formatNumber(asuransi) == 0 ? '' : this.utilSvc.formatNumber(asuransi))

    if (optionjpk === 'Persen') this.jpkFc.setValue(jpk == 0 ? '' : jpk)
    else this.jpkFc.setValue(this.utilSvc.formatNumber(jpk) == 0 ? '' : this.utilSvc.formatNumber(jpk))
    
    this.simpananpokokFc.setValue(this.utilSvc.formatNumber(simpananpokok) == 0 ? '' : this.utilSvc.formatNumber(simpananpokok))    
    this.optionbiayaprovisiFc.setValue(optionprovisi)
    this.optionsimpananpokokFc.setValue(optionsimpananpokok)
    this.simpananwajibFc.setValue(this.utilSvc.formatNumber(simpananwajib))

    if (typedendaketerlambatan === 'Fix') {
      this.dendaketerlambatanFc.setValue(this.utilSvc.formatNumber(dendaketerlambatan))
    } else {
      this.dendaketerlambatanFc.setValue(dendaketerlambatan)
    }

    if (typepelunasandipercepat === 'Fix') {
      this.dendapelunasanawalFc.setValue(this.utilSvc.formatNumber(dendapelunasanawal))
    } else {
      this.dendapelunasanawalFc.setValue(dendapelunasanawal)
    }

    this.typedendaketerlambatanFc.setValue(typedendaketerlambatan)
    this.typepelunasanawalFc.setValue(typepelunasandipercepat)

    if (this.optionbiayaprovisiFc.value !== '' && this.optionbiayaprovisiFc.value !== 'tidak') this.provisiFc.enable()
    else {
      this.provisiFc.disable()
      this.provisiFc.setValue('')
    }

    if (this.optionasuransiFc.value !== '' && this.optionasuransiFc.value !== 'tidak') this.asuransiFc.enable()
    else {
      this.asuransiFc.disable()
      this.asuransiFc.setValue('')
    }

    if (this.optionjpkFc.value !== '' && this.optionjpkFc.value !== 'tidak') this.jpkFc.enable()
    else {
      this.jpkFc.disable()
      this.jpkFc.setValue('')
    }

    if (this.optionsimpananpokokFc.value !== '' && this.optionsimpananpokokFc.value !== 'tidak') this.simpananpokokFc.enable()
    else {
      this.simpananpokokFc.disable()
      this.simpananpokokFc.setValue('')
    }
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
    this.asuransiFc.setValue('')
    this.optionasuransiFc.setValue('')
    this.jpkFc.setValue('')
    this.optionjpkFc.setValue('')
    this.simpananpokokFc.setValue('')
    this.optionsimpananpokokFc.setValue('')
    this.simpananwajibFc.setValue('')
    this.dendaketerlambatanFc.setValue('')
    this.dendapelunasanawalFc.setValue('')
  }
  editnonaktif(id) {
    this.statusmodal = 'inactive'
    this.strukturmodalcreate.show();
    this.loadeditdataproduct(id);
    this.iddata = id
  }
  aktivasi(type) {
    this.postdata(type)
  }
  postdata(type: string) {
    this.loadingshow = true;

    let statusprovisi: any;
    let statusasuransi: any;
    let statusjpk: any;
    let statuspokok: any;
    let statusketerlambatan: any;
    let statuspelunasan: any;

    if (this.optionbiayaprovisiFc.value !== null && this.optionbiayaprovisiFc.value !== '' && this.optionbiayaprovisiFc.value === 'tidak') {
      statusprovisi = 'valid'
    } else {
      if (this.provisiFc.value !== null && this.provisiFc.value !== '') {
        statusprovisi = 'valid'
      } else {
        statusprovisi = 'invalid'
      }
    }
    
    if (this.optionasuransiFc.value !== null && this.optionasuransiFc.value !== '' && this.optionasuransiFc.value === 'tidak') {
      statusasuransi = 'valid'
    } else {
      if (this.asuransiFc.value !== null && this.asuransiFc.value !== '') {
        statusasuransi = 'valid'
      } else {
        statusasuransi = 'invalid'
      }
    }

    if (this.optionjpkFc.value !== null && this.optionjpkFc.value !== '' && this.optionjpkFc.value === 'tidak') {
      statusjpk = 'valid'
    } else {
      if (this.jpkFc.value !== null && this.jpkFc.value !== '') {
        statusjpk = 'valid'
      } else {
        statusjpk = 'invalid'
      }
    }

    if (this.optionsimpananpokokFc.value !== null && this.optionsimpananpokokFc.value !== '' && this.optionsimpananpokokFc.value === 'tidak') {
      statuspokok = 'valid'
    } else {
      if (this.simpananpokokFc.value !== null && this.simpananpokokFc.value !== '') {
        statuspokok = 'valid'
      } else {
        statuspokok = 'invalid'
      }
    }

    if (this.typedendaketerlambatanFc.value !== null && this.typedendaketerlambatanFc.value !== '' && this.typedendaketerlambatanFc.value === 'tidak' && type === 'create') {
      statusketerlambatan = 'valid'
    } else {
      if (this.dendaketerlambatanFc.value !== null && this.dendaketerlambatanFc.value !== '' && type === 'create') statusketerlambatan = 'valid'
      else {
        if (type === 'create') statusketerlambatan = 'invalid'
        else {
          if (this.dendaketerlambatanFc.value !== null && this.dendaketerlambatanFc.value !== '') {
            statusketerlambatan = 'valid'
          } else {
            statusketerlambatan = 'invalid'
          }
        }
      }
    }

    if (this.typepelunasanawalFc.value !== null && this.typepelunasanawalFc.value !== '' && this.typepelunasanawalFc.value === 'tidak' && type === 'create') {
      statuspelunasan = 'valid'
    } else {
      if (this.dendapelunasanawalFc.value !== null && this.dendapelunasanawalFc.value !== '' && type === 'create') statuspelunasan = 'valid'
      if (type === 'create') statuspelunasan = 'invalid'
      if (this.dendapelunasanawalFc.value !== null && this.dendapelunasanawalFc.value !== '') {
        statuspelunasan = 'valid'
      } else {
        statuspelunasan = 'invalid'
      }
    }

    if (this.dendaketerlambatanFc.value.includes('.') && this.typedendaketerlambatanFc.value !== 'Persen')
      this.dendaketerlambatanFc.setValue(this.dendaketerlambatanFc.value.toString().replace(/\./g, ''))

    if (this.dendapelunasanawalFc.value.includes('.') && this.typepelunasanawalFc.value !== 'Persen')
      this.dendapelunasanawalFc.setValue(this.dendapelunasanawalFc.value.toString().replace(/\./g, ''))

    if (this.provisiFc.value.includes('.') && this.optionbiayaprovisiFc.value !== 'Persen')
      this.provisiFc.setValue(this.provisiFc.value.toString().replace(/\./g, ''))

    if (this.asuransiFc.value.includes('.') && this.optionasuransiFc.value !== 'Persen')
      this.asuransiFc.setValue(this.asuransiFc.value.toString().replace(/\./g, ''))

    if (this.jpkFc.value.includes('.') && this.optionjpkFc.value !== 'Persen')
      this.jpkFc.setValue(this.jpkFc.value.toString().replace(/\./g, ''))

    if (this.simpananpokokFc.value.includes('.'))
      this.simpananpokokFc.setValue(this.simpananpokokFc.value.toString().replace(/\./g, ''))

    this.formgrouppostdata = this.fb.group({
      "nama_produk": [this.namaprodukFc.value, [Validators.required]],
      "tenor": [this.tenorFc.value, [Validators.required]],
      "satuan_tenor": [this.optiontenorFc.value, [Validators.required]],
      "bunga": [this.bungaFc.value, [Validators.required]],
      "tenor_bunga": [this.optionbungaFc.value, [Validators.required]],
      "admin": [this.utilSvc.formatnonNumber(this.biayaadminFc.value), [Validators.required]],
      "provisi": [this.provisiFc.value === '' ? 0 : this.provisiFc.value],
      "type_provisi": [this.optionbiayaprovisiFc.value, [Validators.required]],
      "asuransi": [this.asuransiFc.value === '' ? 0 : this.asuransiFc.value],
      "type_asuransi": [this.optionasuransiFc.value, [Validators.required]],
      "dana_jpk": [this.jpkFc.value === '' ? 0 : this.jpkFc.value],
      "type_dana_jpk": [this.optionjpkFc.value, [Validators.required]],
      "simpanan_pokok": [this.simpananpokokFc.value === '' ? 0 : this.simpananpokokFc.value],
      "type_simpanan_pokok": [this.optionsimpananpokokFc.value, [Validators.required]],
      "simpanan_wajib": [this.utilSvc.formatnonNumber(this.simpananwajibFc.value), [Validators.required]],
      "denda_keterlambatan": [this.dendaketerlambatanFc.value === '' ? 0 : this.dendaketerlambatanFc.value],
      "type_denda_keterlambatan": [this.typedendaketerlambatanFc.value, [Validators.required]],
      "pelunasan_dipercepat": [this.dendapelunasanawalFc.value === '' ? 0 : this.dendapelunasanawalFc.value],
      "type_pelunasan_dipercepat": [this.typepelunasanawalFc.value, [Validators.required]]
    });
    
    if (this.formgrouppostdata.status === "VALID" && statusprovisi === 'valid' && statusasuransi === 'valid' && statusjpk === 'valid'
      && statuspokok === 'valid' && statusketerlambatan === 'valid' && statuspelunasan === 'valid') {

      switch (type) {
        case 'create':
          this.contentSvc.postProduct(this.formgrouppostdata.value).subscribe(
            result => {
              if (result.status !== 500) {
                this.loadingshow = false;
                this.strukturmodalcreate.hide();
                this.notifSvc.addNotification({
                  type: 'success',
                  head: 'Success',
                  body: result.message
                });
                this.getdata();
              } else {
                this.loadingshow = false;
                this.strukturmodalcreate.hide();
                this.notifSvc.addNotification({
                  type: 'warning',
                  head: 'Warning',
                  body: result.message
                });
                this.getdata();
              }
            }
          )
          break;
        case 'edit':
          this.formgrouppostdata.value.id = this.iddata
          this.contentSvc.updateProduct(this.formgrouppostdata.value).subscribe(
            result => {
              if (result.status !== 500) {
                this.loadingshow = false;
                this.strukturmodalcreate.hide();
                this.notifSvc.addNotification({
                  type: 'success',
                  head: 'Success',
                  body: result.message
                });
                this.getdata();
              } else {
                this.loadingshow = false;
                this.strukturmodalcreate.hide();
                this.notifSvc.addNotification({
                  type: 'warning',
                  head: 'Warning',
                  body: result.message
                });
                this.getdata();
              }
            }
          )
          break;
        case 'statusnonaktif':
          let dataaktif = {
            "id": this.iddata,
            "status": "inactive"
          }
          this.contentSvc.updatestatusProduct(dataaktif).subscribe(
            result => {
              if (result.status !== 500) {
                this.loadingshow = false;
                this.strukturmodalcreate.hide();
                this.notifSvc.addNotification({
                  type: 'success',
                  head: 'Success',
                  body: result.message
                });
                this.getdata();
              } else {
                this.loadingshow = false;
                this.strukturmodalcreate.hide();
                this.notifSvc.addNotification({
                  type: 'warning',
                  head: 'Warning',
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
              if (result.status !== 500) {
                this.loadingshow = false;
                this.strukturmodalcreate.hide();
                this.notifSvc.addNotification({
                  type: 'success',
                  head: 'Success',
                  body: result.message
                });
                this.getdata();
              } else {
                this.loadingshow = false;
                this.strukturmodalcreate.hide();
                this.notifSvc.addNotification({
                  type: 'warning',
                  head: 'Warning',
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
          type: 'warning',
          head: 'Warning',
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
}
