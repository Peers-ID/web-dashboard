import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {AccountService } from '@app/core';
import {FormGroup } from '@angular/forms';
import {NotificationService} from '@app/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loadingshow:boolean;
  fg: FormGroup = new FormGroup({});
  constructor(
    private router: Router,
    private account: AccountService,
    private notifSvc: NotificationService,
  ) {
    this.loadingshow = false;
   }

  ngOnInit() {
  }
  login(userinput, password) {
    if (userinput !== "" && password !== "") {
      if (this.allnumeric(userinput) === true) {
        if (this.phonenumber(userinput) === false) {
          this.loadingshow = false
          this.notifSvc.addNotification({
            type: 'danger',
            head: 'Invalid Form Value',
            body: 'Please check your phone format'
          });
        }
      } else {
        if (this.validateEmail(userinput) === false) {
          this.loadingshow = false
          this.notifSvc.addNotification({
            type: 'danger',
            head: 'Invalid Form Value',
            body: 'Please check your email format'
          });
        }
      }
      if (
        this.phonenumber(userinput) === true ||
        this.validateEmail(userinput) === true
      ) {
        this.loadingshow = true;
        let data = {
          email:userinput,
          password: password
        }
        this.account.login(data).subscribe(
          result => {
            if (result) {
              this.loadingshow = false;
              this.router.navigate(['/']);
            }else{
              this.loadingshow = false;
            }              
          },error => {
            this.loadingshow = false;
          }
        );
      }
    } else {
      this.loadingshow = false;
      this.notifSvc.addNotification({
        type: 'danger',
        head: 'Invalid Form Value',
        body: 'Please check your form'
      });
    }
  }
  keyuplogin(event, userinput, password) {
    if (event.key === "Enter") {
      if (userinput !== "" && password !== "") {
        if (this.allnumeric(userinput) === true) {
          if (this.phonenumber(userinput) === false) {
            this.notifSvc.addNotification({
              type: 'danger',
              head: 'Invalid Form Value',
              body: 'Please check your phone format'
            });
          }
        } else {
          if (this.validateEmail(userinput) === false) {
            this.notifSvc.addNotification({
              type: 'danger',
              head: 'Invalid Form Value',
              body: 'Please check your email format'
            });
          }
        }
        if (
          this.phonenumber(userinput) === true ||
          this.validateEmail(userinput) === true
        ) {
          this.loadingshow = true;
          let data = {
            email:userinput,
            password: password
          }
          this.account.login(data).subscribe(
            result => {
              if (result) {
                this.loadingshow = false;
                this.router.navigate(['/']);
              }else{
                this.loadingshow = false;
              }              
            },error => {
              this.loadingshow = false;
            }
          );
        }
      } else {
        this.loadingshow = false;
        this.notifSvc.addNotification({
          type: 'danger',
          head: 'Invalid Form Value',
          body: 'Please check your form'
        });
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
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;    
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
  forgotPassword(){
    this.router.navigate(['/forgot-password'])
  }
}
