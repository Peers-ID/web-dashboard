import { Component, OnInit} from "@angular/core";
import * as $ from "jquery";
import { FormControl} from '@angular/forms';
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
  getservicefeeother : boolean = false;
  fcminamount : FormControl;
  fcmaxamount : FormControl;
  fckelipatan : FormControl;
  fcmintenure : FormControl;
  fcmaxtenure : FormControl;
  fcdatetenure : FormControl;
  dateselected:boolean = true;
  fcdateservicefee : FormControl;
  loopotherfee = [];
  fcformulaname: FormControl;
  objfeename:any;
  objotherfee:any;
  objotherfix:any;
  dataobjformcontrol:object;
  fcservicevalue:FormControl;
  trigeralerts:boolean = false;
  constructor(
    private state: StatemanagementService,
    private api : ApiService
  ) {
    this.fcminamount = new FormControl('');
    this.fcmaxamount = new FormControl('');
    this.fckelipatan = new FormControl('');
    this.fcmintenure = new FormControl('');
    this.fcmaxtenure = new FormControl('');
    this.fcdatetenure = new FormControl('');
    this.fcdateservicefee = new FormControl('');
    this.fcformulaname = new FormControl('');
    this.fcservicevalue = new FormControl('')
  }

  ngOnInit() {
    if (window.location.pathname.split("/")[1] !== "peers") {
      this.titlepage = window.location.pathname.split("/")[1];
    } else {
      this.titlepage = window.location.pathname.split("/")[2];
    }
    $("body").addClass("sidebar-collapse");
    this.FieldsChange(null, 'renderinit');
    this.loopotherfee.push(this.indexincrement)
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
          this.fcdateservicefee.enable();
          this.fcservicevalue.enable();
        break;
        case "servicefix":
          this.fcdateservicefee.enable();
          this.fcservicevalue.enable();
          this.getservicefix = values.currentTarget.checked;
        break;
        case "servicefeeother":
          this.getservicefeeother = values.currentTarget.checked;
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
            this.fcservicevalue.disable();
        }else{
          this.fcservicevalue.enable()
          this.fcdateservicefee.enable();
        }
        
    }
  }
  saveloanformula() { 
    if (!this.fcformulaname.value){
      this.trigeralerts = true;
      this.state.valuestatealerts = {
        type: "danger",
        content: 'Formula Name Cannot Null'
      };
      setTimeout(() => {
        this.trigeralerts = false;
      }, 3000);
    }else{
      let arrotherfee = [];
      for(let i = 0; i<this.loopotherfee.length; i++ ){
        let dataaddotherfee = {
          "service_name" : $("input[id=feenameother"+[i]+"]").val(),
          "service_type" : $("input[name="+[i]+"]:checked").val(),
          "service_amount" : $("input[id=feevalueother"+[i]+"]").val(),
          "service_cycle" : $( "#selectfeeother"+[i] ).val()        ,
        }
        arrotherfee.push(dataaddotherfee)
      }  
      let trigerpushother;
        if (arrotherfee[0].service_name === ''){
            trigerpushother = ''
        }else{
              trigerpushother = arrotherfee        
        }
        let valueservice;
      if (!this.getminloanamount)    
        this.fcminamount.setValue('')
      if (!this.getmaxloanamount)
        this.fcmaxamount.setValue('')
      if (!this.getkelipatan)
          this.fckelipatan.setValue('')
      if (!this.getmintenure)
          this.fcmintenure.setValue('')
      if (!this.getmaxtenure)
          this.fcmaxtenure.setValue('')
      if (this.getservicefee && !this.getservicefix){
        valueservice = 'fee'
      }else if (!this.getservicefee && this.getservicefix){
        valueservice = 'fix'
      }else{
        valueservice = ''
      }    
      let dataobj = {
        "koperasi_id": JSON.parse(localStorage.getItem('currentUser')).koperasi_id,
          "formula_name":this.fcformulaname.value,
          "min_loan_amount": this.fcminamount.value,
          "max_loan_amount": this.fcmaxamount.value,
          "kelipatan": this.fckelipatan.value,
          "min_tenure": this.fcmintenure.value,
          "max_tenure": this.fcmaxtenure.value,
          "tenure_cycle": this.fcdatetenure.value,
          "service_type": valueservice,
          "service_amount": this.fcservicevalue.value,
          "service_cycle": this.fcdateservicefee.value,
          "other_fee": trigerpushother
      }
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
      })
    }
  }
  changeradio(){
    for(let i = 0; i<this.loopotherfee.length; i++ ){
      if ($("input[name="+[i]+"]:checked").val() !== undefined || $("input[name="+[i]+"]:checked").val() !== '')
        $('#selectfeeother'+[i]).removeAttr("disabled");
        $('#feevalueother'+[i]).removeAttr("disabled");
    }
  } 
}
