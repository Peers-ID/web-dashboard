import { Component, OnInit } from '@angular/core';

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
  }

}
