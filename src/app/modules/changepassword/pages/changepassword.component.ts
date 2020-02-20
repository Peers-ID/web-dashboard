import { Component, OnInit } from '@angular/core';
import { StatemanagementService } from "../../../core/services/statemanagement/statemanagement.service";
import * as $ from 'jquery';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  titlepage:string;
  showsuccessmodal:boolean = false;
  showerrormodal:boolean = false;
  trigeralerts:boolean = false;
  constructor(
    private state: StatemanagementService
  ) { }

  ngOnInit() {
    if (window.location.pathname.split('/')[1] !== 'peers'){
      this.titlepage = window.location.pathname.split('/')[1];
    }else{
      this.titlepage = window.location.pathname.split('/')[2];
    }    
    $("body").addClass("sidebar-collapse");

  }
  submit(passwordlama, passwordbaru, ulangipassword){
    if (passwordlama === '' || passwordbaru === '' || ulangipassword === ''){
      this.trigeralerts = true;
      this.state.valuestatealerts = {
        type: "danger",
        content: "Form tidak boleh kosong"
      };
      setTimeout(() => {
        this.trigeralerts = false;
      }, 3000);
    }else{
      if (passwordbaru !== ulangipassword){
        this.trigeralerts = true;
        this.state.valuestatealerts = {
          type: "danger",
          content: "Password tidak sama"
        };
        setTimeout(() => {
          this.trigeralerts = false;
        }, 3000);
      }else{
        console.log('sama==');
        
      }
    }
  }
}
