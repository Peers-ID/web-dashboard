import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-cutofftime',
  templateUrl: './cutofftime.component.html',
  styleUrls: ['./cutofftime.component.scss']
})
export class CutofftimeComponent implements OnInit {

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
