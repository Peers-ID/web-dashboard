import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { HttpClient} from '@angular/common/http';
import { ApiService } from '@app/core/api.service';
import { TokenService } from '@app/core/token.service';
import {map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(
    private api: ApiService,
    private tokenSvc: TokenService,
    private http: HttpClient
  ) {}

  multiplePost(list: Array<{ url: string, data: any }>): Observable<any> {
    const observables: Array<Observable<any>> = [];
    list.forEach(eachRequestObject => {
      observables.push(this.api.postData(eachRequestObject.url, JSON.stringify(eachRequestObject.data)));
    });
    return forkJoin(observables);
  }

  hasErrorMultipleResponse(responses: Array<any>): boolean {
    let response = true;
    for (const res of responses) {
      if (res.status !== 'success') {
        response = false;
        break;
      }
    }
    return response;
  }

  refreshToken(): void {
    const url = 'refresh';
    this.api.getData(url).subscribe(
      res => {
        if (res.token) this.tokenSvc.setToken(res.token);
      },
    );
  }
  getcorelocation(): Observable<any> {
    return this.http.get('assets/indonesia-region.min.json').pipe(map(res => res));
  }  
  postLogin(data: any): Observable<any> {
    const url = 'login';
    const body = JSON.stringify(data);
    return this.api.postData(url, body);
  }
  postChangepassword(data: any): Observable<any> {
    const url = 'users/change_password';
    const body = JSON.stringify(data);
    return this.api.postData(url, body);
  }
  getParameter(): Observable<any> {
    const url = 'parameter';
    return this.api.getData(url);
  }
  getlistMember(): Observable<any> {
    const url = 'member';
    return this.api.getData(url);
  }
  postParameter(data: any): Observable<any> {
    const url = 'parameter';
    const body = JSON.stringify(data);
    return this.api.postData(url, body);
  }
  postKoperasi(data: any): Observable<any> {
    const url = 'koperasi';
    return this.api.postformData(url, data);
  }
  postProduct(data: any): Observable<any> {
    const url = 'product';
    const body = JSON.stringify(data);
    return this.api.postData(url, body);
  }
  updateProduct(data: any): Observable<any> {
    const url = 'product';
    const body = JSON.stringify(data);
    return this.api.updateData(url, body);
  }
  postakun(data: any): Observable<any> {
    const url = 'account';
    const body = JSON.stringify(data);
    return this.api.postData(url, body);
  }
  updatetakun(data: any): Observable<any> {
    const url = 'account';
    const body = JSON.stringify(data);
    return this.api.updateData(url, body);
  }
  postForgotPassword(data: any): Observable<any> {
    const url = 'forgot_password';
    const body = JSON.stringify(data);
    return this.api.postData(url, body);
  }
  updateloanstatus(data: any): Observable<any> {
    const url = 'loan/status';
    const body = JSON.stringify(data);
    return this.api.updateData(url, body);
  }
  postMemberconfig(data: any): Observable<any> {
    const url = 'member_config';
    const body = JSON.stringify(data);
    return this.api.postData(url, body);
  }

  updatestatusProduct(data: any): Observable<any> {
    const url = 'product/status';
    const body = JSON.stringify(data);
    return this.api.updateData(url, body);
  }
  updateKoperasibyid(data: any , id:any): Observable<any> {
    const url = `koperasi/${id}`;
    return this.api.updateformData(url,data);
  }
  updatestatusAkun(id: any,data:any): Observable<any> {
    const url = `account/${id}/status`;
    const body = JSON.stringify(data);
    return this.api.updateData(url, body);
  }
  getProduct(): Observable<any> {
    const url = 'product';
    return this.api.getData(url);
  }
  getGraph(): Observable<any> {
    const url = 'graph';
    return this.api.getData(url);
  }
  getsimpananTotal(id:any): Observable<any> {
    const url = `loan/simpanan/${id}/total`;
    return this.api.getData(url);
  }
  getsimpanantotalbyType(type:any,id:any,idloan:any): Observable<any> {
    const url = `loan/${type}/${id}/${idloan}/total`;
    return this.api.getData(url);
  }
  getsimpananDetail(type:any,id:any,idloan:any): Observable<any> {
    const url = `loan/${type}/${id}/${idloan}/detail`;
    return this.api.getData(url);
  }
  postPenarikanSimpanan(type: any,data:any): Observable<any> {
    const url = `loan/${type}/penarikan`;
    const body = JSON.stringify(data);
    return this.api.postData(url, body);
  }
  getRembug(){
    const url = 'rembug/view';
    return this.api.getData(url);
  }
  postRembug(data : any) : Observable<any>{
    const url = 'rembug/add';
    const body = JSON.stringify(data);
    return this.api.postData(url,body);
  }
  updateRembug(data : any) : Observable<any>{
    const url = 'rembug/edit';
    const body = JSON.stringify(data);
    return this.api.updateData(url,body);
  }
  getKelompok(id_rembuk : any){
    const url = `kelompok/view/${id_rembuk}`;
    return this.api.getData(url);
  }
  postKelompok(data : any) : Observable<any>{
    const url = 'kelompok/add';
    const body = JSON.stringify(data);
    return this.api.postData(url,body);
  }
  updateKelompok(data : any) : Observable<any>{
    const url = 'kelompok/edit';
    const body = JSON.stringify(data);
    return this.api.updateData(url,body);
  }
  getListKoperasi(): Observable<any> {
    const url = 'koperasi';
    return this.api.getData(url);
  }
  getListReportLampiran(data: any): Observable<any> {
    const url = 'report/lampiran';
    const body = JSON.stringify(data)
    return this.api.postData(url,body);
  }
  getLoanStatus(): Observable<any> {
    const url = 'master/loan/status';
    return this.api.getData(url);
  }
  getLoadnPending(): Observable<any> {
    const url = "loan/pending";
    return this.api.getData(url);
  }
  getLoadbyId(id:any): Observable<any> {
    const url = `loan/member/${id}`;
    return this.api.getData(url);
  }
  getcollectionId(id:any): Observable<any> {
    const url = `loan/collection/${id}`;
    return this.api.getData(url);
  }
  getDetailLoadbyId(id:any): Observable<any> {
    const url = `loan/detail/${id}`;
    return this.api.getData(url);
  }
  getMemberbyid(id:any): Observable<any> {
    const url = `member/${id}`;
    return this.api.getData(url);
  }
  getAccount(): Observable<any> {
    const url = 'account';
    return this.api.getData(url);
  }
  getAccountbyid(id:any): Observable<any> {
    const url = `account/${id}`;
    return this.api.getData(url);
  }
  getmemberConfig(data:any):Observable<any>{
    const url = `member_config/${data}`;
    return this.api.getData(url);
  }
  getProductbyId(data:any): Observable<any> {
    const url = `product/${data}`;
    return this.api.getData(url);
  }
  getKoperasibyId(id:any): Observable<any> {
    const url = `koperasi/${id}`;
    return this.api.getData(url);
  }
  getparametersebagian(): Observable<any> {
    const url = 'master/cicilan_sebagian';
    return this.api.getData(url);
  }
  getparameterpelunasan(): Observable<any> {
    const url = 'master/dasar_pelunasan';
    return this.api.getData(url);
  }
  getparameterdenda(): Observable<any> {
    const url = 'master/dasar_denda';
    return this.api.getData(url);
  }
  getparametersimpanan(): Observable<any> {
    const url = 'master/dasar_simpanan';
    return this.api.getData(url);
  }
}
