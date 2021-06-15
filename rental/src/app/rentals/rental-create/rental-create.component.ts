import { Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
  addRentalForm!: FormGroup;


  rates: string []= [
    "Per Day",
    "Per Week",
    "Per Month"
  ];

  categories:string[] = [
    "Excavators",
    "Backhoe Loaders",
    "Bulldozers",
    "Skid-Steer Loaders",
    "Motor Graders",
    "Crawler Loaders",
    "Trenchers",
    "Scrapers",
    "Common Dump Trucks",
  ];

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
    this.addRentalForm = this.fb.group({
      // Rental
      receive_date: ['', Validators.required],
      receive_hours: ['', Validators.required],
      return_date: ['', Validators.required],
      return_hours: ['', Validators.required],
      rate_type: ['', Validators.required],
      // equipment
      category: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      serial_number: ['', Validators.required],
      rate_per_day: ['', Validators.required],
      rate_per_week: ['', Validators.required],
      rate_per_month: ['', Validators.required],
      //vendor
      sales_person: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      //invoice
      invoice_date: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }



  onAddRental(){
    if(this.addRentalForm.invalid){
      return;
    }

    this.rentalData.receive_date = this.addRentalForm.value.receive_date
    this.rentalData.receive_hours = this.addRentalForm.value.receive_hours
    this.rentalData.return_date = this.addRentalForm.value.return_date
    this.rentalData.return_hours = this.addRentalForm.value.return_hours
    this.rentalData.rate_type = this.addRentalForm.value.rate_type

    this.rentalData.equipment[0].category = this.addRentalForm.value.category
    this.rentalData.equipment[0].make = this.addRentalForm.value.make
    this.rentalData.equipment[0].model = this.addRentalForm.value.model
    this.rentalData.equipment[0].rate_per_day = this.addRentalForm.value.rate_per_day
    this.rentalData.equipment[0].rate_per_month = this.addRentalForm.value.rate_per_month
    this.rentalData.equipment[0].rate_per_week = this.addRentalForm.value.rate_per_week
    this.rentalData.equipment[0].serial_number = this.addRentalForm.value.serial_number

    this.rentalData.invoice.amount = this.addRentalForm.value.amount
    this.rentalData.invoice.invoice_date = this.addRentalForm.value.invoice_date

    this.rentalData.vendor.address = this.addRentalForm.value.address
    this.rentalData.vendor.contact = this.addRentalForm.value.contact
    this.rentalData.vendor.sales_person = this.addRentalForm.value.sales_person

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
