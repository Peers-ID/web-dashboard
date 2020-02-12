import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-memberdata',
  templateUrl: './memberdata.component.html',
  styleUrls: ['./memberdata.component.scss']
})
export class MemberdataComponent implements OnInit {

  titlepage:string;
  constructor() { }

  ngOnInit() {
    this.titlepage = window.location.pathname.split('/')[1];
    $("body").addClass("sidebar-collapse");

  }

}
