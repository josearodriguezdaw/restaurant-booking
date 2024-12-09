import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
      'client': ['', [Validators.required,Validators.minLength(0),Validators.maxLength(50)]],
      'phone': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'persons': ['', [Validators.min(1),Validators.max(50)]],
      'notes': ['', [Validators.maxLength(240)]],
      'date': ['', [Validators.required]],
    });
  }
}
