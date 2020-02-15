import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-koperasi',
  templateUrl: './koperasi.component.html',
  styleUrls: ['./koperasi.component.scss']
})
export class KoperasiComponent implements OnInit {

  titlepage:string;
  constructor() { }
  @ViewChild('imageInput' , {static:false}) imageInput : ElementRef
  ngOnInit() {
    if (window.location.pathname.split('/')[1] !== 'peers'){
      this.titlepage = window.location.pathname.split('/')[1];
    }else{
      this.titlepage = window.location.pathname.split('/')[2];
    }    
    $("body").addClass("sidebar-collapse");
  }
  processFile(event){
    let data = new FormData();
    data.append('file', this.imageInput.nativeElement.files[0] , `${this.imageInput.nativeElement.files[0].name}`);
  }
}
