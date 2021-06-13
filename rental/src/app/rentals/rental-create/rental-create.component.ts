import { Component, OnInit} from "@angular/core";
import { FormBuilder, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { RentalService } from "src/app/services/rental/rental.service";
import { Rental } from "../../models/rental.model";

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent implements OnInit{
  rentals: any;
  errorMsg : any;

  constructor(public rentalService: RentalService,private router: Router,
    private fb: FormBuilder){
  }

  ngOnInit(){
  }

  onAddRental(addRentalForm: NgForm){
    if( addRentalForm.invalid){
      return;
    }
    console.log(addRentalForm);
    this.rentalService.addRental(addRentalForm.value).subscribe(
      (data) => this.rentals = data,
      (error) => this.errorMsg = error
    );
    this.rentalService.getRentals().subscribe(
      (data) => this.rentals = data,
      (error) => this.errorMsg = error
    )
    // addRentalForm.resetForm();
    this.router.navigate(['/rental']);
  }
}
