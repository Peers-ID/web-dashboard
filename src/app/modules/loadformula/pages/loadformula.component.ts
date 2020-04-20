import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { FormControl } from "@angular/forms";
import { StatemanagementService } from "../../../core/services/statemanagement/statemanagement.service";
import { ApiService } from "../../../core/services/api/api.service";
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
  getservicefeeother: boolean = false;
  fcminamount: FormControl;
  fcmaxamount: FormControl;
  fckelipatan: FormControl;
  fcmintenure: FormControl;
  fcmaxtenure: FormControl;
  fcdatetenure: FormControl;
  dateselected: boolean = true;
  fcdateservicefee: FormControl;
  loopotherfee = [];
  fcformulaname: FormControl;
  objfeename: any;
  objotherfee: any;
  objotherfix: any;
  dataobjformcontrol: object;
  fcservicevalue: FormControl;
  trigeralerts: boolean = false;
  arrotherfee = []
  constructor(private state: StatemanagementService, private api: ApiService) {
    this.fcminamount = new FormControl("");
    this.fcmaxamount = new FormControl("");
    this.fckelipatan = new FormControl("");
    this.fcmintenure = new FormControl("");
    this.fcmaxtenure = new FormControl("");
    this.fcdatetenure = new FormControl("");
    this.fcdateservicefee = new FormControl("");
    this.fcformulaname = new FormControl("");
    this.fcservicevalue = new FormControl("");
  }

  ngOnInit() {
    if (window.location.pathname.split("/")[1] !== "peers") {
      this.titlepage = window.location.pathname.split("/")[1];
    } else {
      this.titlepage = window.location.pathname.split("/")[2];
    }
    // $("body").addClass("sidebar-collapse");
    this.FieldsChange(null, "renderinit");
    this.loopotherfee.push(this.indexincrement);
    this.renderinitdata();
  }
  addotherfee() {
    if (
      $("input[id=feevalueother" + [this.indexincrement] + "]").val() !== ""
    ) {
      this.indexincrement++;
      this.loopotherfee.push(this.indexincrement);
    }
  }
  FieldsChange(values, data) {
    switch (data) {
      case "minloanamount":
        this.getminloanamount = values.currentTarget.checked;
        if (this.getminloanamount) {
          this.fcminamount.enable();
        } else {
          this.fcminamount.disable();
        }
        break;
      case "maxloanamount":
        this.getmaxloanamount = values.currentTarget.checked;
        if (this.getmaxloanamount) {
          this.fcmaxamount.enable();
        } else {
          this.fcmaxamount.disable();
        }
        break;
      case "kelipatan":
        this.getkelipatan = values.currentTarget.checked;
        if (this.getkelipatan) {
          this.fckelipatan.enable();
        } else {
          this.fckelipatan.disable();
        }
        break;
      case "mintenure":
        this.getmintenure = values.currentTarget.checked;
        if (this.getmintenure) {
          this.fcmintenure.enable();
          if (this.getmintenure || this.getmaxtenure) {
            this.fcdatetenure.enable();
          } else {
            this.fcdatetenure.disable();
          }
        } else {
          this.fcmintenure.disable();
          if (this.getmintenure || this.getmaxtenure) {
            this.fcdatetenure.enable();
          } else {
            this.fcdatetenure.disable();
          }
        }
        break;
      case "maxtenure":
        this.getmaxtenure = values.currentTarget.checked;
        if (this.getmaxtenure) {
          this.fcmaxtenure.enable();
          if (this.getmintenure || this.getmaxtenure) {
            this.fcdatetenure.enable();
          } else {
            this.fcdatetenure.disable();
          }
        } else {
          this.fcmaxtenure.disable();
          if (this.getmintenure || this.getmaxtenure) {
            this.fcdatetenure.enable();
          } else {
            this.fcdatetenure.disable();
          }
        }
        break;
      case "servicefee":
        this.getservicefee = true;
        this.getservicefix = false;
        this.fcdateservicefee.enable();
        this.fcservicevalue.enable();
        break;
      case "servicefix":
        this.getservicefix = true;
        this.getservicefee = false;
        this.fcdateservicefee.enable();
        this.fcservicevalue.enable();
        break;
      case "servicefeeother":
        this.getservicefeeother = values.currentTarget.checked;
        break;
      case "renderinit":
        if (!this.getminloanamount) {
          this.fcminamount.disable();
        } else {
          this.fcminamount.enable();
        }
        if (!this.getmaxloanamount) {
          this.fcmaxamount.disable();
        } else {
          this.fcmaxamount.enable();
        }
        if (!this.getkelipatan) {
          this.fckelipatan.disable();
        } else {
          this.fckelipatan.enable();
        }
        if (!this.getmintenure) {
          this.fcmintenure.disable();
        } else {
          this.fcmintenure.enable();
        }
        if (!this.getmaxtenure) {
          this.fcmaxtenure.disable();
        } else {
          this.fcmaxtenure.enable();
        }
        if (!this.getmaxtenure || !this.getmintenure) {
          this.fcdatetenure.disable();
        } else {
          this.fcdatetenure.enable();
        }
        if (!this.getservicefee || !this.getservicefix) {
          this.fcdateservicefee.disable();
          this.fcservicevalue.disable();
        } else {
          this.fcservicevalue.enable();
          this.fcdateservicefee.enable();
        }
    }
  }
  saveloanformula() {
    if (!this.fcformulaname.value) {
      this.trigeralerts = true;
      this.state.valuestatealerts = {
        type: "danger",
        content: "Formula Name Cannot Null"
      };
      setTimeout(() => {
        this.trigeralerts = false;
      }, 3000);
    } else {
      this.arrotherfee = [];
      for (let i = 0; i < this.loopotherfee.length; i++) {
        let dataaddotherfee = {
          service_name: $("input[id=feenameother" + [i] + "]").val(),
          service_type: $("input[name=" + [i] + "]:checked").val(),
          service_amount: $("input[id=feevalueother" + [i] + "]").val(),
          service_cycle: $("#selectfeeother" + [i]).val()
        };
        this.arrotherfee.push(dataaddotherfee);
      }
      // let trigerpushother;
      // if (this.arrotherfee[0].service_name !== "" && this.arrotherfee[0].service_amount !== "") {
      //   trigerpushother = this.arrotherfee;
      // } else {
      //   trigerpushother = "";
      // }
      let valueservice;
      if (!this.getminloanamount) this.fcminamount.setValue("");
      if (!this.getmaxloanamount) this.fcmaxamount.setValue("");
      if (!this.getkelipatan) this.fckelipatan.setValue("");
      if (!this.getmintenure) this.fcmintenure.setValue("");
      if (!this.getmaxtenure) this.fcmaxtenure.setValue("");
      if (this.getservicefee && !this.getservicefix) {
        valueservice = "fee";
      } else if (!this.getservicefee && this.getservicefix) {
        valueservice = "fix";
      } else {
        valueservice = "";
      }
      let dataobj = {
        koperasi_id: JSON.parse(localStorage.getItem("currentUser"))
          .koperasi_id,
        formula_name: this.fcformulaname.value,
        min_loan_amount: this.fcminamount.value,
        max_loan_amount: this.fcmaxamount.value,
        kelipatan: this.fckelipatan.value,
        min_tenure: this.fcmintenure.value,
        max_tenure: this.fcmaxtenure.value,
        tenure_cycle: this.fcdatetenure.value,
        service_type: valueservice,
        service_amount: this.fcservicevalue.value,
        service_cycle: this.fcdateservicefee.value,
        other_fee: this.arrotherfee
      };
      this.api.postloanformula(dataobj).subscribe(data => {
        if (data["status"] === 201) {
          this.showsuccessmodal = true;
          this.state.valuestatusmodal = {
            content: data["message"]
          };
        } else {
          this.state.valuestatusmodal = {
            content: data["message"]
          };
          this.showerrormodal = true;
        }
      });
    }
  }
  changeradio() {
    for (let i = 0; i < this.loopotherfee.length; i++) {
      if (
        $("input[name=" + [i] + "]:checked").val() !== undefined ||
        $("input[name=" + [i] + "]:checked").val() !== ""
      )
        $("#selectfeeother" + [i]).removeAttr("disabled");
        $("#feevalueother" + [i]).removeAttr("disabled");
    }
  }

  renderinitdata(){
    this.api.getloanformula().subscribe(data => {
      localStorage.setItem(
        "koperasiData",
        JSON.stringify({
          formula_id: data['data'][0].id,
        })
      )
      if (data["data"][0].formula_name)
        this.fcformulaname.setValue(data["data"][0].formula_name);
      if (data["data"][0].min_loan_amount)
        this.fcminamount.setValue(data["data"][0].min_loan_amount);
      this.getminloanamount = true;
      this.fcminamount.enable();
      if (data["data"][0].max_loan_amount) {
        this.fcmaxamount.setValue(data["data"][0].max_loan_amount);
        this.getmaxloanamount = true;
        this.fcmaxamount.enable();
      }
      if (data["data"][0].kelipatan) {
        this.fckelipatan.setValue(data["data"][0].kelipatan);
        this.getkelipatan = true;
        this.fckelipatan.enable();
      }
      if (data["data"][0].min_tenure) {
        this.fcmintenure.setValue(data["data"][0].min_tenure);
        this.getmintenure = true;
        this.fcmintenure.enable();
      }
      if (data["data"][0].max_tenure) {
        this.fcmaxtenure.setValue(data["data"][0].max_tenure);
        this.getmaxtenure = true;
        this.fcmaxtenure.enable();
      }
      if (data["data"][0].tenure_cycle) {
        this.fcdatetenure.setValue(data["data"][0].tenure_cycle);
        this.fcdatetenure.enable();
      }
      if (data["data"][0].service_type === 'fix') {
        this.getservicefix = true;
        this.fcservicevalue.setValue(data["data"][0].service_amount)
        this.fcservicevalue.enable();        
        this.fcdateservicefee.setValue(data["data"][0].service_cycle)
        this.fcdateservicefee.enable()
      }
      if (data["data"][0].service_type === 'fee') {
        this.getservicefee = true;
        this.fcservicevalue.setValue(data["data"][0].service_amount)
        this.fcservicevalue.enable();        
        this.fcdateservicefee.setValue(data["data"][0].service_cycle)
        this.fcdateservicefee.enable()
      }

    });
    this.api.getotherfee().subscribe(data => {
      this.loopotherfee = [];
      let datatempother = [];
      data.data.forEach((element,index) => {
          if (element.service_name !== ''){
            this.loopotherfee.push(index)
            datatempother.push(element);
          }
      });
      datatempother.forEach((element,index) => {
        setTimeout(() => {
          $("#selectfeeother" + [index]).removeAttr("disabled");
          $("#feevalueother" + [index]).removeAttr("disabled");
          $("input[id=feenameother" + [index] + "]").val(element.service_name)
          $("#selectfeeother" + [index]).val(element.service_cycle)
          $("input[id=feevalueother" + [index] + "]").val(element.service_amount)
          if (element.service_type === 'fix'){
            $("#othercheckfix"+[index]).prop("checked", true);
          }else{
            $("#othercheckfee"+[index]).prop("checked", true);
          }
        }, 1000);          
      });      
      this.indexincrement = this.loopotherfee.length -1 ;
    })

  }
  removeotherfee(id){
    let idincrement = id.toElement.id.substring(id.toElement.id.length - 1)
  }
}
