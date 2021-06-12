import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private _url: string = "http://localhost:3000/api/users/";

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<UserService[]> {
    return this.http.get<UserService[]>(this._url)
      .pipe(catchError(this.errorHandler));
  }

  getUserById(id: string): Observable<User[]>{
    return this.http.get<User[]>(this._url + '/' + id)
    .pipe(catchError(this.errorHandler));
  }

  registerUser(user: any): Observable<User[]> {
    return this.http.post<User[]>(this._url + '/register/', user)
    .pipe(catchError(this.errorHandler));
  }

  editUser(id: string, user: any): Observable<User[]> {
    console.log(user);
    console.log(this._url + '/' + id);
    return this.http.put<User[]>(this._url + '/edit/' + id, user)
    .pipe(catchError(this.errorHandler));
  }

  deleteEmployee(id: string) {
    return this.http.delete(this._url + '/' + id)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }
}
