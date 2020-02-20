import { Component, OnInit } from "@angular/core";
import { StatemanagementService } from "../../../core/services/statemanagement/statemanagement.service";
@Component({
  selector: "app-forgotpassword",
  templateUrl: "./forgotpassword.component.html",
  styleUrls: ["./forgotpassword.component.scss"]
})
export class ForgotpasswordComponent implements OnInit {
  titlepage: string;
  trigeralerts: boolean = false;
  constructor(private state: StatemanagementService) {}

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
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (input.match(phoneno)) {
      return true;
    } else {
      return false;
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
