import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private _url: string = "http://localhost:3000/api";
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  currentUserName: any = "User";
  currentUserNameChange: Subject<string> = new Subject<string>();
  currentUserRole: any;
  currentUserRoleChange: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient,
    private router: Router,
    private userService: UserService) {
  }

  login(user: User) {
    return this.httpClient.post<any>(`${this._url}/users/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        // this.localStorageService.setItem('role', res.role);
        // localStorage.setItem('name', res.name);
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          localStorage.setItem('name', res.name);
          localStorage.setItem('role', res.role);
          this.changeCurrentUser();
          console.log(this.currentUser);
          this.router.navigate(['home']);
        })
      })
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  changeCurrentUser() { 
    this.currentUserName = localStorage.getItem('name');
    this.currentUserNameChange.next(this.currentUserName);
    this.currentUserRole = localStorage.getItem('role');
    this.currentUserRoleChange.next(this.currentUserRole);
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  get isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return (role !== 'admin') ? false : true;
  }

  logout() {
    const removeToken = localStorage.removeItem('token');
    if (removeToken == null) {
      this.currentUserName = 'User';
      this.currentUserNameChange.next(this.currentUserName);
      this.currentUserRole = '';
      this.currentUserRoleChange.next(this.currentUserRole);
      localStorage.clear();
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
