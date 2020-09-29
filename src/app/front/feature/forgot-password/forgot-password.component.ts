import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from '@app/core';
import { FormGroup } from '@angular/forms';
import { NotificationService } from '@app/core';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loadingshow: boolean;
  constructor(
    private router: Router,
    private account: AccountService,
    private notifSvc: NotificationService,
  ) {
    this.loadingshow = false
  }

  ngOnInit() {
  }
  forgotpassword(userinput) {
    this.loadingshow = true
    if (userinput === "") {
      this.loadingshow = false
      this.notifSvc.addNotification({
        type: 'danger',
        head: 'Invalid Form Value',
        body: 'Please check your email format'
      });
    } else {
      if (this.allnumeric(userinput) === true) {
        if (this.phonenumber(userinput) === false) {
          this.loadingshow = false
          this.notifSvc.addNotification({
            type: 'danger',
            head: 'Invalid Form Value',
            body: 'Please check your email format'
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
        const data = {
          "email":userinput
        }
        this.account.forgotpassword(data).subscribe(
          result => {
              this.loadingshow = false
          }
        )
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
    if (input.toString().length < 10 || input.toString().length > 12) {
      return false;
    } else {
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
