import { Component, OnInit } from '@angular/core';
import { StatemanagementService } from "../../../../core/services/statemanagement/statemanagement.service";

@Component({
  selector: 'app-modalerror',
  templateUrl: './modalerror.component.html',
  styleUrls: ['./modalerror.component.scss']
})
export class ModalerrorComponent implements OnInit {
  contentstatusmodal:any;
  constructor(
    private state : StatemanagementService

  ) { }

  ngOnInit(): void {
    this.contentstatusmodal = this.state.valuestatusmodal.content;
  }
  closemodalerror(){
    window.location.reload()
  }
}
