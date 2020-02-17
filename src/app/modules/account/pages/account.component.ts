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
  showmodalview:boolean = false;
  trigeredit:boolean = false;
  showmodalreactive:boolean = false;
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
    // this.showmodalcreate = false;
    window.location.reload();
  }
  submitmodal(fullname, hp, email, birthday) {
    this.showmodalcreate = false;
    this.showsuccessmodal = true
  }
  pageclick(event) {}
  viewclick(index) {
    console.log(index);
    this.showmodalview = true;
  }
  reactiveclick() {
    this.showmodalreactive = true
  }
  editmodal(){
    if (this.trigeredit === false){
      $('#inputid').prop("disabled", false);
      $('#inputfullname').prop("disabled", false);
      $('#inputhp').prop("disabled", false);
      $('#inputemail').prop("disabled", false); 
      $('#inputbirthday').prop("disabled", false);
      this.trigeredit = true;
    }else{
      $('#inputid').prop("disabled", true);
      $('#inputfullname').prop("disabled", true);
      $('#inputhp').prop("disabled", true);
      $('#inputemail').prop("disabled", true); 
      $('#inputbirthday').prop("disabled", true);
      this.trigeredit = false;
    }
  }
  savemodalview(){
  }
  savemodalreactive(){

  }
}
