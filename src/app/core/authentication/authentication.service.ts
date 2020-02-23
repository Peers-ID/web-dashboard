import { Injectable } from '@angular/core';
import { Observable , throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  headers = new HttpHeaders({ 
    'content-type': 'application/json'
  });
  options = { headers: this.headers };
  constructor(private http: HttpClient) { }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  login(username, password): Observable<any> {
    const url = 'http://dev-api.peers.id/api/v1/login';
    let body = { "email": username, "password": password }
    return this.http.post(url, JSON.stringify(body), this.options).pipe(map(res => res))
  }
}
