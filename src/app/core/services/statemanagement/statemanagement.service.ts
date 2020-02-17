import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StatemanagementService {
  private _statealerts: any;
  private _statevaluemodal: any;
  constructor() {}

  set valuestatealerts(val: any) {
    this._statealerts = val;
  }
  get valuestatealerts(): any {
    return this._statealerts;
  }
  set valuestatusmodal(val: any) {
    this._statevaluemodal = val;
  }
  get valuestatusmodal(): any {
    return this._statevaluemodal;
  }
}
