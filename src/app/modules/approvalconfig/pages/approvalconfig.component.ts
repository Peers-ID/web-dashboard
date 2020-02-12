import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-approvalconfig',
  templateUrl: './approvalconfig.component.html',
  styleUrls: ['./approvalconfig.component.scss']
})
export class ApprovalconfigComponent implements OnInit {

  titlepage:string;
  constructor() { }

  ngOnInit() {
    this.titlepage = window.location.pathname.split('/')[1];
    $("body").addClass("sidebar-collapse");

  }

}
