import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer,DOCUMENT } from '@angular/common';
import { snakeCase } from 'lodash';
import * as moment from 'moment';
@Injectable()
export class UtilService {
  constructor(
    private titleSvc: Title,
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  formatNumber(num: number): any {
    return num ? num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') : '-';
  }

  formatPercentage(num: number): any {
    if (num.toString().length === 4){
      return num ? num.toString().replace(/(\d)(?=(\d\d)+(?!\d))/g, '$1,') : '-';
    }else{
        if (num !== 100){
          return num ? num.toString().replace(/(\d)(?=(\d\d)+(?!\d))/g, '$1,') : '-';
        }else{
          return num;
        }
    }
    
  }

  formatnonNumber(num: number): string {
    if (num.toString().includes(',')){
      return num.toString().replace(/\,/g,'');
    }else{
      return num.toString().replace(/\./g,'');
    }
  }


  formatNumberZero(num: number): string {
    return num ? num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') : '0';
  }

  prettyPriceWithZero(price = 0): string {
    const value = price.toString().substring(0, 1) === '-' ? `- Rp ${this.formatNumberZero(Math.abs(price))}`
    : `Rp ${this.formatNumberZero(price)}`;
    return value;
  }

  prettyPrice(price = 0): string {
    return `Rp ${this.formatNumber(price)}`;
  }

  prettyPriceWithoutCurrency(price = 0): string {
    return `${this.formatNumber(price)}`;
  }

  
  setTitle(title: string): void {
    this.titleSvc.setTitle(title);
  }

  getTitle(): string {
    return this.titleSvc.getTitle();
  }


  isValidPhoneNumber(str: string): boolean {
    const validPhonePrefixes: any = {
      prefix: ['811', '812', '813', '814', '815', '816', '817', '818', '819', '821',
        '822', '823', '828', '831', '832', '833', '838', '851', '852', '853',
        '855', '856', '857', '858', '859', '877', '878', '881', '882', '883',
        '884', '885', '886', '887', '888', '889', '895', '896', '897', '898',
        '899']
    };
    let res = false;
    if (str.length > 0 && (str.match(/^08[0-9]+$/) || str.match(/^8[0-9]+$/))) res = true;

    return res;
  }

  formatPhoneNumber(data: string): string {
    if (data) {
      let res: string = data.toString();
      if (res.length >= 1 && res.substr(0, 1) === '0') res = res.substr(1);
      if (res.length >= 2 && res.substr(0, 2) === '62') res = res.substr(2);
      if (res.length >= 3 && res.substr(0, 3) !== '+62') res = `+62${res}`;
      return res;
    } else return '';
  }

  toSnakeCasedObject(data: any): any {
    const result = {};
    for (const i in data)
      if (i) {
        i.toString();
        result[snakeCase(i)] = data[i];
      }

    return result;
  }

  getFromDatepickerObject(outputFormat: string, datepickerObject: any, outputLocale = 'en'): string {
    const dateString = `${datepickerObject.year}-${datepickerObject.month}-${datepickerObject.day}`;
    return moment(dateString, 'YYYY-M-D').locale(outputLocale).format(outputFormat);
  }

  createDatepickerObject(input?: string): any {
    const date = input ? moment(input) : moment();
    const obj: any = {
      year: date.year(),
      month: date.month() + 1,
      day: date.date()
    };
    return obj;
  }

  formatDate(input: any, outputFormat: string = 'D MMMM YYYY'): string {
    if (input) {
      if (moment(input).isValid()) {
        return (moment(input).format(outputFormat));
      } else {
        return '';
      }
    } else return '';
  }

  nl2br(str): string {
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br/>' + '$2');
  }

  isInBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  isInServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  mask(text: string, prefixLength: number, suffixLength: number): string {
    let maskedValue = text;
    const overNumber = prefixLength + suffixLength;
    if (prefixLength === -1 && suffixLength === -1) maskedValue = text.replace(/\w/g, '*');
    else if (overNumber < text.length && overNumber !== 0) {
      if (suffixLength !== 0) {
        maskedValue = text.substring(0, prefixLength)
          + text.substring(prefixLength, text.length - suffixLength).replace(/\w/g, '*')
          + text.substring(text.length - suffixLength, text.length);
      } else {
        maskedValue = text.substring(0, prefixLength)
          + text.substring(prefixLength, text.length).replace(/\w/g, '*');
      }
    }
    return maskedValue;
  }

  trimEnd(text: string) {
    return text ? text.replace(/^\s+|\s+$/gm, '') : '';
  }

  trimAll(text: string) {
    return text ? text.replace(/\s/g, '') : '';
  }


}
