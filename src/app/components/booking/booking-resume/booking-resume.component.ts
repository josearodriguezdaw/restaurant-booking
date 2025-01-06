import { Component, Input } from '@angular/core';
import { Booking, BookingStatus } from '../../../models/booking.model';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/booking.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking-resume',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './booking-resume.component.html',
  styleUrl: './booking-resume.component.css'
})
export class BookingResumeComponent {
  @Input()
  bookingInput:Booking | null = null;
  errors:string|null = null;

  constructor(private bookingService:BookingService){}

  removeBooking(bookingId:string):void{
    this.errors=null;
    this.bookingService.remove(bookingId).catch(()=>{
      this.errors="Se ha producido un error al borrar la reserva."
    });
  }
}
