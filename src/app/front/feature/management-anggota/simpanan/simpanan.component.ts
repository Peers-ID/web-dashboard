
import { BoundElementProperty } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, ValidatorFn, Validators } from '@angular/forms';
import { ContentService, NotificationService } from '@app/core';
import * as CryptoJS from 'crypto-js';
import { ComponentLoaderFactory, idLocale } from 'ngx-bootstrap';
import { element } from 'protractor';
import { ignoreElements } from 'rxjs/operators';
import { UtilService } from "@app/core/util.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-simpanan',
  templateUrl: './simpanan.component.html',
  styleUrls: ['./simpanan.component.scss']
})
export class SimpananComponent implements OnInit {
  listdatasimpanananggota = [];
  searchFc: FormControl = new FormControl()
  listDataSearch = []
  dataSearchShow: boolean = false;
  anggotasimpananshow:boolean = false;
  constructor(
    private contentSvc: ContentService,
    public fb: FormBuilder,
    private notifSvc: NotificationService,
    private utilSvc:UtilService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getdata();
  }
  getdata(){
    this.listdatasimpanananggota = []
    this.contentSvc.getlistMember().subscribe(
      result => {
        if(result.status !== 500){
          this.anggotasimpananshow = true
          result.data.forEach(element => {
            this.listdatasimpanananggota.push(element)
          });
        }else{
          this.anggotasimpananshow = false
          this.listdatasimpanananggota = []
        }
      }
    )
  }
  detailmember(id,nama){
    this.router.navigate(['/management-anggota-simpanan',id,nama]);
  }

  search(){
      this.listDataSearch = []
      this.listDataSearch = this.listdatasimpanananggota.filter( anggota => anggota.nama_lengkap.toLowerCase().includes(this.searchFc.value.toLowerCase()))
      this.dataSearchShow = true
  }
}
