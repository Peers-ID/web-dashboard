
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
@Component({
  selector: 'app-pinjaman',
  templateUrl: './pinjaman.component.html',
  styleUrls: ['./pinjaman.component.scss']
})
export class PinjamanComponent implements OnInit {
  listangsuransebagain: any;
  loadingshow:boolean = false;
  listperhitunganpelunasandipercepat: any;
  listsimpanan: any;
  listdendasar: any;
  anggotapinjamanshow:boolean = false;
  listdatapinjamananggota = [];
  datapinjamananggotashow:boolean = false;
  trigerclick: string = 'datapribadi';
  dataloandetailmember: any;
  detailloan:any;
  detailtenor:any;
  listpembayaranangsuran:any;
  valuehariFc:FormControl = new FormControl()
  cicilanvalueFc:FormControl = new FormControl()
  cicilanFc:FormControl = new FormControl()
  masatenggangvalueFc:FormControl = new FormControl()
  masatengganghariFc:FormControl = new FormControl()
  dendaketerlambatanFc:FormControl = new FormControl()
  dasarpengenaandendaFc:FormControl = new FormControl()
  pelunasandipercepatFc:FormControl = new FormControl()
  perhitunganFc:FormControl = new FormControl()
  apakahsimpananFc:FormControl = new FormControl()
  checkbungavalue:boolean;
  datapinjamananggotashowdetail:boolean = false;
  @ViewChild('anggotapinjamanmodal', { static: false }) public anggotapinjamanmodal: any;
  @ViewChild('detailanggotapinjaman', { static: false }) public detailanggotapinjaman: any;
  listdataprodukanggota:any;
  listsimpanandataget:any;
  dataallurutan = []
  imageKtp: string = ''
  imageKk: string = ''
  imageSuratkerja: string = ''
  imageSIM: string = ''
  imageSlipgaji: string = ''
  imageAktanikah: string = ''
  imageBPKB: string = ''
  imageDokumenlainnya: string = ''
  imageBuktiPencairan:string = ''
  constructor(
    private contentSvc: ContentService,
    public fb: FormBuilder,
    private notifSvc: NotificationService,
    private utilSvc:UtilService
  ) {
   }

  ngOnInit() {
        if (!localStorage.getItem("simpanan") || !localStorage.getItem("pelunasan") || !localStorage.getItem("denda") || !localStorage.getItem("sebagian")) {
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
                              this.getdata()
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
      this.getdata()
    }
  }

  getdata(){
    this.listdatapinjamananggota = []
    this.contentSvc.getlistMember().subscribe(
      result => {
        if(result.status !== 500){
          this.anggotapinjamanshow = true
          result.data.forEach(element => {
            this.listdatapinjamananggota.push(element)
          });
        }else{
          this.anggotapinjamanshow = false
          this.listdatapinjamananggota = []
        }
      }
    )
    if (localStorage.getItem("sebagian") && localStorage.getItem("denda") && localStorage.getItem("simpanan")) {
      this.listangsuransebagain = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('sebagian'), 'secret').toString(CryptoJS.enc.Utf8))
      this.listdendasar = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('denda'), 'secret').toString(CryptoJS.enc.Utf8))
      this.listperhitunganpelunasandipercepat = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('pelunasan'), 'secret').toString(CryptoJS.enc.Utf8))
      this.listsimpanan = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('simpanan'), 'secret').toString(CryptoJS.enc.Utf8))
    }
  }
  detailmember(id){
    this.anggotapinjamanmodal.show()
    this.loadata(id)
  }
  navtabclick(data) {
    this.trigerclick = data
  }
  loadata(id: any) {
    this.contentSvc.getLoadbyId(id).subscribe(
      result => {
        if (result.status !== 500) {
          this.datapinjamananggotashow = true
          this.dataloandetailmember = result.data.member
          if (result.data.member.dokumen_ktp) this.imageKtp = 'http://api.peers.id/files/' +  result.data.member.dokumen_ktp
          if (result.data.member.dokumen_kk) this.imageKk = 'http://api.peers.id/files/' +  result.data.member.dokumen_kk
          if (result.data.member.dokumen_sim) this.imageSIM = 'http://api.peers.id/files/' +  result.data.member.dokumen_sim
          if (result.data.member.dokumen_keterangan_kerja) this.imageSuratkerja = 'http://api.peers.id/files/' +  result.data.member.dokumen_keterangan_kerja
          if (result.data.member.dokumen_slip_gaji) this.imageSlipgaji = 'http://api.peers.id/files/' +  result.data.member.dokumen_slip_gaji
          if (result.data.member.dokumen_akta_nikah) this.imageAktanikah = 'http://api.peers.id/files/' +  result.data.member.dokumen_akta_nikah
          if (result.data.member.dokumen_bpkb) this.imageBPKB = 'http://api.peers.id/files/' +  result.data.member.dokumen_bpkb
          if (result.data.member.dokumen_lainnya) this.imageDokumenlainnya = 'http://api.peers.id/files/' +  result.data.member.dokumen_lainnya
          this.listdataprodukanggota = result.data.loan

        }else{
          this.datapinjamananggotashow = false
        }
      }
    )
  }
  statusproduk(id:any){    
    this.anggotapinjamanmodal.hide()
    this.detailanggotapinjaman.show()
    this.contentSvc.getcollectionId(id).subscribe(
      result => {
        if (result.status !== 500){
          this.datapinjamananggotashowdetail = true
          this.detailloan = result.data.loan
          this.detailtenor = result.data.product
          if (result.data.loan.member_photo_url) this.imageBuktiPencairan = 'http://api.peers.id/files/' + result.data.loan.member_photo_url
          if (/^\d+$/.test(result.data.loan.bunga_pinjaman)) this.checkbungavalue = true
          else this.checkbungavalue = true
          this.listpembayaranangsuran = result.data.collection
          this.valuehariFc.setValue(result.data.parameter.hari_per_bulan)
          if (result.data.parameter.id_angsuran_sebagian !== 0){
            this.cicilanvalueFc.setValue('Ya')
            this.listangsuransebagain.data.forEach(element => {
              if (element.id === result.data.parameter.id_angsuran_sebagian){
                this.cicilanFc.setValue(element.desc_dasar_cicilan_sebagian)
              }
            });
          }else{
            this.cicilanvalueFc.setValue('Tidak')
          }
          if (result.data.parameter.id_masa_tenggang !== 0){
            this.masatenggangvalueFc.setValue('Ya')
            this.masatengganghariFc.setValue(result.data.parameter.id_masa_tenggang)
          }else{
            this.masatenggangvalueFc.setValue('Tidak')
          }
          this.dendaketerlambatanFc.setValue(result.data.parameter.type_denda_keterlambatan)
          if (result.data.parameter.id_dasar_denda !== 0){
            this.listdendasar.data.forEach(element => {
                if (element.id === result.data.parameter.id_dasar_denda){
                  this.dasarpengenaandendaFc.setValue(element.desc_dasar_denda) 
                }
            });
          }else{
            this.dasarpengenaandendaFc.setValue('')
          }
          if (result.data.parameter.id_dasar_pelunasan !== 0){
            this.listperhitunganpelunasandipercepat.data.forEach(element => {
                if (element.id === result.data.parameter.id_dasar_pelunasan){
                  this.perhitunganFc.setValue(element.desc_dasar_pelunasan)
                }
            });
          }else{
            this.perhitunganFc.setValue('')
          }
          this.pelunasandipercepatFc.setValue(result.data.parameter.type_pelunasan_dipercepat)
          if (result.data.parameter.id_urutan_simpanan !== ""){
            this.apakahsimpananFc.setValue('Ya')
          }else{
            this.apakahsimpananFc.setValue('Tidak')
          }
          let data  = result.data.parameter.id_urutan_simpanan;
          const databj = data.split('|').join(',').split('')
          const dataarrpush  = []
          this.dataallurutan = []
          databj.forEach(data => {
            if (data !== ','){        
              dataarrpush.push(data)  
            }
          })
          dataarrpush.forEach(element => {
            for (let a of this.listsimpanan.data) {
              if (a.id == element){
                  this.dataallurutan.push(a)
              }
            }
          })
        }
      }
    )   
  }
}
