import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modalsuccess',
  templateUrl: './modalsuccess.component.html',
  styleUrls: ['./modalsuccess.component.scss']
})
export class ModalsuccessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  closemodalsuccess(){
    window.location.reload();
  }
}
