import { Component, OnInit } from '@angular/core';
import { LoaderService } from "../../core/services/loader/loader.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private loader: LoaderService) { }

  ngOnInit() {
    this.loadScripts();
  }
  private loadScripts() {
    this.loader.load('app.js').then(data => {
    }).catch(error => console.log(error));
  }

}
