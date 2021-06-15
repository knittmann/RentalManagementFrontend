import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.css']
})
export class RentalUpdateComponent implements OnInit {

  rentalId: any;
  rental: any;
  errorMsg: any;
  rentals: any;

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

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.rentalId = id;
    });
    this.rental = this.rentalService.getRentalById(this.rentalId).subscribe(
      (data) => {this.rental = data; console.log(data);
        this.updateRentalForm = this.fb.group({
          receive_hours: [this.rental.receive_hours, [Validators.required, Validators.minLength(3)]],
          receive_date: [this.rental.receive_date, [Validators.required, Validators.minLength(3)]],
          return_hours: [this.rental.receive_hours, [Validators.required, Validators.minLength(3)]],
          return_date: [this.rental.receive_date, [Validators.required, Validators.minLength(3)]],
          rate_type: [this.rental.rate_type, [Validators.required, Validators.minLength(2)]],
          category: [this.rental.equipment[0].category, [Validators.required, Validators.minLength(2)]],
          make: [this.rental.equipment[0].make, [Validators.required, Validators.minLength(2)]],
          model: [this.rental.equipment[0].model, [Validators.required, Validators.minLength(2)]],
          sales_person: [this.rental.vendor.sales_person, [Validators.required, Validators.minLength(2)]],
          amount: [this.rental.invoice.amount, [Validators.required, Validators.pattern('^[0-9]+$')]]
        });
      },
      (error) => {this.errorMsg = error; console.log(error); }
    );
  }

  constructor(private actRoute: ActivatedRoute, private rentalService: RentalService,
    private router: Router, private fb: FormBuilder) { }

    public updateRentalForm = this.fb.group({
      receive_hours: ['', [Validators.required, Validators.minLength(3)]],
      receive_date: ['', [Validators.required, Validators.minLength(2)]],
      return_hours: ['', [Validators.required, Validators.minLength(3)]],
      return_date: ['', [Validators.required, Validators.minLength(2)]],
      rate_type: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', [Validators.required, Validators.minLength(2)]],
      make: ['', [Validators.required, Validators.minLength(2)]],
      model: ['', [Validators.required, Validators.minLength(2)]],
      sales_person: ['', [Validators.required, Validators.minLength(2)]],
      amount: [0, [Validators.required, Validators.pattern('^[0-9]+$')]]
    });

  update(rantelId: any, rental: any){
    this.rentalData.receive_date = this.updateRentalForm.value.receive_date;
    this.rentalData.receive_hours = this.updateRentalForm.value.receive_hours;
    this.rentalData.return_date = this.updateRentalForm.value.return_hours;
    this.rentalData.return_hours = this.updateRentalForm.value.receive_hours;
    this.rentalData.rate_type = this.updateRentalForm.value.rate_type;

    this.rentalData.equipment[0].category = this.updateRentalForm.value.category;
    this.rentalData.equipment[0].make = this.updateRentalForm.value.make;
    this.rentalData.equipment[0].model = this.updateRentalForm.value.model;
    this.rentalData.equipment[0].rate_per_day = this.rental.equipment[0].rate_per_day;
    this.rentalData.equipment[0].rate_per_month = this.rental.equipment[0].rate_per_month;
    this.rentalData.equipment[0].rate_per_week = this.rental.equipment[0].rate_per_week;
    this.rentalData.equipment[0].serial_number = this.rental.equipment[0].serial_number;

    this.rentalData.invoice.amount = this.updateRentalForm.value.amount;
    this.rentalData.invoice.invoice_date = this.rental.invoice.invoice_date;

    this.rentalData.vendor.address = this.rental.vendor.address;
    this.rentalData.vendor.contact = this.rental.vendor.contact;
    this.rentalData.vendor.sales_person = this.updateRentalForm.value.sales_person;

    this.rentalService.updateRental(this.rentalId, this.rentalData).subscribe(
      (data) => {this.rental = data; console.log(data); },
      (error) => {this.errorMsg = error; console.log(error); }
    );
    this.router.navigate(['/rental']);
  }

  onBack(){
    history.back();
  }
}
