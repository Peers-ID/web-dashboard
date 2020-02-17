import { Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  titlepage: string;
  dataloopdummy = [];
  showmodaltriger:boolean;
  showmodalviewloan:boolean = false;
  showmodalapproveloan:boolean = false;
  showmodalrejectloan:boolean = false;
  p: number = 1;
  constructor(
  ) { }
  ngOnInit() {
    this.showmodaltriger = false;
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
  }
  viewclick(id , data) {
    this.showmodalviewloan = true
  }
  approveclick() {
    this.showmodalapproveloan = true
  }
  rejectclick() {
    this.showmodalrejectloan = true;
  }
  closemodal(){
    window.location.reload();
  }
  approvemodalviewloan(){
    
  }
  rejectmodalviewloan(){

  }
  savemodalviewloan(){
    
  }
}
