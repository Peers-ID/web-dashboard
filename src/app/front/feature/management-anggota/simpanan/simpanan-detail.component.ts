
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
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-simpanan-detail',
  templateUrl: './simpanan-detail.component.html',
  styleUrls: ['./simpanan-detail.component.scss']
})
export class SimpananDetailComponent implements OnInit {
  anggotasimpananshowdetail:boolean = false
  listdatasimpanananggotadetail = [];
  totalsimpananwajib:any;
  totalsimpananpokok:any;
  totalsimpanansukarela:any;
  namesimpanan:string;
  idsimpanan:any;
  totalsimpanan:any;
  totalgetdata = []
  idmember:any;
  constructor(
    private contentSvc: ContentService,
    public fb: FormBuilder,
    private notifSvc: NotificationService,
    private utilSvc:UtilService,
    private router:Router,
    private route :ActivatedRoute
  ) { }

  ngOnInit() {
    this.loaddata()
  }

  loaddata(){
    this.route.params.subscribe(
      result => {
        if (result) {
          this.namesimpanan = result.name;
          this.idmember = result.id;
          this.contentSvc.getsimpananTotal(result.id).subscribe(
            result => {
              this.anggotasimpananshowdetail = true;
              if (result.status === 200 && result.data.loan.length > 0){
                  result.data.loan.forEach(element => {
                      this.listdatasimpanananggotadetail.push(element)
                  });
              }else{
                this.listdatasimpanananggotadetail = []
              }
            }
          )
        }
      }
    )
  }
  clickproduct(id){
    // this.router.navigate(['/management-anggota-simpanan',id,this.namesimpanan]); 
  }
  detailsimpananbytype(type:any,id:any,nameproduct:any){
    this.router.navigate(['/management-anggota-simpanan',id,type,this.idmember,nameproduct]); 
  }
}
