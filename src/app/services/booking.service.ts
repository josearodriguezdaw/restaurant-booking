import { Injectable } from '@angular/core';
import { Booking, BookingStatus } from '../models/booking.model';
import { filter, Observable } from 'rxjs';
import { child, Database, DataSnapshot, equalTo, get, listVal, objectVal, orderByChild, push, query, ref, remove, set } from '@angular/fire/database';

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
  remove(bookingId:string){
    const bookingRef = ref(this.database,`/bookings/${bookingId}`);

    return remove(bookingRef) as Promise<void>
  }

/**
 * Busca una reserva por su identificador
 * @param id identificador búsqueda
 * @returns una reserva o null si no existe
 */
   getById(id:string):Promise<DataSnapshot>{
    const bookingRef = ref(this.database,`/bookings/${id}`);

    return get(bookingRef) as Promise<DataSnapshot>
   }


   /**
    * Crea una nueva reserva o edita una reserva existente.
    * @param booking reserva a guardar o editar
    */
   saveBooking(booking:Booking){

    let bookingRef = ref(this.database,`/bookings/${booking.id}`);

    //Si el id de la reserva está vacío o es 0 significa que es una nueva reserva, por lo que le asignamos un id aleatorio.
    if (booking.id == ""){
        let newBookingRef = ref(this.database,`/bookings`);

        //Crear nueva reserva
        let idRandom = push(newBookingRef);

        //Modificamos el id, que es 0, a un id random
        bookingRef = idRandom;
        if(bookingRef.key !=null){
          booking.id = bookingRef.key;
        }
    }

    return set(bookingRef,booking) as Promise<void>
  
   }

   getConfirmBookings(){
    const bookingRef = ref(this.database,"/bookings");
    const torrentsQuery = query(bookingRef, orderByChild('status'), equalTo("Confirmada"));

    return listVal(torrentsQuery) as Observable<Booking[]>
}

  
}
