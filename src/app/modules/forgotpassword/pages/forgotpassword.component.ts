import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { StatemanagementService } from "../../../core/services/statemanagement/statemanagement.service";
import { AuthenticationService } from "../../../core/authentication/authentication.service";
@Component({
  selector: "app-forgotpassword",
  templateUrl: "./forgotpassword.component.html",
  styleUrls: ["./forgotpassword.component.scss"]
})
export class ForgotpasswordComponent implements OnInit {
  titlepage: string;
  trigeralerts: boolean = false;
  showmodalerror: boolean = false;
  showmodalsuccess: boolean = false;
  constructor(private state: StatemanagementService,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    if (window.location.pathname.split("/")[1] !== "peers") {
      this.titlepage = window.location.pathname.split("/")[1];
    } else {
      this.titlepage = window.location.pathname.split("/")[2];
    }
  }
  forgotpassword(userinput, date) {
    if (userinput === "" || date === "") {
      this.trigeralerts = true;
      this.state.valuestatealerts = {
        type: "danger",
        content: "Form tidak boleh kosong"
      };
      setTimeout(() => {
        this.trigeralerts = false;
      }, 3000);
    } else {
      if (this.allnumeric(userinput) === true) {
        if (this.phonenumber(userinput) === false) {
          this.trigeralerts = true;
          this.state.valuestatealerts = {
            type: "danger",
            content: "Invalid phone format"
          };
          setTimeout(() => {
            this.trigeralerts = false;
          }, 3000);
        }
      } else {
        if (this.validateEmail(userinput) === false) {
          this.trigeralerts = true;
          this.state.valuestatealerts = {
            type: "danger",
            content: "Invalid email format"
          };
          setTimeout(() => {
            this.trigeralerts = false;
          }, 3000);
        }
      }
      if (
        this.phonenumber(userinput) === true ||
        this.validateEmail(userinput) === true
      ) {
      this.authenticationService.forgotpassword(userinput).subscribe(data =>{
        if (data['status'] === 200){
          this.state.valuestatusmodal = {
            content: 'Silahkan periksa inbox email anda'
          };
          this.showmodalsuccess = true;
        }else{
          this.state.valuestatusmodal = {
            content: data['message']
          };
          this.showmodalerror = true;
        }  
      })
      }
    }
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
    if (input.toString().length < 10 || input.toString().length > 12){
      return false;
    }else{
        return true;
    }
  }
  allnumeric(input) {
    var numbers = /^[0-9]+$/;
    if (input.match(numbers)) {
      return true;
    } else {
      return false;
    }
  }
}
