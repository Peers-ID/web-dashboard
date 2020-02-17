import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";

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
  getminloanammount: boolean = false;
  getmaxloanammount: boolean = false;
  getkelipatan: boolean = false;
  getmintenure: boolean = false;
  getmaxtenure: boolean = false;
  constructor() {}

  ngOnInit() {
    if (window.location.pathname.split("/")[1] !== "peers") {
      this.titlepage = window.location.pathname.split("/")[1];
    } else {
      this.titlepage = window.location.pathname.split("/")[2];
    }
    $("body").addClass("sidebar-collapse");
  }
  addotherfee() {
    this.indexincrement++;
    $("#appendfee").append(
      `
    <div class="col-12 mt-1">
    <div class="row">
        <div class="col-4">
            Fee Name
        </div>
        <div class="col-3">
            <input type="text" style=" display: block;
            width: 100%;
            height: calc(1.5em + .75rem + 2px);
            padding: .375rem .75rem;
            font-size: 0.8rem;
            font-weight: 400;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: .25rem;
            -webkit-transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;">
        </div>
    </div>
</div>
<div class="col-12 mt-1">
    <div class="row">
        <div class="col-1">
            <input type="radio" name="serviceadd` +
        this.indexincrement +
        `">
        </div>
        <div class="col-3">
            (%)
        </div>
        <div class="col-3">
            <div class="row">
                <div class="col-3">Per</div>
                <div class="col-8"> <input type="text" style=" display: block;
                width: 100%;
                height: calc(1.5em + .75rem + 2px);
                padding: .375rem .75rem;
                font-size: 0.8rem;
                font-weight: 400;
                line-height: 1.5;
                color: #495057;
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid #ced4da;
                border-radius: .25rem;
                -webkit-transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;"></div>
            </div>
        </div>
        <div class="col-2">
            <select style="width: 100%;" style=" display: block;
            width: 100%;
            height: calc(1.5em + .75rem + 2px);
            padding: .375rem .75rem;
            font-size: 0.8rem;
            font-weight: 400;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: .25rem;
            -webkit-transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;">
                <option value="dummy">dummy</option>
            </select>
        </div>
    </div>
</div>
<div class="col-12 mt-1">
    <div class="row">
        <div class="col-1">
            <input type="radio" name="serviceadd` +
        this.indexincrement +
        `">
        </div>
        <div class="col-3">
            (fix)
        </div>
        <div class="col-3">
            <div class="row">
                <div class="col-3">Per</div>
                <div class="col-8"> <input type="text" style=" display: block;
                width: 100%;
                height: calc(1.5em + .75rem + 2px);
                padding: .375rem .75rem;
                font-size: 0.8rem;
                font-weight: 400;
                line-height: 1.5;
                color: #495057;
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid #ced4da;
                border-radius: .25rem;
                -webkit-transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;"></div>
            </div>
        </div>
        <div class="col-2">
            <select style="width: 100%;" >
                <option value="dummy">dummy</option>
            </select>
        </div>
    </div>
</div>
    `
    );
  }
  FieldsChange(values, data) {
    switch (data) {
      case "minloanammount":
        this.getminloanammount = values.currentTarget.checked
        break;
      case "maxloanammount":
        this.getmaxloanammount = values.currentTarget.checked
        break;
      case "kelipatan":
        this.getkelipatan = values.currentTarget.checked
        break;
      case "mintenure":
        this.getmintenure = values.currentTarget.checked
        break;
      case "maxtenure":
        this.getmaxtenure = values.currentTarget.checked
        break;
    }
  }
  saveloanformula() {
  }
}
