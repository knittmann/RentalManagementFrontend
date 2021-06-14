import { Component} from '@angular/core';
import { RentalService } from 'src/app/services/rental/rental.service';
import { ActivatedRoute, Router } from '@angular/router';

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
