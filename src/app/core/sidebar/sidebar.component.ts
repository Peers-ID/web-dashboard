import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  active:string;
  trigeraccount:string;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (window.location.pathname.split('/')[1] !== 'peers'){
      this.active = window.location.pathname.split('/')[1];
    }else{
      this.active = window.location.pathname.split('/')[2];
    }    
    this.trigeraccount = JSON.parse(localStorage.getItem("currentUser")).role 
  }

  goTo(url){
    this.active = url;
  }
}
