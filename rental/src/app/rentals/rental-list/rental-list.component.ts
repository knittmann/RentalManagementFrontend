import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Rental } from '../../models/rental.model';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit, OnDestroy{
  // rentals = [
  //   {title: 'first', equipment : "This is the first "},
  //   {title: 'second', equipment : "This is the second "},
  //   {title: 'third', equipment : "This is the third "}
  // ];

  rentals:Rental[] = [];
  private rentalsSub: Subscription | undefined;
  router: any;
  errorMsg: any;

  constructor(public rentalService: RentalService){
  }

  ngOnInit(){
    this.rentals = this.rentalService.getRentals();
    this.rentalsSub = this.rentalService.getRentalUpdatedListener()
      .subscribe((rentals: Rental[])=>{
        this.rentals = rentals;
      });
  }

  ngOnDestroy(){
    this.rentalsSub?.unsubscribe();
  }

  updateRental(rental: any){
    this.router.navigate(['/rental-update', rental.id])
  }

  // deleteRental(rental: any){
  //   this.rentalService.deleteRental(rental.id).subscribe(() => {
  //     this.rentalService.getRentals();
  //   })
  // }
}
