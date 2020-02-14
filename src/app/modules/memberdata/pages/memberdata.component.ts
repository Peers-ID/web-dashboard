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
    if (window.location.pathname.split('/')[1] !== 'peers'){
      this.titlepage = window.location.pathname.split('/')[1];
    }else{
      this.titlepage = window.location.pathname.split('/')[2];
    }    
    $("body").addClass("sidebar-collapse");

  }

}
