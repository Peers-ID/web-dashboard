import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modalerror',
  templateUrl: './modalerror.component.html',
  styleUrls: ['./modalerror.component.scss']
})
export class ModalerrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  closemodalerror(){
    window.location.reload()
  }
}
