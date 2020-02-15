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
  dataloopdummy = [];
  p: number = 1;
  constructor() { }

  ngOnInit() {
    this.showmodalcreate = false;
    let dataobjloop = {
      'id': 'data dummy',
      'name': 'data dummy',
    }
    if (window.location.pathname.split('/')[1] !== 'peers'){
      if (window.location.pathname.split('/')[1] !== 'peers'){
      this.titlepage = window.location.pathname.split('/')[1];
    }else{
      this.titlepage = window.location.pathname.split('/')[2];
    }    
    }else{
      this.titlepage = window.location.pathname.split('/')[2];
    }
    for (let i = 0; i < 10; i++) {
      this.dataloopdummy.push(dataobjloop)
    }
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
  pageclick(event){

  }
  viewclick(){
    console.log('run');
    
  }
  reactiveclick(){
    console.log('run');
    
  }
}
