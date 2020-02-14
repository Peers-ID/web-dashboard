import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  titlepage: string;
  dataloopdummy = [];
  p: number = 1;
  constructor() { }
  ngOnInit() {
    let dataobjloop = {
      'ao': 'ao1',
      'customer': 'data dummy',
      'tanggal': 'data dummy',
      'jumlah': 'data dummy',
      'tenor': 'data dummy'
    }
    if (window.location.pathname.split('/')[1] !== 'peers'){
      this.titlepage = window.location.pathname.split('/')[1];
    }else{
      this.titlepage = window.location.pathname.split('/')[2];
    }    
    for (let i = 0; i < 10; i++) {
      this.dataloopdummy.push(dataobjloop)
    }
      $("body").addClass("sidebar-collapse");

  }
  pageclick(page) {
    console.log(page)
  }
  viewclick() {
    console.log('run')
  }
  approveclick() {
    console.log('run')
  }
  rejectclick() {
    console.log('run')
  }
}
