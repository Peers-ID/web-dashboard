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
    this.titlepage = window.location.pathname.split('/')[1];
    $("body").addClass("sidebar-collapse");
  }

}
