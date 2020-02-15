import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  nameuser:string;
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
}
