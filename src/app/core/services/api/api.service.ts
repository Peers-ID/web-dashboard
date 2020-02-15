import { Injectable } from '@angular/core';
import { Observable , throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new HttpHeaders({ 
    'content-type': 'application/json', 
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token
  });
  options = { headers: this.headers };
  constructor(private http: HttpClient,
    ) { }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  postdatakoperasi(a,b): Observable<any> {
    const url = 'http://dev-api.peers.id/public/login';
    let body = { "a": a, "b": b }
    return this.http.post(url, JSON.stringify(body), this.options).pipe(map(res => res))
  }
}
