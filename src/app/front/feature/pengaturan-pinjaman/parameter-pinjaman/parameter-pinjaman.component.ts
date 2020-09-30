import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, ValidatorFn, Validators } from '@angular/forms';
import { ContentService, NotificationService } from '@app/core';
import * as CryptoJS from 'crypto-js';
import { stat } from 'fs';
import * as $ from "jquery";
import { ComponentLoaderFactory } from 'ngx-bootstrap';
@Component({
  selector: 'app-parameter-pinjaman',
  templateUrl: './parameter-pinjaman.component.html',
  styleUrls: ['./parameter-pinjaman.component.scss']
})
export class ParameterPinjamanComponent implements OnInit {
  formgrouppostdata: FormGroup;
  form: FormGroup;
  ordersData = [];
  listdatasimpanan: any;
  listangsuransebagain: any;
  listperhitunganpelunasandipercepat: any;
  listsimpanan: any;
  listdendasar: any;
  angsuransebagianFc: FormControl;
  dendadasar: FormControl;
  perhitunganpelunasandipercepatFc: FormControl;

  simpananFc: FormControl;
  optionangsuranFc: FormControl;
  optionmasatenggangFc: FormControl;
  masatenggangFc: FormControl;
  optiondendaketerlambatanFc: FormControl;
  pelunasandipercepatFc: FormControl;
  dataselect = [];
  jumlahhariFc: FormControl;
  postangsuransebagian: FormControl;
  postmasatenggang: FormControl;
  postdendaketerlambatan: FormControl;
  postdasarpengenaandenda: FormControl;
  postpelunasandipercepat: FormControl;
  postdasarpelunasan: FormControl;
  posturutansimpanan: FormControl;
  simpananmembayarFc: FormControl;
  simpananshow: boolean;
  urutansimpananshow: boolean;
  loadingshow: boolean;
  datashow: boolean;
  statusproduct: string;
  contentkonfirmasi:string;
  @ViewChild('konfirmasimodal', { static: false }) public konfirmasimodal: any;
  constructor(
    private contentSvc: ContentService,
    private formBuilder: FormBuilder,
    public fb: FormBuilder,
    private notifSvc: NotificationService
  ) {
    this.angsuransebagianFc = new FormControl()
    this.dendadasar = new FormControl()
    this.perhitunganpelunasandipercepatFc = new FormControl()
    this.simpananFc = new FormControl()
    this.optionangsuranFc = new FormControl();
    this.optionmasatenggangFc = new FormControl();
    this.masatenggangFc = new FormControl();
    this.optiondendaketerlambatanFc = new FormControl();
    this.pelunasandipercepatFc = new FormControl();
    this.angsuransebagianFc.disable()
    this.masatenggangFc.disable()
    this.dendadasar.disable()
    this.perhitunganpelunasandipercepatFc.disable();
    this.jumlahhariFc = new FormControl();
    this.form = this.formBuilder.group({
      orders: new FormArray([], this.minSelectedCheckboxes(1))
    });;
    this.postangsuransebagian = new FormControl();
    this.postmasatenggang = new FormControl();
    this.postdendaketerlambatan = new FormControl();
    this.postdasarpengenaandenda = new FormControl();
    this.postpelunasandipercepat = new FormControl();
    this.simpananmembayarFc = new FormControl();
    this.postdasarpelunasan = new FormControl();
    this.posturutansimpanan = new FormControl();
    this.simpananshow = false;
    this.urutansimpananshow = false;
    this.loadingshow = false;
    this.datashow = true;
  }

  ngOnInit() {
    if (!localStorage.getItem("simpanan")) {
      this.contentSvc.getparametersimpanan().subscribe(
        simpanan => {
          if (simpanan) {
            var data = {
              data: simpanan.data,
            }
            localStorage.setItem("simpanan", CryptoJS.AES.encrypt(JSON.stringify(data), 'secret').toString());
            this.contentSvc.getparameterpelunasan().subscribe(
              pelunasan => {
                if (pelunasan) {
                  var data = {
                    data: pelunasan.data,
                  }
                  localStorage.setItem("pelunasan", CryptoJS.AES.encrypt(JSON.stringify(data), 'secret').toString());
                  this.contentSvc.getparameterdenda().subscribe(
                    denda => {
                      if (denda) {
                        var data = {
                          data: denda.data,
                        }
                        localStorage.setItem("denda", CryptoJS.AES.encrypt(JSON.stringify(data), 'secret').toString());
                        this.contentSvc.getparametersebagian().subscribe(
                          sebagian => {
                            if (sebagian) {
                              var data = {
                                data: sebagian.data,
                              }
                              localStorage.setItem("sebagian", CryptoJS.AES.encrypt(JSON.stringify(data), 'secret').toString());
                              this.initloaddata()
                            }
                          }
                        )
                      }
                    }
                  )
                }
              }
            )
          }
        }
      )
    }else{
      this.initloaddata()
    }
  }
  initloaddata(){
    if (localStorage.getItem("sebagian") && localStorage.getItem("denda") && localStorage.getItem("simpanan")) {
      this.listangsuransebagain = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('sebagian'), 'secret').toString(CryptoJS.enc.Utf8))
      this.listdendasar = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('denda'), 'secret').toString(CryptoJS.enc.Utf8))
      this.listperhitunganpelunasandipercepat = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('pelunasan'), 'secret').toString(CryptoJS.enc.Utf8))
      this.listsimpanan = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('simpanan'), 'secret').toString(CryptoJS.enc.Utf8))
      this.ordersData = this.getOrders();
      this.addCheckboxes()
      this.contentSvc.getParameter().subscribe(
        result => {
          this.datashow = false
          setTimeout(() => {
            if (result.data.length > 0) {
              this.statusproduct = 'edit'
              this.jumlahhariFc.setValue(result.data[0].hari_per_bulan)
              if (result.data[0].id_angsuran_sebagian > 0) {
                this.angsuransebagianFc.enable()
                this.optionangsuranFc.setValue("ya")
                this.angsuransebagianFc.setValue(result.data[0].id_angsuran_sebagian)
              } else {
                this.angsuransebagianFc.disable()
                this.optionangsuranFc.setValue("")
              }
              if (result.data[0].id_masa_tenggang > 0) {
                this.masatenggangFc.enable()
                this.optionmasatenggangFc.setValue("ya")
                this.masatenggangFc.setValue(result.data[0].id_masa_tenggang)
              } else {
                this.masatenggangFc.disable()
                this.optionmasatenggangFc.setValue("")
              }
              if (result.data[0].type_denda_keterlambatan !== "") {
                this.optiondendaketerlambatanFc.setValue(result.data[0].type_denda_keterlambatan)
                if(result.data[0].type_denda_keterlambatan === "Persen"){
                  this.dendadasar.enable();
                }else{
                  this.dendadasar.disable();
                  this.dendadasar.setValue("")
                }
              } else {
                this.optiondendaketerlambatanFc.setValue("")
              }
              if (result.data[0].id_dasar_denda > 0) {
                this.dendadasar.setValue(result.data[0].id_dasar_denda)
              } else {
                this.dendadasar.setValue("")
              }
              if (result.data[0].type_pelunasan_dipercepat !== "") {
                this.perhitunganpelunasandipercepatFc.enable();
                this.pelunasandipercepatFc.setValue(result.data[0].type_pelunasan_dipercepat)
                if (result.data[0].type_pelunasan_dipercepat === "Persen"){
                  this.perhitunganpelunasandipercepatFc.enable();
                }else{
                  this.perhitunganpelunasandipercepatFc.disable();
                  this.perhitunganpelunasandipercepatFc.setValue("")
                }
              } else {
                this.pelunasandipercepatFc.setValue("")
              }
              if (result.data[0].id_dasar_pelunasan > 0) {                
                this.perhitunganpelunasandipercepatFc.setValue(result.data[0].id_dasar_pelunasan)
              }else{
                this.perhitunganpelunasandipercepatFc.setValue("")
              }
              if (result.data[0].id_urutan_simpanan !== "") {
                this.simpananmembayarFc.setValue("ya")
                this.simpananshow = true
                const databj = result.data[0].id_urutan_simpanan.split('|').join(',').split('')
                let dataarrsimpananlist = [];
                let datausetemp = this.form.value.orders;
                databj.forEach(element => {
                  if (element !== ',') {
                    dataarrsimpananlist.push(this.ordersData[element - 1])
                    datausetemp.splice(element - 1, 1, true)
                  }
                });
                let dataobj = {
                  orders: datausetemp
                }
                this.form.setValue(dataobj)
                this.urutansimpananshow = true
                this.listdatasimpanan = dataarrsimpananlist;
                let dataincrement = 0;
                dataarrsimpananlist.forEach((item, index) => {
                  setTimeout(() => {
                    $('#checkbox' + (item.id - 1)).prop("checked", true);
                    if (item === 1) {
                      $('#select' + (item.id - 1) + '  option:contains(' + item.desc_simpanan + ')').prop('selected', true);
                    } else {
                      dataincrement = + index
                      $('#select' + dataincrement + '  option:contains(' + item.desc_simpanan + ')').prop('selected', true);
                    }
                  }, 100);
                })
              } else {
                this.simpananmembayarFc.setValue("")
              }
            } else {
              this.statusproduct = 'create'
            }
          }, 100);
        }
      )
    }
  }
  get ordersFormArray() {
    return this.form.controls.orders as FormArray;
  }
  private addCheckboxes() {
    this.ordersData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }
  getOrders() {
    return this.listsimpanan.data
  }
  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }
  changecheckbox() {
    const selectedOrderIds = this.form.value.orders.map((v, i) => v ? this.ordersData[i] : null).filter(v => v !== null);
    this.listdatasimpanan = selectedOrderIds
    this.dataselect = []
    this.listdatasimpanan.forEach((element, index) => {
      setTimeout(() => {
        $('#select' + index + ' option[value="null"]').prop('selected', true);
      }, 100);
    })

    if (this.listdatasimpanan.length > 0) {
      this.urutansimpananshow = true;
    } else {
      this.urutansimpananshow = false;
    }
  }
  changeoptionselect(data, index) {
    let dataarr = {
      id: data.target.value.split(',')[0],
      name: data.target.value.split(',')[1],
    }
    if (this.dataselect.length !== this.listdatasimpanan.length) {
      this.dataselect.push(dataarr)
    } else {
      this.dataselect.splice(index, 1, dataarr)
    }
  }
  option(data) {
    switch (data) {
      case 'angsuran':
        if (this.optionangsuranFc.value === 'tidak') {
          this.angsuransebagianFc.disable()
        } else {
          this.angsuransebagianFc.enable()
        }
        break;
      case 'masatenggang':
        if (this.optionmasatenggangFc.value === 'tidak') {
          this.masatenggangFc.disable()
        } else {
          this.masatenggangFc.enable()
        }
        break;
      case 'dendaketerlambatan':
        if (this.optiondendaketerlambatanFc.value === 'Persen') {
          this.dendadasar.enable()
        } else {
          this.dendadasar.disable()
        }
      case 'pelunasandipercepat':
        if (this.pelunasandipercepatFc.value === 'Persen') {
          this.perhitunganpelunasandipercepatFc.enable()
        } else {
          this.perhitunganpelunasandipercepatFc.disable()
        }
        break;
    }
  }
  simpanselectchange() {
    if (this.simpananmembayarFc.value === 'ya') {
      this.simpananshow = true
      this.ordersData.forEach(data => {
        setTimeout(() => {
          $('#checkbox' + (data.id - 1)).prop("checked", false);
        }, 100);
        })  
    } else {
      this.simpananshow = false
      this.urutansimpananshow = false
    }
  }
  aktivasi() {
    this.konfirmasimodal.show();
    this.contentkonfirmasi = 'Apakah anda yakin untuk menyimpan data ini ?'
  }
  ubah() {
    this.konfirmasimodal.show();
    this.contentkonfirmasi = 'Apakah anda yakin untuk mengubah data ini ?'
  }
  btnya(){
    console.log('===');
    
    this.postdata()
    this.konfirmasimodal.hide();
  }
  postdata() {
    this.loadingshow = true;
    let dataurutan = []
    let status;
    if(this.listdatasimpanan){
    if(this.listdatasimpanan.length === this.dataselect.length || this.simpananmembayarFc.value === 'tidak' || this.simpananmembayarFc.value === ''){
      status = 'valid'
    }else{
      status = 'invalid'
    }
    }else{
        status = 'valid'
    }

    this.dataselect.forEach(data => {
      if (data) {
        dataurutan.push(data.id)
      }
    })
    if (this.optionangsuranFc.value === 'tidak') {
      this.postangsuransebagian.setValue(0)
    } else {
      this.postangsuransebagian.setValue(this.angsuransebagianFc.value)
    }
    if (this.optionmasatenggangFc.value === 'tidak') {
      this.postmasatenggang.setValue(0)
    } else {
      this.postmasatenggang.setValue(this.masatenggangFc.value)
    }
    if (this.optiondendaketerlambatanFc.value === '') {
      this.postdendaketerlambatan.setValue(0)
    } else {
      this.postdendaketerlambatan.setValue(this.optiondendaketerlambatanFc.value)
    }
    if (this.optiondendaketerlambatanFc.value === 'tidak' || this.optiondendaketerlambatanFc.value === 'Fix') {
      this.postdasarpengenaandenda.setValue(0)
    } else {
      this.postdasarpengenaandenda.setValue(this.dendadasar.value)
    }
    if (this.pelunasandipercepatFc.value === '') {
      this.postpelunasandipercepat.setValue("")
    } else {
      this.postpelunasandipercepat.setValue(this.pelunasandipercepatFc.value)
    }
    if (this.perhitunganpelunasandipercepatFc.value === '' ) {
      this.postdasarpelunasan.setValue(0)
    } else {
      this.postdasarpelunasan.setValue(Number(this.perhitunganpelunasandipercepatFc.value))
    }
    if (!this.hasDuplicates(dataurutan)) {
      this.posturutansimpanan.setValue(dataurutan.toString().replace(/,/g, "|"))
    } else {
      this.posturutansimpanan.setValue("")
    }

    this.formgrouppostdata = this.fb.group({
      "hari_per_bulan": [this.jumlahhariFc.value, [Validators.required]],
      "id_angsuran_sebagian": [this.postangsuransebagian.value, [Validators.required]],
      "id_masa_tenggang": [this.postmasatenggang.value, [Validators.required]],
      "type_denda_keterlambatan": [this.postdendaketerlambatan.value, [Validators.required]],
      "id_dasar_denda": [this.postdasarpengenaandenda.value, [Validators.required]],
      "type_pelunasan_dipercepat": [this.postpelunasandipercepat.value],
      "id_dasar_pelunasan": [this.postdasarpelunasan.value, [Validators.required]],
      "id_urutan_simpanan": [this.posturutansimpanan.value]
    });
    if (this.formgrouppostdata.status === "VALID" && status === 'valid') {
      if (!this.hasDuplicates(dataurutan)){
        this.contentSvc.postParameter(this.formgrouppostdata.value).subscribe(
          result => {
            if (result.status !== 500) {
              this.loadingshow = false;
              this.notifSvc.addNotification({
                type: 'success',
                head: 'Success',
                body: result.message
              });
              this.statusproduct = 'edit';
            } else {
              this.loadingshow = false;
              this.notifSvc.addNotification({
                type: 'danger',
                head: 'Danger',
                body: result.message
              });
            }
          }
        )
      }else{
        this.loadingshow = false;
        this.notifSvc.addNotification({
          type: 'danger',
          head: 'Danger',
          body: 'Urutan pembayaran dengan simpanan tidak boleh sama'
        });
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
  hasDuplicates(arr) {
    var counts = [];
    for (var i = 0; i <= arr.length; i++) {
      if (counts[arr[i]] === undefined) {
        counts[arr[i]] = 1;
      } else {
        return true;
      }
    }
    return false;
  }
}
