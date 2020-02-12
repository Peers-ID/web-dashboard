import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-loadformula',
  templateUrl: './loadformula.component.html',
  styleUrls: ['./loadformula.component.scss']
})
export class LoadformulaComponent implements OnInit {

  titlepage:string;
  constructor() { }

  ngOnInit() {
    this.titlepage = window.location.pathname.split('/')[1];
    $("body").addClass("sidebar-collapse");

  }

}
