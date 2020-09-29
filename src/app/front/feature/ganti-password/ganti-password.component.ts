
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, ValidatorFn, Validators } from '@angular/forms';
import { ContentService, NotificationService } from '@app/core';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-ganti-password',
  templateUrl: './ganti-password.component.html',
  styleUrls: ['./ganti-password.component.scss']
})
export class GantiPasswordComponent implements OnInit {

  passwordlamaFc:FormControl = new FormControl()
  passwordbaruFc:FormControl = new FormControl()
  konfirmasipasswordFc:FormControl = new FormControl()
  loadingshow:boolean;
  constructor(
    private contentSvc: ContentService,
    public fb: FormBuilder,
    private notifSvc: NotificationService
  ) { 
    this.loadingshow = false;
  }

  ngOnInit() {
  }
  Simpan(){
    this.loadingshow = true;
      if (this.passwordbaruFc.value === this.konfirmasipasswordFc.value){
        const data = {
          "email": JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'secret').toString(CryptoJS.enc.Utf8)).email,
          "password": this.passwordlamaFc.value,
          "password_new": this.passwordbaruFc.value
        }
        this.contentSvc.postChangepassword(data).subscribe(
          result => {
            this.loadingshow = false;
            if (result.status !== 500){
              this.notifSvc.addNotification({
                type: 'success',
                head: 'Success',
                body: result.message
              });              
            }else{
              this.notifSvc.addNotification({
                type: 'danger',
                head: 'Invalid Form Value',
                body: 'Please check your form'
              });              
            }
          }
        )
      }else{
        setTimeout(() => {
          this.loadingshow = false;
          this.notifSvc.addNotification({
            type: 'danger',
            head: 'Invalid Form Value',
            body: 'Please check your form'
          });
        }, 500);
      }
  }

}
