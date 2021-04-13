
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
  selector: 'app-management-rembug',
  templateUrl: './management-rembug.component.html',
  styleUrls: ['./management-rembug.component.scss']
})
export class ManagementRembugComponent implements OnInit {
  baseUrl:any = environment.apiUrl;
  rembugShow: boolean = false;
  listDataRembug = []
  dataRembugShow: boolean = false;
  dataKelompokShow: boolean = false;
  namaRembugFc: FormControl = new FormControl()
  namaKetuaFc: FormControl = new FormControl()
  namaKelompokFc: FormControl = new FormControl()
  namaKetuaKelompokFc: FormControl = new FormControl()
  formGroupPostData: FormGroup;
  dataDetailRembug: any;
  dataDetailKelompok: any;
  listDataKelompok: any;
  rembugModalStatus : any = 'edit';
  kelompokModalStatus : any = 'edit';
  @ViewChild('rembugModal', { static: false }) public rembugModal: any;
  @ViewChild('kelompokModal', { static: false }) public kelompokModal: any;
  loadingshow:boolean;
  constructor(
    private contentSvc: ContentService,
    public fb: FormBuilder,
    private notifSvc: NotificationService,
    public utilSvc:UtilService,
  ) { }

  ngOnInit() {
      this.getDataRembug();
  }

  tambahRembug() {
    this.rembugModalStatus = 'tambah'
    this.rembugModal.show()
    this.resetFormRembug();
  }

  tambahKelompok() {
    this.kelompokModalStatus = 'tambah'
    this.kelompokModal.show()
    this.resetFormKelompok();
  }

  getDataRembug() {
    this.listDataRembug = []
    this.contentSvc.getRembug().subscribe(
      result => {
        if (result.status !== 500) {
          this.rembugShow = true
          result.data.forEach(element => {
            this.listDataRembug.push(element)
          });
        } else {
          this.rembugShow = false
        }
      }
    )
  }

  getDataKelompok() {
    this.listDataKelompok = []
    this.contentSvc.getKelompok(this.dataDetailRembug.id).subscribe(
      result => {
        if (result.status !== 500) {
          this.listDataKelompok = result.data
          this.dataKelompokShow = true
        }
      }
    )
  }

  loadDetailRembug(id : any) {
    this.resetFormRembug()
    this.contentSvc.getKelompok(id).subscribe(
      result => {
        if (result.status !== 500) {
          this.dataDetailRembug = this.listDataRembug.find(d=>d.id == id)
          this.pushDataFormRembug(this.dataDetailRembug.nama_ketua,this.dataDetailRembug.nama_rembug)
          this.listDataKelompok = result.data
          this.dataKelompokShow = true
        }
      }
    )
  }
  
  detailRembug(id: any) {
    this.rembugModalStatus = 'edit'
    this.rembugModal.show()
    this.loadDetailRembug(id)
  }

  loadDetailKelompok(id : any) {
    this.resetFormKelompok()
    this.dataDetailKelompok = this.listDataKelompok.find(d=>d.id == id)
    this.pushDataFormKelompok(this.dataDetailKelompok.nama_ketua,this.dataDetailKelompok.nama_kelompok)
    this.dataKelompokShow = true
  }
  
  detailKelompok(id: any) {
    this.kelompokModalStatus = 'edit'
    this.kelompokModal.show()
    this.loadDetailKelompok(id)
  }

  simpanRembug(type : string){
    switch (type) {
      case 'update':
        
        this.formGroupPostData = this.fb.group({
          "id":this.dataDetailRembug.id,
          "nama_ketua": [this.namaKetuaFc.value, [Validators.required]],
          "nama_rembug": [this.namaRembugFc.value, [Validators.required]],
        })

        if (this.formGroupPostData.status === "VALID") {

          this.contentSvc.updateRembug(this.formGroupPostData.value).subscribe(
              result => {
                if (result.status !== 500) {
                  this.rembugModal.hide();
                  this.notifSvc.addNotification({
                    type: 'success',
                    head: 'Success',
                    body: result.message
                  });
                  this.getDataRembug();
                } else {
                  this.rembugModal.hide();
                  this.notifSvc.addNotification({
                    type: 'warning',
                    head: 'Warning',
                    body: result.message
                  });
                  this.getDataRembug();
                }
              }
            )
        }else {
          setTimeout(() => {
            this.notifSvc.addNotification({
              type: 'warning',
              head: 'Warning',
              body: 'Pastikan semua form sudah terisi dengan benar'
            });
          }, 500);
        }
        break;
    
      default:
        this.formGroupPostData = this.fb.group({
          "nama_ketua": [this.namaKetuaFc.value, [Validators.required]],
          "nama_rembug": [this.namaRembugFc.value, [Validators.required]],
        })
        if (this.formGroupPostData.status === "VALID") {
          this.contentSvc.postRembug(this.formGroupPostData.value).subscribe(
              result => {
                if (result.status !== 500) {
                  this.rembugModal.hide();
                  this.notifSvc.addNotification({
                    type: 'success',
                    head: 'Success',
                    body: result.message
                  });
                  this.getDataRembug();
                } else {
                  this.rembugModal.hide();
                  this.notifSvc.addNotification({
                    type: 'warning',
                    head: 'Warning',
                    body: result.message
                  });
                  this.getDataRembug();
                }
              }
            )
        }else {
          setTimeout(() => {
            this.notifSvc.addNotification({
              type: 'warning',
              head: 'Warning',
              body: 'Pastikan semua form sudah terisi dengan benar'
            });
          }, 500);
        }
        break;
    }
    
  }

  simpanKelompok(type : string){
    switch (type) {
      case 'update':
        
        this.formGroupPostData = this.fb.group({
          "id":this.dataDetailKelompok.id,
          "id_rembug":this.dataDetailRembug.id,
          "nama_ketua": [this.namaKetuaKelompokFc.value, [Validators.required]],
          "nama_kelompok": [this.namaKelompokFc.value, [Validators.required]],
        })

        if (this.formGroupPostData.status === "VALID") {
          this.contentSvc.updateKelompok(this.formGroupPostData.value).subscribe(
            result => {
              if (result.status !== 500) {
                this.kelompokModal.hide();
                this.notifSvc.addNotification({
                  type: 'success',
                  head: 'Success',
                  body: result.message
                });
                this.getDataKelompok();
              } else {
                this.kelompokModal.hide();
                this.notifSvc.addNotification({
                  type: 'warning',
                  head: 'Warning',
                  body: result.message
                });
                this.getDataKelompok();
              }
            }
          )
        }else {
            setTimeout(() => {
              this.notifSvc.addNotification({
                type: 'warning',
                head: 'Warning',
                body: 'Pastikan semua form sudah terisi dengan benar'
              });
            }, 500);
          }
        
        break;
    
      default:
        this.formGroupPostData = this.fb.group({
          "id_rembug":this.dataDetailRembug.id,
          "nama_ketua": [this.namaKetuaKelompokFc.value, [Validators.required]],
          "nama_kelompok": [this.namaKelompokFc.value, [Validators.required]],
        })

        if (this.formGroupPostData.status === "VALID") {
          this.contentSvc.postKelompok(this.formGroupPostData.value).subscribe(
              result => {
                if (result.status !== 500) {
                  this.kelompokModal.hide();
                  this.notifSvc.addNotification({
                    type: 'success',
                    head: 'Success',
                    body: result.message
                  });
                  this.getDataKelompok();
                } else {
                  this.kelompokModal.hide();
                  this.notifSvc.addNotification({
                    type: 'warning',
                    head: 'Warning',
                    body: result.message
                  });
                  this.getDataKelompok();
                }
              }
            )
          }else {
            setTimeout(() => {
              this.notifSvc.addNotification({
                type: 'warning',
                head: 'Warning',
                body: 'Pastikan semua form sudah terisi dengan benar'
              });
            }, 500);
          }
        break;
    }
    
  }

  pushDataFormRembug(nama_ketua : any,nama_rembug: any) {
    this.namaKetuaFc.setValue(nama_ketua)
    this.namaRembugFc.setValue(nama_rembug)
  }

  pushDataFormKelompok(nama_ketua : any,nama_kelompok: any) {
    this.namaKetuaKelompokFc.setValue(nama_ketua)
    this.namaKelompokFc.setValue(nama_kelompok)
  }

  resetFormRembug() {
    this.namaKetuaFc.setValue('')
    this.namaRembugFc.setValue('')
  }

  resetFormKelompok() {
    this.namaKetuaKelompokFc.setValue('')
    this.namaKelompokFc.setValue('')
  }
}
