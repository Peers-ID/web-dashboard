
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
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
@Component({
  selector: 'app-simpanan-detail-byid',
  templateUrl: './simpanan-detail-byid.component.html',
  styleUrls: ['./simpanan-detail-byid.component.scss']
})
export class SimpananDetailByidComponent implements OnInit {
  anggotasimpananshowdetailtype: boolean = false
  listdatasimpanananggotadetailtype = [];
  namesimpanan: string;
  idsimpanan: any;
  typesimpanan: any;
  detailsimpanan: any;
  datasimpananggotashow: boolean = false;
  nominalFc: FormControl = new FormControl()
  @ViewChild('anggotasimpananmodal', { static: false }) public anggotasimpananmodal: any;
  @ViewChild('konfirmasimodal', { static: false }) public konfirmasimodal: any;
  contentkonfirmasi: string;
  datapenarikan: any;
  loadingshow: boolean;
  constructor(
    private contentSvc: ContentService,
    public fb: FormBuilder,
    private notifSvc: NotificationService,
    private utilSvc: UtilService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loaddata()
  }

  loaddata() {
    this.route.params.subscribe(
      result => {
        if (result) {
          this.namesimpanan = result.name;
          this.idsimpanan = result.id;
          this.typesimpanan = result.type;
          this.contentSvc.getsimpananDetail(this.typesimpanan, this.idsimpanan).subscribe(
            result => {
              this.anggotasimpananshowdetailtype = true;
              this.listdatasimpanananggotadetailtype = []
              if (result.status === 200) {
                this.detailsimpanan = result.data.slice(-1)[0].total_simpanan
                result.data.forEach(element => {
                  this.listdatasimpanananggotadetailtype.push(element)
                  if (element.simpanan_pokok) {
                    element['transaksi'] = element.simpanan_pokok
                  } else if (element.simpanan_wajib) {
                    element['transaksi'] = element.simpanan_wajib
                  } else {
                    element['transaksi'] = element.simpanan_sukarela
                  }
                });
              } else {
                this.listdatasimpanananggotadetailtype = []
              }
            }
          )
        }
      }
    )
  }
  konfirmasipenarikan() {
    this.anggotasimpananmodal.hide()
    this.konfirmasimodal.show();
    this.datapenarikan = this.utilSvc.formatnonNumber(this.nominalFc.value)
    this.contentkonfirmasi = 'Apakah anda yakin akan melakukan penarikan sebesar ' + this.utilSvc.prettyPrice(Number(this.datapenarikan))
  }
  penarikan() {
    this.anggotasimpananmodal.show();
    this.datasimpananggotashow = true;
    this.nominalFc.setValue('')
  }
  btnya() {
    this.loadingshow = true;
    this.konfirmasimodal.hide();
    if (this.detailsimpanan !== 0){
      this.loadingshow = false;
      if (this.datapenarikan <= this.detailsimpanan){
        const datapost = {
          "id_member": this.idsimpanan,
          "jumlah_penarikan": this.datapenarikan
        }
        this.contentSvc.postPenarikanSimpanan(this.typesimpanan, datapost).subscribe(
          result => {
            if (result.status === 200) {
              this.notifSvc.addNotification({
                type: 'success',
                head: 'Success',
                body: result.message
              });
              this.loaddata();
            } else {
              this.notifSvc.addNotification({
                type: 'danger',
                head: 'danger',
                body: result.message
              });
            }
            this.loadingshow = false
          }
        )
      }else{
        this.notifSvc.addNotification({
          type: 'danger',
          head: 'danger',
          body: 'Saldo tidak mencukupi'
        });
      }
    }else{
      this.loadingshow = false;
      this.notifSvc.addNotification({
        type: 'danger',
        head: 'danger',
        body: 'Saldo tidak mencukupi'
      });
    }
  }
}
