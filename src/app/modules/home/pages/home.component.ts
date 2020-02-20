import { Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  titlepage: string;
  dataloopdummy = [];
  showmodaltriger:boolean;
  showmodalviewloan:boolean = false;
  showmodalapproveloan:boolean = false;
  showmodalrejectloan:boolean = false;
  p: number = 1;
  isASC:boolean = false;
  pagecurrentvalue:number = 1;
  constructor(
  ) { }
  ngOnInit() {
    this.showmodaltriger = false;
   
    if (window.location.pathname.split('/')[1] !== 'peers'){
      this.titlepage = window.location.pathname.split('/')[1];
    }else{
      this.titlepage = window.location.pathname.split('/')[2];
    }    

      $("body").addClass("sidebar-collapse");
      this.loadData(this.pagecurrentvalue , 'all' , 'desc')

  }
  pageclick(event) {
    this.pagecurrentvalue = event;
  }
  viewclick(id , data) {
    this.showmodalviewloan = true
  }
  approveclick() {
    this.showmodalapproveloan = true
  }
  rejectclick() {
    this.showmodalrejectloan = true;
  }
  closemodal(){
    window.location.reload();
  }
  approvemodalviewloan(){
    
  }
  rejectmodalviewloan(){

  }
  savemodalviewloan(){
    
  }

  sortinghandle(page){
    let sort;
    if (this.isASC == false){
      this.isASC = true;
      sort = 'asc';
    }else{
      this.isASC = false;
      sort = 'desc'
    }
    this.loadData(this.pagecurrentvalue,page,sort)
  }
  loadData(pagepagination,pagenavbar,order){
    this.dataloopdummy = [];
    console.log(pagepagination ,pagenavbar , order);
    let dataobjloop = {
      'ao': 'ao1',
      'customer': 'data dummy',
      'tanggal': 'data dummy',
      'jumlah': 'data dummy',
      'tenor': 'data dummy'
    }
    for (let i = 0; i < 10; i++) {
      this.dataloopdummy.push(dataobjloop)
    }
  }
  searchnavbar(event,page , data){
    if (event.key === "Enter") {
      console.log(page , data);
    }
  }
}
