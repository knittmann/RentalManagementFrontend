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

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.rentalId = id;
    });
    this.rental = this.rentalService.getRentalById(this.rentalId).subscribe(
      (data) => {this.rental = data; console.log(data);
        this.updateRentalForm = this.fb.group({
          receive_hours: [this.rental.receive_hours, [Validators.required, Validators.minLength(3)]],
          receive_date: [this.rental.receive_date, [Validators.required, Validators.minLength(2)]],
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
      rate_type: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', [Validators.required, Validators.minLength(2)]],
      make: ['', [Validators.required, Validators.minLength(2)]],
      model: ['', [Validators.required, Validators.minLength(2)]],
      sales_person: ['', [Validators.required, Validators.minLength(2)]],
      amount: [0, [Validators.required, Validators.pattern('^[0-9]+$')]]
    });

  update(rantelId: any, updateRentalForm: any){
    this.rentalService.updateRental(this.rentalId, this.updateRentalForm.value).subscribe(
      (data) => {this.rental = data; console.log(data); },
      (error) => {this.errorMsg = error; console.log(error); }
    );
    this.router.navigate(['/rental']);
  }
}
