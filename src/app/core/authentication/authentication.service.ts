import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  
  login(username, password): Observable<any> {
    const headers = new HttpHeaders({ 'content-type': 'application/json', });
    const options = { headers: headers };
    const url = 'http://dev-api.peers.id/public/login';
    let body = { "email": username, "password": password }
    return this.http.post(url, JSON.stringify(body), options).pipe(map(res => res));
    // return this.http.post('http://dev-api.peers.id/public/login', query);
  }
}
