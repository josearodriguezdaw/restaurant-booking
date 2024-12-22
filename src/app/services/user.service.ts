import { Injectable } from '@angular/core';
import { child, Database, DataSnapshot, get, object, objectVal, ref } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Employee } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private database: Database) {}

    /**
     * Busca una reserva por su identificador empleando el objeto child
     * @param id identificador búsqueda
     * @returns una reserva o null si no existe
     */
     getUserById(id:string):Observable<Employee>{
      const usersRef = ref(this.database,"users");
      const userRef = child(usersRef,id);
  
      return objectVal(userRef) as Observable<Employee>
     }
}
