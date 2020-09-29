import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {ContentService} from '@app/core';
@Component({
  selector: 'app-kinerja-koperasi',
  templateUrl: './kinerja-koperasi.component.html',
  styleUrls: ['./kinerja-koperasi.component.scss']
})
export class KinerjaKoperasiComponent implements OnInit {

  constructor(
    private contentSvc: ContentService,
  ) { }

  ngOnInit() {
    // if (!localStorage.getItem("simpanan")) {
    //   this.contentSvc.getparametersimpanan().subscribe(
    //     simpanan => {
    //       if (simpanan) {
    //         var data = {
    //           data: simpanan.data,
    //         }
    //         localStorage.setItem("simpanan", CryptoJS.AES.encrypt(JSON.stringify(data), 'secret').toString());
    //       }
    //     }
    //   )
    //   this.contentSvc.getparameterpelunasan().subscribe(
    //     pelunasan => {
    //       if (pelunasan) {
    //         var data = {
    //           data: pelunasan.data,
    //         }
    //         localStorage.setItem("pelunasan", CryptoJS.AES.encrypt(JSON.stringify(data), 'secret').toString());
    //       }
    //     }
    //   )
    //   this.contentSvc.getparameterdenda().subscribe(
    //     denda => {
    //       if (denda) {
    //         var data = {
    //           data: denda.data,
    //         }
    //         localStorage.setItem("denda", CryptoJS.AES.encrypt(JSON.stringify(data), 'secret').toString());
    //       }
    //     }
    //   )
    //   this.contentSvc.getparametersebagian().subscribe(
    //     sebagian => {
    //       if (sebagian) {
    //         var data = {
    //           data: sebagian.data,
    //         }
    //         localStorage.setItem("sebagian", CryptoJS.AES.encrypt(JSON.stringify(data), 'secret').toString());
    //       }
    //     }
    //   )
    // }
  }

}
