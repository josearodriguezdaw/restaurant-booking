import { Injectable } from '@angular/core';
import { Booking, BookingStatus } from '../models/booking.model';
import { filter, Observable } from 'rxjs';
import { Database, DataSnapshot, get, listVal, objectVal, push, ref, remove, set } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private database: Database) {}

   /**
    * Devuelve todas las reservas existentes.
    * @returns listado de reservas
    */
  getAllBookings(){
    const bookingRef = ref(this.database,"/bookings");
    return listVal(bookingRef) as Observable<Booking[]>
  }

   /**
    * Borra una reserva existente.
    * @param bookingId identificador de la reserva a borrar.
    */
  remove(bookingId:number){
    const bookingRef = ref(this.database,`/bookings/${bookingId}`);

    return remove(bookingRef) as Promise<void>
  }

/**
 * Busca una reserva por su identificador
 * @param id identificador búsqueda
 * @returns una reserva o null si no existe
 */
   getById(id:number):Promise<DataSnapshot>{
    const bookingRef = ref(this.database,`/bookings/${id}`);

    return get(bookingRef) as Promise<DataSnapshot>
   }


   /**
    * Crea una nueva reserva o edita una reserva existente.
    * @param booking reserva a guardar o editar
    */
   saveBooking(booking:Booking){

    let bookingRef = ref(this.database,`/bookings/${booking.id}`);

    //Si el id de la reserva es 0 significa que es una nueva reserva, por lo que le asignamos un id aleatorio.
    if (booking.id == 0){
        //Crear nueva reserva
        let idRandom = push(bookingRef);

        //Modificamos el id, que es 0, a un id random
        bookingRef = idRandom;
    }
    
    return set(bookingRef,booking) as Promise<void>
   }
   getDateForm(date:Date):string{
    let day = date.getDate().toString().padStart(2, '0');;
    let month = (date.getMonth()+1).toString().padStart(2, '0');;
    let year = date.getFullYear();
    let hour = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');;

    return `${year}-${month}-${day}T${hour}:${minutes}`
}
}
