import { Component} from '@angular/core';

import { Rental } from '../../models/rental.model';
import { RentalService } from 'src/app/services/rental/rental.service';
import { ActivatedRoute, Router } from '@angular/router';


// const ELEMENT_DATA: Rental[] = [
//     {receive_date: "Hydrogen", receive_hours: 'Hydrogen', return_hours: "Hydrogen", return_date: "Hydrogen",rate_type:"Hydrogen",
//     equipment:[{category:"Hydrogen",make:"Hydrogen",model:"Hydrogen",rate_per_day:"Hydrogen",rate_per_month:"Hydrogen",rate_per_week:"Hydrogen",serial_number:"Hydrogen"}],
//     vendor:{sales_person:"Hydrogen",address:"Hydrogen",contact:"Hydrogen"},
//     invoice:{amount:"Hydrogen",invoice_date:"Hydrogen"}}
//   ];


@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent {

  public rentals:any;
  errorMsg: any;
  constructor(public rentalService: RentalService, private route: ActivatedRoute,
    private router: Router){
  }

  displayedColumns: string[] = ['_id','receive_date', 'receive_hours', 'return_hours', 'return_date','rate_type',
                  '_id','category','make','model','rate_per_day','rate_per_month','rate_per_week','serial_number',
                  'sales_person','address','contact',
                  'invoice_date','amount'];
  // dataSource = ELEMENT_DATA;



  ngOnInit(): void {
    this.rentalService.getRentals().subscribe(
      (data) => {this.rentals = data; console.log(data);}, //success
      (error) =>this.errorMsg = error, // error
      () => console.log("Completed")
    )
  }

  updateRental(rental: any){
    this.router.navigate(['/rental-update', rental._id])
  }

  deleteRental(rental: any){
    this.rentalService.deleteRental(rental._id).subscribe(() => {
      this.rentalService.getRentals().subscribe(
        (data) => this.rentals = data,
        (error) => this.errorMsg = error
      );
    })
  }
}
