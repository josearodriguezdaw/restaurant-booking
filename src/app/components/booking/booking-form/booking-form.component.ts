import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../../../services/booking.service';
import { Booking, BookingStatus } from '../../../models/booking.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent {

  bookingForm:FormGroup;

  constructor(formBuilder:FormBuilder, private bookingService:BookingService, private router:Router){
    this.bookingForm = formBuilder.group({
      'id': ['', []],
      'client': ['', [Validators.required,Validators.minLength(0),Validators.maxLength(50)]],
      'phone': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'persons': ['', [Validators.min(1),Validators.max(50)]],
      'notes': ['', [Validators.maxLength(240)]],
      'date': ['', [Validators.required]],
    });
  }

  saveChanges(){
    if (this.bookingForm.valid){
      let id = this.bookingForm.get("id")?.value;
      let client = this.bookingForm.get("client")?.value;
      let phone = this.bookingForm.get("phone")?.value;
      let email = this.bookingForm.get("email")?.value;
      let persons = this.bookingForm.get("persons")?.value;
      let notes = this.bookingForm.get("notes")?.value;
      let date = this.bookingForm.get("date")?.value;
      let idNumber = Number.parseFloat(id);
      
      let booking = new Booking(idNumber,client,phone,email,Number.parseFloat(persons),notes,new Date(date),new Date(), BookingStatus.PENDING);
      this.bookingService.saveBooking(booking);
      this.router.navigate(["/bookings"]);
    }
  }
}
