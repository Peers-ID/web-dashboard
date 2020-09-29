import { Component, OnInit } from '@angular/core';
import { LoaderService } from "@app/core/loader.service";
@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {

  constructor(private loader: LoaderService) { }

  ngOnInit() {
    this.loadScripts();
  }
  private loadScripts() {
    this.loader.load('app.js').then(data => {
    }).catch(error => console.log(error));
  }
}
