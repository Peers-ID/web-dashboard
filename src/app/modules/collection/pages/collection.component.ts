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
  searchall:any;
  searchbyfield:any;
  constructor(
    private state: StatemanagementService,
    private apiservice: ApiService
  ) { }
  ngOnInit() {
    this.searchall = '';
    this.searchbyfield = '';
    if (window.location.pathname.split('/')[1] !== 'peers'){
      this.titlepage = window.location.pathname.split('/')[1];
    }else{
      this.titlepage = window.location.pathname.split('/')[2];
    }    
      this.loadData(this.pagecurrentvalue , 'createdAt' , 'desc',this.searchall, this.searchbyfield)

  }
  pageclick(event) {
    this.pagecurrentvalue = event;
    this.loadData(this.pagecurrentvalue, "createdAt", "desc",this.searchall,this.searchbyfield);
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
    this.loadData(this.pagecurrentvalue,page,sort,this.searchall,this.searchbyfield)
  }
  loadData(pagepagination,pagenavbar,order,keywords,field){
    let gettoday = new Date().toLocaleDateString();
    this.datatoday = gettoday;
    this.apiservice.gettablecollection(pagepagination,pagenavbar,order,keywords,field).subscribe(data => {
        this.totalpage = data.message.total
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
    this.searchall = data;
    this.searchbyfield = '';
    const field = ['ao_name','member_name','createdAt','cicilan_jumlah','cicilan_ke','pokok','sukarela']    
    field.forEach(element => {
      if(data !== element){
         $('#'+element).val(''); 
      }
    })
    this.loadData(this.pagecurrentvalue, "createdAt", "desc", this.searchall,this.searchbyfield);
  }
  searchfield(event,data,value){
    const field = ['searchdefault','ao_name','member_name','createdAt','cicilan_jumlah','cicilan_ke','pokok','sukarela']    
    this.searchall = '';
    if (event.key === "Enter" && value !== '') {
      let obj = {
        name:data,
        value:value
      }
      field.forEach(element => {
        if(data !== element){
           $('#'+element).val(''); 
        }
      })
      this.searchbyfield = obj;
      this.loadData(this.pagecurrentvalue, "createdAt", "desc",this.searchall,this.searchbyfield);
    }else if (event.key === "Enter" && value === ''){
      this.searchall = '';
      this.searchbyfield = ''
      this.loadData(this.pagecurrentvalue , 'createdAt' , 'desc',this.searchall,this.searchbyfield)
    }
  }
}
