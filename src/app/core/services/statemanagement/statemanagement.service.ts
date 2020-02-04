import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatemanagementService {
  private _statealerts:any;
  constructor() { }

  set valuestatealerts(val:any){
    this._statealerts = val;
  }
  get valuestatealerts(): any{
      return this._statealerts;
  }
}
