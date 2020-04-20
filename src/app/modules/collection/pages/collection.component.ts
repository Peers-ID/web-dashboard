import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { StatemanagementService } from "../../../core/services/statemanagement/statemanagement.service";
import { ApiService } from "../../../core/services/api/api.service";
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  titlepage: string;
  datacollection = [];
  p: number = 1;
  isASC:boolean = false;
  pagecurrentvalue:number = 1;
  loadingshow : boolean = false;
  totalpage:number;
  datatoday:any;
  constructor(
    private state: StatemanagementService,
    private apiservice: ApiService
  ) { }
  ngOnInit() {
  
    if (window.location.pathname.split('/')[1] !== 'peers'){
      this.titlepage = window.location.pathname.split('/')[1];
    }else{
      this.titlepage = window.location.pathname.split('/')[2];
    }    
      this.loadData(this.pagecurrentvalue , 'createdAt' , 'desc')

  }
  pageclick(event) {
    this.pagecurrentvalue = event;
    this.loadData(this.pagecurrentvalue, "createdAt", "desc");
  }
  viewclick() {
    
  }
  approveclick() {
    
  }
  rejectclick() {
    
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
    let gettoday = new Date().toDateString()
    this.datatoday = gettoday;
    this.apiservice.gettablecollection(pagepagination,pagenavbar,order).subscribe(data => {
        // this.totalpage = data.message.total
        let datanumber = ((pagepagination - 1) * data.data.length) + 1
        this.datacollection = [];
        data['data'].forEach(element => {
          element['number'] = datanumber++;
          this.datacollection.push(element)   
        });
    })
  }
  searchnavbar(event,page , data){
    if (event.key === "Enter") {
    }
  }
  searchclickdefault(data){
    
  }
}
