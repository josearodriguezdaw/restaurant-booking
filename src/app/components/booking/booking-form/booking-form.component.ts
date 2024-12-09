import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent {

  bookingForm:FormGroup;

  constructor(formBuilder:FormBuilder){
    this.bookingForm = formBuilder.group({
      'id': ['', []],
      'client': ['', []],
      'phone': ['', []],
      'email': ['', []],
      'persons': ['', []],
      'notes': ['', []],
      'date': ['', []],
    });
  }
}
