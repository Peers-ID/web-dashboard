import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ContentService } from '@app/core';
import { DatepickerConfig } from 'ngx-bootstrap';
import { element } from 'protractor';
import { MergeMapSubscriber } from 'rxjs/internal/operators/mergeMap';
import * as $ from "jquery";
@Component({
  selector: 'app-kinerja-koperasi',
  templateUrl: './kinerja-koperasi.component.html',
  styleUrls: ['./kinerja-koperasi.component.scss']
})
export class KinerjaKoperasiComponent implements OnInit {
  optionsmember:object;
  optionspencairan:object;
  optionssetoran:object;
  optionspinjaman:object;
  showkinerja:number;
  loading:boolean = true;
  constructor(
    private contentSvc: ContentService,
  ) { }

  ngOnInit() {
    this.loaddataagraph()
    let parselocalstorage = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'secret').toString(CryptoJS.enc.Utf8))        
    this.showkinerja = parselocalstorage.access.mn_kinerja_koperasi
  }


  loaddataagraph() {
    this.loading = false
    this.contentSvc.getGraph().subscribe(
      result => {
        let datacategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let datamember = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let datapencairan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let datasetoran = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let datapinjaman = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        if (result.data.member.length < 12) {
          for (let i = 0; i <= 12; i++) {
            if (result.data.member[i] !== undefined) {
              datamember[result.data.member[i].bulan - 1] = Number(result.data.member[i].data)
            }
          }
        }
        if (result.data.pencairan.length < 12) {
          for (let i = 0; i <= 12; i++) {
            if (result.data.pencairan[i] !== undefined) {
              datapencairan[result.data.pencairan[i].bulan - 1] = Number(result.data.pencairan[i].data)
            }
          }
        }
        if (result.data.setoran.length < 12) {
          for (let i = 0; i <= 12; i++) {
            if (result.data.setoran[i] !== undefined) {
              datasetoran[result.data.setoran[i].bulan - 1] = Number(result.data.setoran[i].data)
            }
          }
        }
        if (result.data.pinjaman.length < 12) {
          for (let i = 0; i <= 12; i++) {
            if (result.data.pinjaman[i] !== undefined) {
              datapinjaman[result.data.pinjaman[i].bulan - 1] = Number(result.data.pinjaman[i].data)
            }
          }
        }
        const dataseries = [
          { name: 'member', data: datamember },
          { name: 'pencairan', data: datapencairan },
          { name: 'setoran', data: datasetoran },
          { name: 'pinjaman', data: datapinjaman },
        ]
        this.optionsmember = {
          title: { text: 'Member Monitoring' },
          chart:{
            width: $("#containermember").width(),
          },
          xAxis: {
            categories: datacategories
          },
          yAxis: {
            title: {
              text: 'Value'
            },
            plotOptions: {
              line: {
                dataLabels: {
                  enabled: false
                },
                enableMouseTracking: false
              }
            },
          },
          series: [ { name: 'Member', data: datamember }]
        };
        this.optionspencairan = {
          title: { text: 'Pencairan Monitoring' },
          xAxis: {
            categories: datacategories
          },
          chart:{
            width: $("#containerpencairan").width(),
          },
          yAxis: {
            title: {
              text: 'Value'
            },
            plotOptions: {
              line: {
                dataLabels: {
                  enabled: false
                },
                enableMouseTracking: false
              }
            },
          },
          series: [ { name: 'Pencairan', data: datapencairan }]
        };
        this.optionssetoran = {
          title: { text: 'Setoran Monitoring' },
          chart:{
            width: $("#containersetoran").width(),
          },
          xAxis: {
            categories: datacategories
          },
          yAxis: {
            title: {
              text: 'Value'
            },
            plotOptions: {
              line: {
                dataLabels: {
                  enabled: false
                },
                enableMouseTracking: false
              }
            },
          },
          series: [ { name: 'Setoran', data: datasetoran }]
        };
        this.optionspinjaman = {
          title: { text: 'Pinjaman Monitoring' },
          chart:{
            width: $("#containerpinjaman").width(),
          },
          xAxis: {
            categories: datacategories
          },
          yAxis: {
            title: {
              text: 'Value'
            },
            plotOptions: {
              line: {
                dataLabels: {
                  enabled: false
                },
                enableMouseTracking: false
              }
            },
          },
          series: [ { name: 'Pinjaman', data: datapinjaman }]
        };
      }
    )
  }

}
