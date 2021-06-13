import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private _url: string = "http://localhost:3000/api";
  headers = new HttpHeaders().set('Content-Type', 'string');
  currentUser = {};

  constructor(private httpClient: HttpClient,
    private router: Router,
    private userService: UserService) {
  }

  login(user: User) {
    return this.httpClient.post<any>(`${this._url}/users/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          console.log(this.currentUser);
          this.router.navigate(['rental/']);
        })
      })
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    if (localStorage.removeItem('access_token') == null) {
      this.router.navigate(['users/login']);
    }
  }

  getUserProfile(id: string): Observable<any> {
    return this.httpClient.get(`${this._url}/users/${id}`, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
