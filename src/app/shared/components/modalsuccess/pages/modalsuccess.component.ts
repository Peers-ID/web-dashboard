import { Component, OnInit } from '@angular/core';
import { StatemanagementService } from "../../../../core/services/statemanagement/statemanagement.service";
@Component({
  selector: 'app-modalsuccess',
  templateUrl: './modalsuccess.component.html',
  styleUrls: ['./modalsuccess.component.scss']
})
export class ModalsuccessComponent implements OnInit {

  contentstatusmodal:any;
  constructor(
    private state : StatemanagementService
  ) { }

  ngOnInit(): void {
    this.contentstatusmodal = this.state.valuestatusmodal.content;
  }
  closemodalsuccess(){
    window.location.reload();
  }
}
