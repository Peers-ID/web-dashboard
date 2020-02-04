import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-koperasi',
  templateUrl: './koperasi.component.html',
  styleUrls: ['./koperasi.component.scss']
})
export class KoperasiComponent implements OnInit {

  titlepage:string;
  constructor() { }

  ngOnInit() {
    this.titlepage = window.location.pathname.split('/')[1];
  }

}
