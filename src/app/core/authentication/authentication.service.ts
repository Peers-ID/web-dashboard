import { Injectable } from '@angular/core';
import { Observable , throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

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
    const headers = new HttpHeaders({ 'content-type': 'application/json', });
    const options = { headers: headers };
    const url = 'http://dev-api.peers.id/public/login';
    let body = { "email": username, "password": password }
    return this.http.post(url, JSON.stringify(body), options).pipe(map(res => res))
  }
}
