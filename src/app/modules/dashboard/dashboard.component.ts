import { Component, OnInit } from '@angular/core';
// declare var $: any;
import { LoaderService } from "../../core/services/loader.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private loader: LoaderService) { }

  ngOnInit() {
    this.loadScripts();
    // $('#menuToggle').on('click', function (event) {
    //   var windowWidth = $(window).width();
    //   if (windowWidth < 1010) {
    //     $('body').removeClass('open');
    //     if (windowWidth < 760) {
    //       $('#left-panel').slideToggle();
    //     } else {
    //       $('#left-panel').toggleClass('open-menu');
    //     }
    //   } else {
    //     $('body').toggleClass('open');
    //     $('#left-panel').removeClass('open-menu');
    //   }
    // });
    // $(".menu-item-has-children.dropdown").each(function () {
    //   $(this).on('click', function () {
    //     var $temp_text = $(this).children('.dropdown-toggle').html();
    //     $(this).children('.sub-menu').prepend('<li class="subtitle">' + $temp_text + '</li>');
    //   });
    // });
    // $(window).on("load resize", function (event) {
    //   var windowWidth = $(window).width();
    //   if (windowWidth < 1010) {
    //     $('body').addClass('small-device');
    //   } else {
    //     $('body').removeClass('small-device');
    //   }

    // });
  }
  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.loader.load('app.js').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }

}
