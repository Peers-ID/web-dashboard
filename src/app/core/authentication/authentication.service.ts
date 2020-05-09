import { Injectable } from '@angular/core';
import { Observable , throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map} from "rxjs/operators";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  headers = new HttpHeaders({ 
    'content-type': 'application/json'
  });
  options = { headers: this.headers };
  constructor(private http: HttpClient) { }
  login(username, password): Observable<any> {
    const url = environment.apiurl+'login';
    let body = { "email": username, "password": password }
    return this.http.post(url, JSON.stringify(body), this.options).pipe(map(res => res))
  }
  forgotpassword(email): Observable<any> {
    let body = {
      "email": email,
    }
    const url = environment.apiurl+'forgot_password';
    return this.http.post(url, JSON.stringify(body), this.options).pipe(map(res => res))
  }
}
