import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  titlepage:string;
  constructor() { }

  ngOnInit() {
    this.titlepage = window.location.pathname.split('/')[1];
    console.log(this.titlepage)
  }

}
