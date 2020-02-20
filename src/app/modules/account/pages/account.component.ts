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
  showmodalcreate: boolean = false;
  statusmodal: any;
  dataloopdummy = [];
  p: number = 1;
  trigeralerts: boolean = false;
  showsuccessmodal:boolean = false;
  showerrormodal:boolean = false;
  showmodalview:boolean = false;
  trigeredit:boolean = false;
  showmodalreactive:boolean = false;
  showbuttonsava:boolean = false;
  isASC:boolean = false;
  pagecurrentvalue:number = 1;
  constructor(
    private state: StatemanagementService
  ) {}

  ngOnInit() {
    if (window.location.pathname.split("/")[1] !== "peers") {
      if (window.location.pathname.split("/")[1] !== "peers") {
        this.titlepage = window.location.pathname.split("/")[1];
      } else {
        this.titlepage = window.location.pathname.split("/")[2];
      }
    } else {
      this.titlepage = window.location.pathname.split("/")[2];
    }
    $("body").addClass("sidebar-collapse");
    this.loadData(this.pagecurrentvalue , 'all' , 'desc')
  }
  createaccountmodal() {
    this.showmodalcreate = true;
  }
  closemodal() {
    window.location.reload();
  }
  submitmodal(fullname, hp, email, birthday) {
  if (fullname === '' || hp === '' || email === '' || birthday === ''){
    this.trigeralerts = true;
    this.state.valuestatealerts = {
      type: "danger",
      content: "Form tidak boleh kosong"
    };
    setTimeout(() => {
      this.trigeralerts = false;
    }, 3000);
  }else{
    if (this.phonenumber(hp) === false) {
      this.trigeralerts = true;
      this.state.valuestatealerts = {
        type: "danger",
        content: "Invalid phone format"
      };
      setTimeout(() => {
        this.trigeralerts = false;
      }, 3000);
    }else if (this.validateEmail(email) === false) {
      this.trigeralerts = true;
      this.state.valuestatealerts = {
        type: "danger",
        content: "Invalid email format"
      };
      setTimeout(() => {
        this.trigeralerts = false;
      }, 3000);
    }
    if (
      this.phonenumber(hp) === true &&
      this.validateEmail(email) === true
    ){
      
      
    }
  }
  }
  pageclick(event) {
    this.pagecurrentvalue = event;
  }
  viewclick(index) {
    this.showmodalview = true;
  }
  reactiveclick() {
    this.showmodalreactive = true
  }
  editmodal(){
    if (this.trigeredit === false){
      $('#inputfullname').prop("disabled", false);
      $('#inputhp').prop("disabled", false);
      $('#inputemail').prop("disabled", false); 
      $('#inputbirthday').prop("disabled", false);
      this.showbuttonsava = true;
      this.trigeredit = true;
    }else{
      $('#inputid').prop("disabled", true);
      $('#inputfullname').prop("disabled", true);
      $('#inputhp').prop("disabled", true);
      $('#inputemail').prop("disabled", true); 
      $('#inputbirthday').prop("disabled", true);
      this.showbuttonsava = false;
      this.trigeredit = false;
    }
  }
  savemodalview(fullname,hp,email,birthday){
    if (this.phonenumber(hp) === false) {
      this.trigeralerts = true;
      this.state.valuestatealerts = {
        type: "danger",
        content: "Invalid phone format"
      };
      setTimeout(() => {
        this.trigeralerts = false;
      }, 3000);
    }else if (this.validateEmail(email) === false) {
      this.trigeralerts = true;
      this.state.valuestatealerts = {
        type: "danger",
        content: "Invalid email format"
      };
      setTimeout(() => {
        this.trigeralerts = false;
      }, 3000);
    }
    if (
      this.phonenumber(hp) === true &&
      this.validateEmail(email) === true
    ){
      
      
    }
  }
  savemodalreactive(){

  }

  validateEmail(input) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  }
  phonenumber(input) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (input.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  }
  sortinghandle(page){
    let sort;
    if (this.isASC == false){
      this.isASC = true;
      sort = 'asc';
    }else{
      this.isASC = false;
      sort = 'desc'
    }
    this.loadData(this.pagecurrentvalue,page,sort)
  }

  loadData(pagepagination,pagenavbar,order){
    this.dataloopdummy = [];
    console.log(pagepagination ,pagenavbar , order);
    let dataobjloop = {
      id: "data dummy",
      name: "data dummy"
    };
    for (let i = 0; i < 10; i++) {
      this.dataloopdummy.push(dataobjloop);
    }
  }
  searchnavbar(event,page , data){
    if (event.key === "Enter") {
      console.log(page , data);
    }
  }
}
