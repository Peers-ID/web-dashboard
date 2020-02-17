import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { StatemanagementService } from "../../../core/services/statemanagement/statemanagement.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
  titlepage: string;
  showmodalcreate: boolean;
  statusmodal: any;
  dataloopdummy = [];
  p: number = 1;
  trigeralerts: boolean = false;
  showsuccessmodal:boolean = false;
  showerrormodal:boolean = false;
  constructor(
    private state: StatemanagementService
  ) {}

  ngOnInit() {
    this.showmodalcreate = false;
    let dataobjloop = {
      id: "data dummy",
      name: "data dummy"
    };
    if (window.location.pathname.split("/")[1] !== "peers") {
      if (window.location.pathname.split("/")[1] !== "peers") {
        this.titlepage = window.location.pathname.split("/")[1];
      } else {
        this.titlepage = window.location.pathname.split("/")[2];
      }
    } else {
      this.titlepage = window.location.pathname.split("/")[2];
    }
    for (let i = 0; i < 10; i++) {
      this.dataloopdummy.push(dataobjloop);
    }
    $("body").addClass("sidebar-collapse");
  }
  createaccountmodal() {
    this.showmodalcreate = true;
  }
  closemodal() {
    this.showmodalcreate = false;
  }
  submitmodal(fullname, hp, email, birthday) {
    this.showmodalcreate = false;
    this.showsuccessmodal = true
  }
  pageclick(event) {}
  viewclick() {
  }
  reactiveclick() {
  }
}
