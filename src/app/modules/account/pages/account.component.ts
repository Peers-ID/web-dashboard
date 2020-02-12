import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  titlepage:string;
  showmodalcreate:boolean;
  statusmodal:any;
  constructor() { }

  ngOnInit() {
    this.showmodalcreate = false;
    this.titlepage = window.location.pathname.split('/')[1];
    $("body").addClass("sidebar-collapse");

  }
  createaccountmodal(){
    this.showmodalcreate = true;
    console.log(this.showmodalcreate)
  }
  closemodal(){
    this.showmodalcreate = false;
  }
  submitmodal(){

  }
}
