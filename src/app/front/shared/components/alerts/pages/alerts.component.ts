import { Component, OnInit } from '@angular/core';
import { StatemanagementService } from "@app/core/statemanagement.service";
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  typealert : string;
  contentalert:string;

  constructor(
    private state : StatemanagementService
  ) { }

  ngOnInit() {
    this.typealert = this.state.valuestatealerts.type;
    this.contentalert = this.state.valuestatealerts.content;
  }

}
