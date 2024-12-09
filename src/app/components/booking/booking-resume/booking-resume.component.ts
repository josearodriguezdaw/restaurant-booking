import { Component, Input } from '@angular/core';
import { Booking, BookingStatus } from '../../../models/booking.model';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-booking-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-resume.component.html',
  styleUrl: './booking-resume.component.css'
})
export class BookingResumeComponent {
  @Input()
  bookingInput:Booking | null = null;

  constructor(private bookingService:BookingService){}

  removeBooking(bookingId:number):void{
    this.bookingService.remove(bookingId);
  }
}
