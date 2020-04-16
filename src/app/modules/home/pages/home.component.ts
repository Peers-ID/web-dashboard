import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { StatemanagementService } from "../../../core/services/statemanagement/statemanagement.service";
import { ApiService } from "../../../core/services/api/api.service";
import { FormControl } from "@angular/forms";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  titlepage: string;
  dataloanaplication = [];
  showmodaltriger: boolean;
  showmodalviewloan: boolean = false;
  showmodalapproveloan: boolean = false;
  showmodalrejectloan: boolean = false;
  trigernodatahistory: boolean = false;
  trigernodatamember: boolean = false;
  trigernodataloan: boolean = false;
  p: number = 1;
  isASC: boolean = false;
  pagecurrentvalue: number = 1;
  loadingshow: boolean = false;
  loandataget: any;
  loandatamemberget: any;
  datahistorygetall = [];
  idmemberloan : number ;
  statusmemberloan : number;
  showmodalerror: boolean = false;
  showmodalsuccess: boolean = false;
  totalpage:number;
  constructor(private api: ApiService, private state: StatemanagementService) {
  }
  ngOnInit() {
    this.showmodaltriger = false;
    if (window.location.pathname.split("/")[1] !== "peers") {
      this.titlepage = window.location.pathname.split("/")[1];
    } else {
      this.titlepage = window.location.pathname.split("/")[2];
    }
    $("body").addClass("sidebar-collapse");
    this.loadData(this.pagecurrentvalue, "createdAt", "desc");
  }
  pageclick(event) {
    this.pagecurrentvalue = event;
    this.loadData(this.pagecurrentvalue, "createdAt", "desc");
  }
  viewclick(idloan, idmember) {
    this.api.getviewloanapilcation(idloan).subscribe((data) => {
      if (data.data !== '') {
        this.loandataget = data.data;
      } else {
        this.trigernodataloan = true;
      }
    });
    this.api.getviewmemberloanapilcation(idmember).subscribe((data) => {
      if (data.data.length !== 0) {
        this.loandatamemberget = data.data[0];
      } else {
        this.trigernodatamember = true;
      }
    });
    this.api.gethistoryloanapilcation(1, idmember).subscribe((data) => {
      this.datahistorygetall = [];
      if (data.data.length === 0) {
        this.datahistorygetall = [];
      } else {
        data.data.forEach((element) => {
          this.datahistorygetall.push(element);
        });
      }      
      this.api.gethistoryloanapilcation(2, idmember).subscribe((data) => {
        if (data.data.length !== 0) {
          data.data.forEach((element) => {
            this.datahistorygetall.push(element);
          });
        }
      });
      if (this.datahistorygetall.length === 0){
        this.trigernodatahistory = true;
      }else{
        this.trigernodatahistory = false;
      } 
      this.showmodalviewloan = true;
    });
    
  }
  approveclick(idmember, status) {
    this.idmemberloan = idmember;
    this.statusmemberloan = status;
    this.showmodalapproveloan = true;
  }
  rejectclick(idmember, status) {
    this.idmemberloan = idmember;
    this.statusmemberloan = status;
    this.showmodalrejectloan = true;
  }
  approvemodalviewloan() {
    this.api.getstatusloanapplication(this.idmemberloan , this.statusmemberloan).subscribe(data => {
      if (data["status"] == 201) {
        this.state.valuestatusmodal = {
          content: data["message"]
        };
        this.showmodalsuccess = true;
        this.showmodalapproveloan = false;
      } else {
        this.state.valuestatusmodal = {
          content: data["message"]
        };
        this.showmodalerror = true;
        this.showmodalapproveloan = false;
      }
    })
  }
  rejectmodalviewloan() {
    this.api.getstatusloanapplication(this.idmemberloan , this.statusmemberloan).subscribe(data => {
      if (data["status"] == 201) {
        this.state.valuestatusmodal = {
          content: data["message"]
        };
        this.showmodalsuccess = true;
        this.showmodalrejectloan = false;
      } else {
        this.state.valuestatusmodal = {
          content: data["message"]
        };
        this.showmodalerror = true;
        this.showmodalrejectloan = false;
      }
    })
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
    this.api
      .getloanapilcation(pagepagination, pagenavbar, order)
      .subscribe((data) => {
      this.totalpage = data.message.total
      let datanumber = ((pagepagination - 1) * data.data.length) + 1
      this.dataloanaplication = [];
        data["data"].forEach((element, index) => {
          element['number'] = datanumber++;
          this.dataloanaplication.push(element);
        });
      });
      
  }
  searchnavbar(event, page, data) {
    if (event.key === "Enter") {
    }
  }
  searchclickdefault(data) {}
  clicknavtab(data) {
    if (data === "personal") {
      $("#navtabpersonal").attr("href", "#personal");
    } else if (data === "address") {
      $("#navtabaddress").attr("href", "#address");
    } else if (data === "occupation") {
      $("#navtaboccupation").attr("href", "#occupation");
    } else if (data === "loan") {
      $("#navtabloan").attr("href", "#loan");
    } else if (data === "history") {
      $("#navtabhistory").attr("href", "#history");
    } else {
      $("#navtabemergency").attr("href", "#emergency");
    }
  }
  closemodaldialog(modal){ 
    switch(modal) {
      case 'reject':
        this.showmodalrejectloan = false
        break;
      case 'approve': 
        this.showmodalapproveloan = false
        break;
        case 'view': 
        this.showmodalviewloan = false;
        break;
    }  
  }
}
