import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { FormControl } from "@angular/forms";
import { StatemanagementService } from "../../../core/services/statemanagement/statemanagement.service";
import { ApiService } from "../../../core/services/api/api.service";
@Component({
  selector: "app-cutofftime",
  templateUrl: "./cutofftime.component.html",
  styleUrls: ["./cutofftime.component.scss"],
})
export class CutofftimeComponent implements OnInit {
  titlepage: string;
  fchours: FormControl;
  fcminutes: FormControl;
  dateselected: boolean = true;
  showmodalerror: boolean = false;
  showmodalsuccess: boolean = false;
  contentstatusmodal: any;
  constructor(
    private state: StatemanagementService,
    private apiservice: ApiService
  ) {
    this.fchours = new FormControl("");
    this.fcminutes = new FormControl("");
  }

  ngOnInit() {
    if (window.location.pathname.split("/")[1] !== "peers") {
      this.titlepage = window.location.pathname.split("/")[1];
    } else {
      this.titlepage = window.location.pathname.split("/")[2];
    }
    // $("body").addClass("sidebar-collapse");
    this.renderinitdata();
  }
  savecutofftime() {
    this.apiservice
      .postcutofftime(this.fchours.value, this.fcminutes.value)
      .subscribe((data) => {
        if (data["status"] === 201) {
          this.showmodalsuccess = true;
          this.contentstatusmodal = data['message']
        } else {
          this.contentstatusmodal = data['message']
          this.showmodalerror = true;
        }
      });
  }

  renderinitdata() {
    this.apiservice.getcutofftime().subscribe((data) => {
      this.fchours.setValue(this.pad(data.data[0].hours));
      this.fcminutes.setValue(this.pad(data.data[0].minutes));
    });
  }
  pad(d) {
    return d < 10 ? "0" + d.toString() : d.toString();
  }
  closemodaldialog(status) {
    if (status === "success") {
      this.showmodalsuccess = false;
    } else {
      this.showmodalerror = false;
    }
  }
}
