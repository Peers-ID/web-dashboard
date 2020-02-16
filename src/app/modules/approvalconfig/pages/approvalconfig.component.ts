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
  getapprovalconfig: boolean = false;

  ngOnInit() {
    if (window.location.pathname.split('/')[1] !== 'peers'){
      if (window.location.pathname.split('/')[1] !== 'peers'){
      this.titlepage = window.location.pathname.split('/')[1];
    }else{
      this.titlepage = window.location.pathname.split('/')[2];
    }    
    }else{
      this.titlepage = window.location.pathname.split('/')[2];
    }    
    $("body").addClass("sidebar-collapse");
  }

  FieldsChange(values){
    this.getapprovalconfig = values.currentTarget.checked;
  }

}
