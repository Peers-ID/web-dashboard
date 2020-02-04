import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  active:string;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.active = window.location.pathname.split('/')[1];
    // console.log(this.active)
  }

  goTo(url){
    this.active = url;
  }
}
