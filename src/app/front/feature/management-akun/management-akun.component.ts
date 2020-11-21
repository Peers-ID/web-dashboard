
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, ValidatorFn, Validators } from '@angular/forms';
import { ContentService, NotificationService } from '@app/core';
import * as CryptoJS from 'crypto-js';
import { stat } from 'fs';
import { element } from 'protractor';
import { ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'app-management-akun',
  templateUrl: './management-akun.component.html',
  styleUrls: ['./management-akun.component.scss']
})
export class ManagementAkunComponent implements OnInit {
  listdataaccount = [];
  accountshow: boolean;
  statusmodal: string;
  @ViewChild('tambahakunmodal', { static: false }) public tambahakunmodal: any;
  datashow: boolean;
  optionfungsionalFc: FormControl = new FormControl()
  kinjerkoperasiFc: FormControl = new FormControl(true)
  pengaturanpinjamanFc: FormControl = new FormControl(true)
  manajementakunFc: FormControl = new FormControl(true)
  manajementpinjamanFc: FormControl = new FormControl(true)
  manajementanggotaFc: FormControl = new FormControl(true)
  persetujuanFc: FormControl = new FormControl(true)
  pencarianFc: FormControl = new FormControl(true)
  anguranFc: FormControl = new FormControl(true)
  penagihanFc: FormControl = new FormControl(true)
  loadingshow: boolean
  iddata: any;
  formgrouppostdata: FormGroup;
  namaakuninputFc: FormControl = new FormControl()
  nohpakunFc: FormControl = new FormControl()
  emailFc: FormControl = new FormControl()
  tanggallahirFc: FormControl = new FormControl()
  approve_max_1jt: FormControl = new FormControl(0)
  approve_max_3jt: FormControl = new FormControl(0)
  approve_max_5jt: FormControl = new FormControl(0)
  approve_max_10jt: FormControl = new FormControl(0)
  approve_more_10jt: FormControl = new FormControl(0)
  disburse_max_5jt: FormControl = new FormControl(0)
  disburse_max_10jt: FormControl = new FormControl(0)
  disburse_more_10jt: FormControl = new FormControl(0)
  optionperstujuanFc: FormControl = new FormControl()
  optionpencarianFc: FormControl = new FormControl()
  menuao: FormControl = new FormControl()
  menuadmin: FormControl = new FormControl()
  menusuperadmin: FormControl = new FormControl()
  constructor(
    private contentSvc: ContentService,
    public fb: FormBuilder,
    private notifSvc: NotificationService
  ) {
    this.accountshow = false;
    this.datashow = false;
    this.loadingshow = false;
  }

  ngOnInit() {
    this.getdata()
  }
  getdata() {
    this.listdataaccount = [];
    this.contentSvc.getAccount().subscribe(
      result => {
        this.resetform();
        if (result.data.length > 0) {
          this.accountshow = true
          result.data.forEach(element => {
            this.listdataaccount.push(element)
          });
        } else {
          this.accountshow = true
          this.listdataaccount = [];
        }
      }
    )
  }
  tambahakun() {
    this.datashow = true
    this.tambahakunmodal.show()
    this.statusmodal = 'create'
    this.resetform();
  }
  editaktif(id) {
    this.statusmodal = 'active'
    this.tambahakunmodal.show();
    this.iddata = id
    this.loaddata(id);
  }
  editnonaktif(id) {
    this.statusmodal = 'inactive'
    this.tambahakunmodal.show();
    this.iddata = id
    this.loaddata(id);

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
  simpan(type) {
    this.postdata(type)
  }
  resetform() {
    this.namaakuninputFc.setValue('')
    this.nohpakunFc.setValue('')
    this.emailFc.setValue('')
    this.tanggallahirFc.setValue('')
    this.optionfungsionalFc.setValue('')
    this.kinjerkoperasiFc.setValue(true)
    this.pengaturanpinjamanFc.setValue(true)
    this.manajementpinjamanFc.setValue(true)
    this.manajementanggotaFc.setValue(true)
    this.anguranFc.setValue(true)
    this.penagihanFc.setValue(true)
    this.persetujuanFc.setValue(true)
    this.pencarianFc.setValue(true)
    this.optionpencarianFc.setValue('')
    this.optionperstujuanFc.setValue('')
  }

  pushdataform(nama: any, no: any, email: any, tanggallahir: any, optionfunsional: any, approve_max_1jt: any, approve_max_3jt: any, approve_max_5jt: any
    , approve_max_10jt: any, approve_more_10jt: any, disburse_max_5jt: any, disburse_max_10jt: any, disburse_more_10jt: any, repayment: any,
    collection: any, mn_kinerja_koperasi: any, mn_pengaturan_pinjaman: any, mn_tambah_ao: any, mn_tambah_admin: any,
    mn_tambah_super_admin: any, mn_management_pinjaman: any, mn_management_anggota: any) {
    this.datashow = true
    this.namaakuninputFc.setValue(nama)
    this.nohpakunFc.setValue(no)
    this.emailFc.setValue(email)
    this.tanggallahirFc.setValue(tanggallahir.split(' ')[0])
    setTimeout(() => {
      this.optionfungsionalFc.setValue(optionfunsional)
    }, 100);
    if (approve_max_1jt === 0 && approve_max_3jt === 0 && approve_max_5jt === 0 && approve_max_10jt === 0 &&
      approve_more_10jt === 0) {
      this.persetujuanFc.setValue(false)
      this.optionperstujuanFc.disable()
    } else {
      const dataarraprove = [
        { id: '1', value: approve_max_1jt },
        { id: '3', value: approve_max_3jt },
        { id: '5', value: approve_max_5jt },
        { id: '10', value: approve_max_10jt },
        { id: '20', value: approve_more_10jt }
      ]
      dataarraprove.forEach(data => {
        if (data.value === 1) {
          setTimeout(() => {
            this.optionperstujuanFc.setValue(data.id)
          }, 100);
        }
      })
      this.persetujuanFc.setValue(true)
      this.optionperstujuanFc.enable()
    }
    if (disburse_max_5jt === 0 && disburse_max_10jt === 0 && disburse_more_10jt === 0) {
      this.pencarianFc.setValue(false)
      this.optionpencarianFc.disable()
    } else {
      const dataarrdisburse = [
        { id: '5', value: disburse_max_5jt },
        { id: '10', value: disburse_max_10jt },
        { id: '20', value: disburse_more_10jt }
      ]
      dataarrdisburse.forEach(data => {
        if (data.value === 1) {
          setTimeout(() => {
            this.optionpencarianFc.setValue(data.id)
          }, 100);
        }
      })
      this.optionpencarianFc.enable()
      this.pencarianFc.setValue(true)
    }
    this.anguranFc.setValue(repayment === 1 ? true : false)
    this.penagihanFc.setValue(collection === 1 ? true : false)
    this.kinjerkoperasiFc.setValue(mn_kinerja_koperasi === 1 ? true : false)
    this.pengaturanpinjamanFc.setValue(mn_pengaturan_pinjaman === 1 ? true : false)
    this.manajementpinjamanFc.setValue(mn_management_pinjaman === 1 ? true : false)
    this.manajementanggotaFc.setValue(mn_management_anggota === 1 ? true : false)
    if (mn_tambah_ao === 0 && mn_tambah_super_admin === 0 && mn_tambah_admin === 0) {
      this.manajementakunFc.setValue(false)
    } else {
      this.manajementakunFc.setValue(true)
    }

  }
  closemodal(){
    this.tambahakunmodal.hide()
    this.approve_max_1jt.setValue(0)
    this.approve_max_3jt.setValue(0)
    this.approve_max_5jt.setValue(0)
    this.approve_max_10jt.setValue(0)
    this.approve_more_10jt.setValue(0)
    this.disburse_max_5jt.setValue(0)
    this.disburse_max_10jt.setValue(0)
    this.disburse_more_10jt.setValue(0)
  }
  loaddata(id: any) {
    this.resetform()
    this.datashow = false
    this.contentSvc.getAccountbyid(this.iddata).subscribe(
      result => {
        this.pushdataform(result.data.users.fullname, result.data.users.phone_mobile, result.data.users.email, result.data.users.birthdate,
          result.data.users.role, result.data.roles.approve_max_1jt, result.data.roles.approve_max_3jt, result.data.roles.approve_max_5jt, result.data.roles.approve_max_10jt,
          result.data.roles.approve_more_10jt, result.data.roles.disburse_max_5jt, result.data.roles.disburse_max_10jt, result.data.roles.disburse_more_10jt,
          result.data.roles.repayment, result.data.roles.collection, result.data.roles.mn_kinerja_koperasi, result.data.roles.mn_pengaturan_pinjaman,
          result.data.roles.mn_tambah_ao, result.data.roles.mn_tambah_admin, result.data.roles.mn_tambah_super_admin, result.data.roles.mn_management_pinjaman, result.data.roles.mn_management_anggota)
      }
    )
  }
  changepersetujuanselect(){
    if(this.persetujuanFc.value === true){
      this.optionperstujuanFc.enable()
    }else{
      this.optionperstujuanFc.disable()
    } 
  }
  changepencairanselect(){
    if(this.pencarianFc.value === true){
      this.optionpencarianFc.enable()
    }else{
      this.optionpencarianFc.disable()
    } 
  }
  changeoptionfungsional(){
    if(this.optionfungsionalFc.value === 'AO/CMO/Sales'){
      this.persetujuanFc.setValue(true)
      this.pencarianFc.setValue(true)
      this.anguranFc.setValue(true)
      this.penagihanFc.setValue(true)
      this.optionperstujuanFc.enable()
      this.optionpencarianFc.enable()
    }
    if(this.optionfungsionalFc.value === 'Admin Koperasi' || this.optionfungsionalFc.value === 'Super Admin'){
      this.kinjerkoperasiFc.setValue(true)
      this.pengaturanpinjamanFc.setValue(true)
      this.manajementakunFc.setValue(true)
      this.manajementpinjamanFc.setValue(true)
      this.manajementanggotaFc.setValue(true)
    }
  }
  postdata(type: string) {
    let status;
    this.loadingshow = true;
    if (this.manajementakunFc.value === true) {
      switch (this.optionfungsionalFc.value) {
        case 'Admin Koperasi':
          this.menuao.setValue(1)
          this.menuadmin.setValue(0)
          this.menusuperadmin.setValue(0)
          break;
        case 'Super Admin':
          this.menuao.setValue(1)
          this.menuadmin.setValue(1)
          this.menusuperadmin.setValue(1)
          break;
      }
    } else {
      this.menuao.setValue(0)
      this.menuadmin.setValue(0)
      this.menusuperadmin.setValue(0)
    }

    switch (this.optionfungsionalFc.value) {
      case 'AO/CMO/Sales':
        if (this.persetujuanFc.value === true) {
          switch (this.optionperstujuanFc.value) {
            case '1':
              this.approve_max_1jt.setValue(1)
              this.approve_max_3jt.setValue(0)
              this.approve_max_5jt.setValue(0)
              this.approve_max_10jt.setValue(0)
              this.approve_more_10jt.setValue(0)
              break;
            case '3':
              this.approve_max_1jt.setValue(0)
              this.approve_max_3jt.setValue(1)
              this.approve_max_5jt.setValue(0)
              this.approve_max_10jt.setValue(0)
              this.approve_more_10jt.setValue(0)
              break;
            case '5':
              this.approve_max_1jt.setValue(0)
              this.approve_max_3jt.setValue(0)
              this.approve_max_5jt.setValue(1)
              this.approve_max_10jt.setValue(0)
              this.approve_more_10jt.setValue(0)
              break;
            case '10':
              this.approve_max_1jt.setValue(0)
              this.approve_max_3jt.setValue(0)
              this.approve_max_5jt.setValue(0)
              this.approve_max_10jt.setValue(1)
              this.approve_more_10jt.setValue(0)
              break;
            case '20':
              this.approve_max_1jt.setValue(0)
              this.approve_max_3jt.setValue(0)
              this.approve_max_5jt.setValue(0)
              this.approve_max_10jt.setValue(0)
              this.approve_more_10jt.setValue(1)
              break;
            default:
              break;
          }
        } else {
          this.approve_max_1jt.setValue(0)
          this.approve_max_3jt.setValue(0)
          this.approve_max_5jt.setValue(0)
          this.approve_max_10jt.setValue(0)
          this.approve_more_10jt.setValue(0)
        }
        if (this.pencarianFc.value === true) {
          switch (this.optionpencarianFc.value) {
            case '5':
              this.disburse_max_5jt.setValue(1)
              this.disburse_max_10jt.setValue(0)
              this.disburse_more_10jt.setValue(0)
              break;
            case '10':
              this.disburse_max_5jt.setValue(0)
              this.disburse_max_10jt.setValue(1)
              this.disburse_more_10jt.setValue(0)
              break;
            case '20':
              this.disburse_max_5jt.setValue(0)
              this.disburse_max_10jt.setValue(0)
              this.disburse_more_10jt.setValue(1)
              break;
            default:
              break;
          }
        } else {
          this.disburse_max_5jt.setValue(0)
          this.disburse_max_10jt.setValue(0)
          this.disburse_more_10jt.setValue(0)
        }
        this.menuao.setValue(0)
        this.menuadmin.setValue(0)
        this.menusuperadmin.setValue(0)
        this.pengaturanpinjamanFc.setValue(0)
        this.manajementpinjamanFc.setValue(0)
        this.kinjerkoperasiFc.setValue(0)
        this.manajementanggotaFc.setValue(0)
        break;
      default:
        this.approve_max_1jt.setValue(0)
        this.approve_max_3jt.setValue(0)
        this.approve_max_5jt.setValue(0)
        this.approve_max_10jt.setValue(0)
        this.approve_more_10jt.setValue(0)
        this.disburse_max_5jt.setValue(0)
        this.disburse_max_10jt.setValue(0)
        this.disburse_more_10jt.setValue(0)
        this.anguranFc.setValue(0)
        this.penagihanFc.setValue(0)
        break;
    }
    let iduse;
    if (type === 'create'){
      iduse = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'secret').toString(CryptoJS.enc.Utf8)).userId
    }else{
      iduse = this.iddata
    }
    this.formgrouppostdata = this.fb.group({
      "id_user": iduse,
      "fullname": [this.namaakuninputFc.value, [Validators.required]],
      "phone_mobile": [this.nohpakunFc.value.toString(), [Validators.required]],
      "birthdate": [this.tanggallahirFc.value, [Validators.required]],
      "email": [this.emailFc.value, [Validators.required]],
      "role": [this.optionfungsionalFc.value, [Validators.required]],
      "approve_max_1jt": [this.approve_max_1jt.value, [Validators.required]],
      "approve_max_3jt": [this.approve_max_3jt.value, [Validators.required]],
      "approve_max_5jt": [this.approve_max_5jt.value, [Validators.required]],
      "approve_max_10jt": [this.approve_max_10jt.value, [Validators.required]],
      "approve_more_10jt": [this.approve_more_10jt.value, [Validators.required]],
      "disburse_max_5jt": [this.disburse_max_5jt.value, [Validators.required]],
      "disburse_max_10jt": [this.disburse_max_10jt.value, [Validators.required]],
      "disburse_more_10jt": [this.disburse_more_10jt.value, [Validators.required]],
      "repayment": [this.anguranFc.value, [Validators.required]],
      "collection": [this.penagihanFc.value, [Validators.required]],
      "mn_kinerja_koperasi": [this.kinjerkoperasiFc.value, [Validators.required]],
      "mn_pengaturan_pinjaman": [this.pengaturanpinjamanFc.value, [Validators.required]],
      "mn_tambah_ao": [this.menuao.value, [Validators.required]],
      "mn_tambah_admin": [this.menuadmin.value, [Validators.required]],
      "mn_tambah_super_admin": [this.menusuperadmin.value, [Validators.required]],
      "mn_management_pinjaman": [this.manajementpinjamanFc.value, [Validators.required]],
      "mn_management_anggota": [this.manajementanggotaFc.value, [Validators.required]]
    });  
    
    if (this.optionfungsionalFc.value === 'AO/CMO/Sales'){
      if (this.persetujuanFc.value === true && this.pencarianFc.value === false){
        if (this.approve_max_1jt.value === 0 && this.approve_max_3jt.value === 0 && this.approve_max_5jt.value === 0
            && this.approve_max_10jt.value === 0 && this.approve_more_10jt.value === 0){
          status = 'invalid'
        }else{
          status = 'valid'
        }
      }
      if (this.persetujuanFc.value === false && this.pencarianFc.value === true){
        if (this.disburse_max_5jt.value === 0 && this.disburse_max_10jt.value === 0 && this.disburse_more_10jt.value === 0  ){
          status = 'invalid'
        }else{
          status = 'valid'
        }
      }
  
      if (this.persetujuanFc.value === true && this.pencarianFc.value === true){
        if (this.disburse_max_5jt.value === 0 && this.disburse_max_10jt.value === 0 && this.disburse_more_10jt.value === 0  ||
          this.approve_max_1jt.value === 0 && this.approve_max_3jt.value === 0 && this.approve_max_5jt.value === 0
            && this.approve_max_10jt.value === 0 && this.approve_more_10jt.value === 0){
          status = 'invalid'
        }else{
          status = 'valid'
        }
      }
      
      if (this.persetujuanFc.value === false && this.pencarianFc.value === false){
        status = 'valid'
      }
    }else{
      status = 'valid'
    }

    if (this.formgrouppostdata.status === "VALID" && status === 'valid') {
      this.kinjerkoperasiFc.setValue(this.kinjerkoperasiFc.value === true ? 1 : 0)
      this.pengaturanpinjamanFc.setValue(this.pengaturanpinjamanFc.value === true ? 1 : 0)
      this.manajementpinjamanFc.setValue(this.manajementpinjamanFc.value === true ? 1 : 0)
      this.manajementanggotaFc.setValue(this.manajementanggotaFc.value === true ? 1 : 0)
      this.anguranFc.setValue(this.anguranFc.value === true ? 1 : 0)
      this.penagihanFc.setValue(this.penagihanFc.value === true ? 1 : 0)
      switch (type) {
        case 'create':
          this.contentSvc.postakun(this.formgrouppostdata.value).subscribe(
            result => {
              if (result.status !== 500) {
                this.loadingshow = false;
                this.tambahakunmodal.hide();
                this.notifSvc.addNotification({
                  type: 'success',
                  head: 'Success',
                  body: result.message
                });
                this.getdata();
              } else {
                this.loadingshow = false;
                this.tambahakunmodal.hide();
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
          this.contentSvc.updatetakun(this.formgrouppostdata.value).subscribe(
            result => {
              if (result.status !== 500) {
                this.loadingshow = false;
                this.tambahakunmodal.hide();
                this.notifSvc.addNotification({
                  type: 'success',
                  head: 'Success',
                  body: result.message
                });
                this.getdata();
              } else {
                this.loadingshow = false;
                this.tambahakunmodal.hide();
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
        case 'statusnonaktif':
          const datainactive = {
            "status": "inactive"
          }
          this.contentSvc.updatestatusAkun(this.iddata, datainactive).subscribe(
            result => {
              if (result.status !== 500) {
                this.loadingshow = false;
                this.tambahakunmodal.hide();
                this.notifSvc.addNotification({
                  type: 'success',
                  head: 'Success',
                  body: result.message
                });
                this.getdata();
              } else {
                this.loadingshow = false;
                this.tambahakunmodal.hide();
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
          const dataactive = {
            "status": "active"
          }
          this.contentSvc.updatestatusAkun(this.iddata, dataactive).subscribe(
            result => {
              if (result.status !== 500) {
                this.loadingshow = false;
                this.tambahakunmodal.hide();
                this.notifSvc.addNotification({
                  type: 'success',
                  head: 'Success',
                  body: result.message
                });
                this.getdata();
              } else {
                this.loadingshow = false;
                this.tambahakunmodal.hide();
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
}
