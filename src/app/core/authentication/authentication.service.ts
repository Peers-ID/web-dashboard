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
    const url = environment.apiurl+'login';
    let body = { "email": username, "password": password }
    return this.http.post(url, JSON.stringify(body), this.options).pipe(map(res => res))
  }
}
