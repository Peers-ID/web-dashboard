import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { StatemanagementService } from "../../../core/services/statemanagement/statemanagement.service";
import { ApiService } from "../../../core/services/api/api.service";
@Component({
  selector: 'app-approvalconfig',
  templateUrl: './approvalconfig.component.html',
  styleUrls: ['./approvalconfig.component.scss']
})
export class ApprovalconfigComponent implements OnInit {
  showmodalerror: boolean = false;
  showmodalsuccess: boolean = false;
  titlepage:string;
  constructor(
    private state: StatemanagementService,
    private apiservice: ApiService
  ) { }
  getapprovalconfig: boolean = false;

  ngOnInit() {
    if (window.location.pathname.split('/')[1] !== 'peers'){
      if (window.location.pathname.split('/')[1] !== 'peers'){
      this.titlepage = window.location.pathname.split('/')[1];
    }else{
      this.titlepage = window.location.pathname.split('/')[2];
    }    
    }else{
      this.titlepage = window.location.pathname.split('/')[2];
    }    
    $("body").addClass("sidebar-collapse");
    this.apiservice.getapprovalconfig().subscribe(data => {
      console.log(data['data'].length);
      console.log(data);
      if (data['data'].length > 0){
        this.getapprovalconfig = data['data'][0].ao_can_approved ? true : false;
      }
    })
  }

  FieldsChange(values){
    this.getapprovalconfig = values.currentTarget.checked;
    this.apiservice.postapprovalconfig(this.getapprovalconfig? 1: 0).subscribe(data =>{
      if (data["status"] === 201) {
        this.state.valuestatusmodal = {
          content: data["message"]
        };
        this.showmodalsuccess = true;
      } else {
        this.state.valuestatusmodal = {
          content: data["message"]
        };
        this.showmodalerror = true;
      }
    })
  }

}
