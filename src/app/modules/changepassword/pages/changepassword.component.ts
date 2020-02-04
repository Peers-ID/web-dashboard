import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  titlepage:string;
  constructor() { }

  ngOnInit() {
    this.titlepage = window.location.pathname.split('/')[1];
  }

}
