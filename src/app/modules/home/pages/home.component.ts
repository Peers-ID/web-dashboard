import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  titlepage:string;
  constructor() { }

  ngOnInit() {
    this.titlepage = window.location.pathname.split('/')[1];
  }

}
