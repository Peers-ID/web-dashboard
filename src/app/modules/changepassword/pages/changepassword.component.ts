import { Component, OnInit } from '@angular/core';
import { StatemanagementService } from "../../../core/services/statemanagement/statemanagement.service";
import * as $ from 'jquery';
import { ApiService } from "../../../core/services/api/api.service";
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
  contentstatusmodal:any;
  constructor(
    private state: StatemanagementService,
    private api : ApiService
  ) { }

  ngOnInit() {
    if (window.location.pathname.split('/')[1] !== 'peers'){
      this.titlepage = window.location.pathname.split('/')[1];
    }else{
      this.titlepage = window.location.pathname.split('/')[2];
    }    
    // $("body").addClass("sidebar-collapse");

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
        this.api.postchangepassword(passwordlama , passwordbaru).subscribe(data => {
          if (data['status'] === 201){
            this.contentstatusmodal = data['message']
            this.showsuccessmodal = true;
          }else{
            this.contentstatusmodal = data['message']
            this.showerrormodal = true;
          }
        })
      }
    }
  }
  closemodaldialog(status){
    if (status === 'success'){
      window.location.reload();
    }else{  
        this.showerrormodal = false;
    }
  }
}
