import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  titlepage: string;
  dataloopdummy = [];
  p: number = 1;
  isASC:boolean = false;
  pagecurrentvalue:number = 1;
  constructor() { }
  ngOnInit() {
  
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
  viewclick() {
    
  }
  approveclick() {
    
  }
  rejectclick() {
    
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
      'cost': 'data dummy',
      'waktu': 'data dummy',
      'jumlah': 'data dummy',
      'cicilanke': 'data dummy',
      'pokok': 'data dummy',
      'sukarela': 'data dummy'
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
