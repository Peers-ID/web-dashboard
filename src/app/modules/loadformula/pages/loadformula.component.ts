import { Component, OnInit, ViewChild } from "@angular/core";
import * as $ from "jquery";
import { FormControl } from '@angular/forms';
@Component({
  selector: "app-loadformula",
  templateUrl: "./loadformula.component.html",
  styleUrls: ["./loadformula.component.scss"]
})
export class LoadformulaComponent implements OnInit {
  titlepage: string;
  showsuccessmodal: boolean = false;
  showerrormodal: boolean = false;
  indexincrement: number = 0;
  getminloanamount: boolean = false;
  getmaxloanamount: boolean = false;
  getkelipatan: boolean = false;
  getmintenure: boolean = false;
  getmaxtenure: boolean = false;
  getservicefee: boolean = false;
  getservicefix: boolean = false;
  fcminamount : FormControl;
  fcmaxamount : FormControl;
  fckelipatan : FormControl;
  fcmintenure : FormControl;
  fcmaxtenure : FormControl;
  fcdatetenure : FormControl;
  dateselected:boolean = true;
  fcdateservicefee : FormControl;
  loopotherfee = [];
  servicefee: FormControl;
  servicefix: FormControl;
  fcservicefee: FormControl;
  fcservicefix : FormControl;
  fcformulaname: FormControl;
  constructor() {
    this.fcminamount = new FormControl('');
    this.fcmaxamount = new FormControl('');
    this.fckelipatan = new FormControl('');
    this.fcmintenure = new FormControl('');
    this.fcmaxtenure = new FormControl('');
    this.fcdatetenure = new FormControl('');
    this.fcdateservicefee = new FormControl('');
    this.servicefee = new FormControl('');
    this.fcservicefee = new FormControl('');
    this.fcservicefix = new FormControl('');
    this.fcformulaname = new FormControl('');
  }

  ngOnInit() {
    if (window.location.pathname.split("/")[1] !== "peers") {
      this.titlepage = window.location.pathname.split("/")[1];
    } else {
      this.titlepage = window.location.pathname.split("/")[2];
    }
    $("body").addClass("sidebar-collapse");
    this.FieldsChange(null, 'renderinit');
  }
  addotherfee() {
    this.indexincrement++;
    this.loopotherfee.push(this.indexincrement)
  }
  FieldsChange(values, data) {
    switch (data) {
      case "minloanamount":
        this.getminloanamount = values.currentTarget.checked
        if (this.getminloanamount){
          this.fcminamount.enable();
        }else{
          this.fcminamount.disable();
        }
        break;
      case "maxloanamount":
        this.getmaxloanamount = values.currentTarget.checked
        if (this.getmaxloanamount){
          this.fcmaxamount.enable();
        }else{
          this.fcmaxamount.disable();
        }
        break;
      case "kelipatan":
        this.getkelipatan = values.currentTarget.checked
        if (this.getkelipatan){
          this.fckelipatan.enable();
        }else{
          this.fckelipatan.disable();
        }
        break;
      case "mintenure":
        this.getmintenure = values.currentTarget.checked
        if (this.getmintenure){
          this.fcmintenure.enable();
            if (this.getmintenure || this.getmaxtenure){
              this.fcdatetenure.enable();
            }else{
              this.fcdatetenure.disable();
            }
        }else{
          this.fcmintenure.disable();
          if (this.getmintenure || this.getmaxtenure){
            this.fcdatetenure.enable();
          }else{
            this.fcdatetenure.disable();
          }
        }
        break;
      case "maxtenure":
        this.getmaxtenure = values.currentTarget.checked
        if (this.getmaxtenure){
          this.fcmaxtenure.enable();
          if (this.getmintenure || this.getmaxtenure){
            this.fcdatetenure.enable();
          }else{
            this.fcdatetenure.disable();
          }
        }else{
          this.fcmaxtenure.disable();
          if (this.getmintenure || this.getmaxtenure){
            this.fcdatetenure.enable();
          }else{
            this.fcdatetenure.disable();
          }
        }
        break;
        case "servicefee":
          this.getservicefee = values.currentTarget.checked;
          this.getservicefix = false;
          this.fcdateservicefee.enable();
          if (this.getservicefee){
            this.fcservicefee.enable();
            this.fcservicefix.disable();
          }else{
            this.fcservicefee.disable();
            this.fcservicefix.enable();
          }
        break;
        case "servicefix":
          this.getservicefee = false;
          this.getservicefix = values.currentTarget.checked;
          this.fcdateservicefee.enable();
          if (this.getservicefix){
            this.fcservicefix.enable();
            this.fcservicefee.disable();
          }else{
            this.fcservicefix.disable();
            this.fcservicefee.enable();
          }
        break;
      case "renderinit":
        if (!this.getminloanamount){
          this.fcminamount.disable();
        }else{
          this.fcminamount.enable();
        }
        if (!this.getmaxloanamount){
          this.fcmaxamount.disable();
        }else{
          this.fcmaxamount.enable();
        }
        if (!this.getkelipatan){
          this.fckelipatan.disable();
        }else{
          this.fckelipatan.enable();
        }
        if (!this.getmintenure){
          this.fcmintenure.disable();
        }else{
          this.fcmintenure.enable();
        }
        if (!this.getmaxtenure){
          this.fcmaxtenure.disable();
        }else{
          this.fcmaxtenure.enable();
        }
        if (!this.getmaxtenure || !this.getmintenure){
          this.fcdatetenure.disable();
        }else{
          this.fcdatetenure.enable();
        }
        if (!this.getservicefee || !this.getservicefix){
          this.fcdateservicefee.disable();
        }else{
          this.fcdateservicefee.enable();
        }
        if (!this.getservicefee){
          this.fcservicefee.disable();
        }else{
          this.fcservicefee.enable();
        }
        if (!this.getservicefix){
          this.fcservicefix.disable();
        }else{
          this.fcservicefix.enable();
        }
    }
  }
  saveloanformula() {    
    let dataobj = {
      "id_koperasi": "1",
      "formula_name": this.fcformulaname.value,
      "min_loan_amount": {
        "status": this.getminloanamount,
        "value": this.fcminamount.value,
      },
      "max_loan_amount": {
        "status": this.getmaxloanamount,
        "value": this.fcmaxamount.value,
      },
      "kelipatan": {
        "status": this.getkelipatan,
        "value": this.fckelipatan.value,
      },
      "min_tenure": {
        "status": this.getmintenure,
        "value": this.fcminamount.value,
        "date_range": this.fcdatetenure.value,
      },
      "max_tenure": {
        "status": this.getmaxtenure,
        "value": this.fcmaxtenure.value,
        "date_range": this.fcdatetenure.value,
      }
    }
    
  } 
}
