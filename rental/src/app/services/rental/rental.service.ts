import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Rental } from 'src/app/models/rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private _url: string = "http://localhost:3000/api/rentals"
  private rentals: Rental[] = [];

  constructor(private http: HttpClient){}

  public getRentals(): Observable<RentalService[]> {
    return this.http.get<RentalService[]>(this._url)
      .pipe(catchError(this.errorHandler));
  }

  public getRentalById(id: string): Observable<Rental[]>{
    return this.http.get<Rental[]>(this._url + '/' + id)
    .pipe(catchError(this.errorHandler));
  }

  public addRental(rental: any): Observable<Rental[]> {
    console.log(rental);
    return this.http.post<Rental[]>(this._url + '/new', rental)
    .pipe(catchError(this.errorHandler));
  }

  public updateRental(id: string, rental: any): Observable<Rental[]> {
    console.log(rental);
    console.log(this._url + '/' + id);
    return this.http.put<Rental[]>(this._url  + '/' + id, rental)
    .pipe(catchError(this.errorHandler));
  }

  public deleteRental(id: any) {
    const result = window.confirm("Are you sure deleting id : "+id+" ? ");
    if(result){
      alert("Deleting id: "+id);
      return this.http.delete(this._url + '/' + id);
    }else{
      alert("Back to rental page")
      return this.http.get<Rental[]>(this._url)
      .pipe(catchError(this.errorHandler));
    }
  }
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error")
  }
}
