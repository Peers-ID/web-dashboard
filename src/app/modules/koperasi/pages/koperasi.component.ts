import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-koperasi',
  templateUrl: './koperasi.component.html',
  styleUrls: ['./koperasi.component.scss']
})
export class KoperasiComponent implements OnInit {

  titlepage:string;
  constructor() { }

  ngOnInit() {
    if (window.location.pathname.split('/')[1] !== 'peers'){
      this.titlepage = window.location.pathname.split('/')[1];
    }else{
      this.titlepage = window.location.pathname.split('/')[2];
    }    
    $("body").addClass("sidebar-collapse");
  }

}
