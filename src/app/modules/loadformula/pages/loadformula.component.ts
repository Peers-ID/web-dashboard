import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-loadformula',
  templateUrl: './loadformula.component.html',
  styleUrls: ['./loadformula.component.scss']
})
export class LoadformulaComponent implements OnInit {

  titlepage:string;
  constructor() { }

  ngOnInit() {
    this.titlepage = window.location.pathname.split('/')[1];
  }

}
