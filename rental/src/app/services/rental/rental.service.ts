import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Rental } from 'src/app/models/rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private _url: string = "http://localhost:3000/api/rental"
  private rentals: Rental[] = [];
  private rentalUpdated = new Subject<Rental[]>();

  constructor(private http: HttpClient){}

  getRentals(){
    return [...this.rentals];
  }

  getRentalUpdatedListener(){
    return this.rentalUpdated.asObservable();
  }

  addRental(title: string, content: string){
    const rental: Rental = {title: title, content: content};
    this.rentals.push(rental);
    this.rentalUpdated.next([...this.rentals]);
  }

  public deleteRental(id: any) {
    const result = window.confirm("Are you sure deleting id : "+id+" ? ");
    if(result){
      alert("Deleting id: "+id);
      return this.http.delete(this._url + '/' + id);
    }else{
      alert("Back to rental page")
      return this.http.get<Rental[]>(this._url)
      .pipe(catchError(this.errorhandler));
    }
  }
  errorhandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error")
  }
}
