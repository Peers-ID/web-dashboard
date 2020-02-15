import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  nameuser:string;
  trigerclicknavbar:boolean = false;
  constructor(
    private router : Router
  ) { }

  ngOnInit() {
    this.nameuser = JSON.parse(localStorage.getItem('currentUser')).email;
  }
  signout(){
    localStorage.removeItem('currentUser');
    localStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }
  navbarclick(){
    if ($( "body" ).hasClass( "sidebar-collapse" )){
      $("body").removeClass("sidebar-collapse");
    }else{
      $("body").addClass("sidebar-collapse");
    }
  }
}
