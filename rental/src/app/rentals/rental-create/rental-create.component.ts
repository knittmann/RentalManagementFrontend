import { Component, EventEmitter, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import { RentalService } from "src/app/services/rental/rental.service";
import { Rental } from "../../models/rental.model";

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent implements OnInit{
  enteredTitle = '';
  enteredContent = '';
  rentalCreated = new EventEmitter<Rental>();

  constructor(public rentalService: RentalService){
  }

  ngOnInit(){
  }

  onAddRental(form: NgForm){
    if( form.invalid){
      return;
    }
    const rental: Rental = {
      title: form.value.title,
      content: form.value.content
    };
    this.rentalService.addRental(form.value.title,form.value.content);
    form.resetForm();
  }
}
