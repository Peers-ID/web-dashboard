import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { StatemanagementService } from "../../../core/services/statemanagement/statemanagement.service";
import { ApiService } from "../../../core/services/api/api.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  titlepage: string;
  showmodalcreate: boolean = false;
  statusmodal: any;
  dataloopdummy = [];
  p: number = 1;
  trigeralerts: boolean = false;
  showmodalview: boolean = false;
  trigeredit: boolean = false;
  showmodalreactive: boolean = false;
  showbuttonsava: boolean = false;
  showmodalerror: boolean = false;
  showmodalsuccess: boolean = false;
  isASC: boolean = false;
  pagecurrentvalue: number = 1;
  showmodaldeactive: boolean = false;
  loadingshow: boolean = false;
  totalpage: number;
  contentstatusmodal:any;
  constructor(
    private state: StatemanagementService,
    private apiservice: ApiService
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
    // $("body").addClass("sidebar-collapse");
    this.loadData(this.pagecurrentvalue, "createdAt", "desc");
  }
  createaccountmodal() {
    this.showmodalcreate = true;
  }
  closemodaldialog(modal) {
    switch (modal) {
      case "ao":
        this.showmodalcreate = false;
        break;
      case "view":
        this.showmodalview = false;
        break;
      case "reactive":
        this.showmodalreactive = false;
        break;
      case "deactive":
        this.showmodaldeactive = false;
        break;
      case "success":
        window.location.reload();
        break;
      case "error":
        this.showmodalerror = false;
        break;
    }
  }
  submitmodal(fullname, hp, email, birthday) {
    if (
      fullname === "" || 
    hp === "" || 
    email === "" || birthday === "") {
      this.trigeralerts = true;
      this.state.valuestatealerts = {
        type: "danger",
        content: "Form tidak boleh kosong",
      };
      setTimeout(() => {
        this.trigeralerts = false;
      }, 3000);
    } else {
      if (this.phonenumber(hp) === false) {
        this.trigeralerts = true;
        this.state.valuestatealerts = {
          type: "danger",
          content: "Invalid phone format",
        };
        setTimeout(() => {
          this.trigeralerts = false;
        }, 3000);
      } else if (this.validateEmail(email) === false) {
        this.trigeralerts = true;
        this.state.valuestatealerts = {
          type: "danger",
          content: "Invalid email format",
        };
        setTimeout(() => {
          this.trigeralerts = false;
        }, 3000);
      }
      if (this.phonenumber(hp) === true && this.validateEmail(email) === true) {
        this.apiservice
          .postcreateaccountmanagement(fullname, hp, email, birthday)
          .subscribe((data) => {
            if (data["data"] !== "") {
              this.contentstatusmodal = data['message']
              this.showmodalcreate = false;
              this.showmodalsuccess = true;
            } else {
              this.contentstatusmodal = data['message']
              this.showmodalcreate = false;
              this.showmodalerror = true;
            }
          });
      }
    }
  }
  pageclick(event) {
    this.pagecurrentvalue = event;
    this.loadData(this.pagecurrentvalue, "createdAt", "desc");
  }
  viewclick(idao) {
    this.showmodalview = true;
    this.state.valueidao = idao;
    this.apiservice.getdetailaccountao(idao).subscribe((data) => {
      $("#inputid").val(data["data"][0].id);
      $("#inputfullname").val(data["data"][0].fullname);
      $("#inputhp").val(data["data"][0].phone_mobile);
      $("#inputemail").val(data["data"][0].email);
      $("input[name=Date]").val(data["data"][0].birthdate.split(" ")[0]);
    });
  }
  reactiveclick(id) {
    this.showmodalreactive = true;
    this.showmodaldeactive = false;
    this.state.valueidao = id;
  }
  deactiveclick(id) {
    this.showmodalreactive = false;
    this.showmodaldeactive = true;
    this.state.valueidao = id;
  }
  editmodal() {
    if (this.trigeredit === false) {
      $("#inputfullname").prop("disabled", false);
      $("#inputhp").prop("disabled", false);
      $("#inputemail").prop("disabled", false);
      $("#inputbirthday").prop("disabled", false);
      this.showbuttonsava = true;
      this.trigeredit = true;
    } else {
      $("#inputid").prop("disabled", true);
      $("#inputfullname").prop("disabled", true);
      $("#inputhp").prop("disabled", true);
      $("#inputemail").prop("disabled", true);
      $("#inputbirthday").prop("disabled", true);
      this.showbuttonsava = false;
      this.trigeredit = false;
    }
  }
  savemodalview(fullname, hp, email, birthday) {
    if (this.phonenumber(hp) === false) {
      this.trigeralerts = true;
      this.state.valuestatealerts = {
        type: "danger",
        content: "Invalid phone format",
      };
      setTimeout(() => {
        this.trigeralerts = false;
      }, 3000);
    } else if (this.validateEmail(email) === false) {
      this.trigeralerts = true;
      this.state.valuestatealerts = {
        type: "danger",
        content: "Invalid email format",
      };
      setTimeout(() => {
        this.trigeralerts = false;
      }, 3000);
    }
    if (this.phonenumber(hp) === true && this.validateEmail(email) === true) {
      this.apiservice
        .updatedetailao(this.state.valueidao, fullname, hp, email, birthday)
        .subscribe((data) => {
          if (data["status"] == 201) {
            this.contentstatusmodal = data['message']
            this.showmodalsuccess = true;
            this.showmodalview = false;
          } else {
            this.contentstatusmodal = data['message']
            this.showmodalerror = true;
            this.showmodalview = false;
          }
        });
    }
  }
  savemodalreactive() {
    this.apiservice.poststatusactive(this.state.valueidao).subscribe((data) => {
      if (data["status"] == 201) {
        this.contentstatusmodal = data['message']
        this.showmodalsuccess = true;
        this.showmodalreactive = false;
      } else {
        this.contentstatusmodal = data['message']
        this.showmodalerror = true;
        this.showmodalreactive = false;
      }
    });
  }
  savemodaldeactive() {
    this.apiservice
      .poststatusinactive(this.state.valueidao)
      .subscribe((data) => {
        if (data["status"] == 201) {
          this.contentstatusmodal = data['message']
          this.showmodalsuccess = true;
          this.showmodaldeactive = false;
        } else {
          this.state.valuestatusmodal = {
            content: data["message"],
          };
          this.showmodalerror = true;
          this.showmodaldeactive = false;
        }
      });
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
    if (input.toString().length < 10 || input.toString().length > 12) {
      return false;
    } else {
      return true;
      // if (input.match(phoneno)) {
      //   return true;
      // } else {
      //   return false;
      // }
    }
  }
  sortinghandle(page) {
    let sort;
    if (this.isASC == false) {
      this.isASC = true;
      sort = "asc";
    } else {
      this.isASC = false;
      sort = "desc";
    }
    this.loadData(this.pagecurrentvalue, page, sort);
  }

  loadData(pagepagination, pagenavbar, order) {
    this.apiservice
      .getaccountao(pagepagination, pagenavbar, order)
      .subscribe((data) => {
        this.totalpage = data.message.total;
        let datanumber = (pagepagination - 1) * data.data.length + 1;
        this.dataloopdummy = [];
        data["data"].forEach((element, index) => {
          element["number"] = datanumber++;
          this.dataloopdummy.push(element);
        });
      });
  }
  searchnavbar(event, page, data) {
    if (event.key === "Enter") {
    }
  }
  searchclickdefault(data) {}
}
