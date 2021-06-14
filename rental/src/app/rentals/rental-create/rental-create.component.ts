import { Component, OnInit} from "@angular/core";
import { FormBuilder, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { RentalService } from "src/app/services/rental/rental.service";

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent implements OnInit{
  rentals: any;
  errorMsg : any;

  rentalData = {
    receive_date:"",
    receive_hours:"",
    return_date:"",
    return_hours:"",
    rate_type:"",
    equipment:[{
        category:"",
        make:"",
        model:"",
        serial_number:"",
        rate_per_day:"",
        rate_per_week:"",
        rate_per_month:""
    }],
    "vendor":{
        sales_person:"",
        address:"",
        contact:""
    },
    "invoice":{
        invoice_date:"",
        amount:""
    }
  };

  constructor(public rentalService: RentalService,private router: Router,
    private fb: FormBuilder){
  }

  ngOnInit(){
  }

  onAddRental(addRentalForm: NgForm){
    if( addRentalForm.invalid){
      return;
    }
    this.rentalData.receive_date = addRentalForm.value.receive_date
    this.rentalData.receive_hours = addRentalForm.value.receive_hours
    this.rentalData.return_date = addRentalForm.value.return_date
    this.rentalData.return_hours = addRentalForm.value.return_hours
    this.rentalData.rate_type = addRentalForm.value.rate_type

    this.rentalData.equipment[0].category = addRentalForm.value.category
    this.rentalData.equipment[0].make = addRentalForm.value.make
    this.rentalData.equipment[0].model = addRentalForm.value.model
    this.rentalData.equipment[0].rate_per_day = addRentalForm.value.rate_per_day
    this.rentalData.equipment[0].rate_per_month = addRentalForm.value.rate_per_month
    this.rentalData.equipment[0].rate_per_week = addRentalForm.value.rate_per_week
    this.rentalData.equipment[0].serial_number = addRentalForm.value.serial_number

    this.rentalData.invoice.amount = addRentalForm.value.amount
    this.rentalData.invoice.invoice_date = addRentalForm.value.invoice_date

    this.rentalData.vendor.address = addRentalForm.value.address
    this.rentalData.vendor.contact = addRentalForm.value.contact
    this.rentalData.vendor.sales_person = addRentalForm.value.sales_person

    this.rentalService.addRental(this.rentalData).subscribe(
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
