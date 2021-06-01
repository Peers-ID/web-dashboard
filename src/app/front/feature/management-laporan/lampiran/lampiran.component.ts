
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
import { environment } from '@env/environment';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';

@Component({
  selector: 'app-lampiran',
  templateUrl: './lampiran.component.html',
  styleUrls: ['./lampiran.component.scss']
})
export class LampiranComponent implements OnInit {
  baseUrl: any = environment.apiUrl;
  searchFc: FormControl = new FormControl()
  fromDateFc: FormControl = new FormControl()
  toDateFc: FormControl = new FormControl()
  listDataSearch = []
  dataSearchShow: boolean = false;
  loadingshow:boolean = false;
  lampiranshow:boolean = false;
  listdatalampiran = [];
  datalampiranshow:boolean = false;
  trigerclick: string = 'datapribadi';
  listdataproduk:any;
  listsimpanandataget:any;
  dataallurutan = [];
  formgrouppostdata: FormGroup;
  constructor(
    private contentSvc: ContentService,
    public fb: FormBuilder,
    private notifSvc: NotificationService,
    private utilSvc:UtilService
  ) {
   }

   ngOnInit(){
     
   }

  getdata(){
    this.listdatalampiran = []

    this.contentSvc.getListReportLampiran(this.formgrouppostdata.value).subscribe(
      result => {
        if(result.status !== 500){
          this.lampiranshow = true

          console.log(result)
          result.data.forEach(element => {
              this.listdatalampiran.push(element)
          });
        }else{
          this.lampiranshow = false
          this.listdatalampiran = []
        }
      }
    )
  }

  search(){
    this.formgrouppostdata = this.fb.group({
      "koperasi_id" : 1,
      "from_date":this.fromDateFc.value,
      "to_date":this.toDateFc.value
    })

    this.getdata()
  }
}
