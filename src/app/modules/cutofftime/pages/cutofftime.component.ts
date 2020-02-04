import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cutofftime',
  templateUrl: './cutofftime.component.html',
  styleUrls: ['./cutofftime.component.scss']
})
export class CutofftimeComponent implements OnInit {

  titlepage:string;
  constructor() { }

  ngOnInit() {
    this.titlepage = window.location.pathname.split('/')[1];
  }

}
