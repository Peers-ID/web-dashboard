import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StatemanagementService } from "../../../core/services/statemanagement/statemanagement.service";
import { AuthenticationService } from "../../../core/authentication/authentication.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  trigeralerts: boolean = false;
  constructor(
    private router: Router,
    private state: StatemanagementService,
    private authentication: AuthenticationService
  ) {}

  ngOnInit() {}
  login(userinput, password) {
    if (userinput !== "" && password !== "") {
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
        this.authentication.login(userinput, password).subscribe(data => {
          if (data.data == "") {
            this.trigeralerts = true;
            this.state.valuestatealerts = {
              type: "danger",
              content: data.message
            };
            setTimeout(() => {
              this.trigeralerts = false;
            }, 3000);
          } else {
            localStorage.setItem(
              "currentUser",
              JSON.stringify({
                userId: data.data.user.id,
                email: data.data.user.email,
                token: data.data.token,
                role: "Admin Koperasi"
              })
            );
            if (JSON.parse(localStorage.getItem('currentUser')).role == 'Admin Koperasi'){
                this.router.navigate(["/loanapplication"]);
            }else{
              this.router.navigate(["/koperasiregistration"]);
            }
          }
        });
      }
    } else {
      this.trigeralerts = true;
      this.state.valuestatealerts = {
        type: "danger",
        content: "Form cannot null"
      };
      setTimeout(() => {
        this.trigeralerts = false;
      }, 3000);
    }
  }
  keyuplogin(event, userinput, password) {
    if (event.key === "Enter") {
      if (userinput !== "" && password !== "") {
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
          this.authentication.login(userinput, password).subscribe(data => {
            if (data.data == "") {
              this.trigeralerts = true;
              this.state.valuestatealerts = {
                type: "danger",
                content: data.message
              };
              setTimeout(() => {
                this.trigeralerts = false;
              }, 3000);
            } else {
              localStorage.setItem(
                "currentUser",
                JSON.stringify({
                  userId: data.data.user.id,
                  email: data.data.user.email,
                  token: data.data.token,
                  role: "Admin Koperasi"
                })
              );
              if (JSON.parse(localStorage.getItem('currentUser')).role == 'Admin Koperasi'){
                this.router.navigate(["/loanapplication"]);
            }else{
              this.router.navigate(["/koperasiregistration"]);
            }
            }
          });
        }
      } else {
        this.trigeralerts = true;
        this.state.valuestatealerts = {
          type: "danger",
          content: "Form cannot null"
        };
        setTimeout(() => {
          this.trigeralerts = false;
        }, 3000);
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
