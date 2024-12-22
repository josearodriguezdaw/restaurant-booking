import { Injectable } from '@angular/core';
import { child, Database, DataSnapshot, get, object, objectVal, push, ref, set } from '@angular/fire/database';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
import { Employee } from '../models/user.model';
import { AuthService } from './auth.service';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private database: Database, private authService:AuthService) {}

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

     /**
     * Guarda o edita los datos de un nuevo empleado registrado.
     * @param employee reserva a guardar o editar
     */
    saveUser(employee:Employee){
  
      let employeeRef = ref(this.database,`/users/${employee.uid}`);
  
      //Si el id de la reserva está vacío o es 00 significa que es una nueva reserva, por lo que le asignamos un id aleatorio.
      if (employee.uid == ""){
          let newEmployeeRef = ref(this.database,`/users`);
  
          //Crear nueva reserva
          let idRandom = push(newEmployeeRef);
  
          //Modificamos el id, que es 0, a un id random
          employeeRef = idRandom;
          if(employeeRef.key !=null){
          employee.uid = employeeRef.key;
          }
      }
  
      return set(employeeRef,employee) as Promise<void>
    
    }
    getUserAuth(): Observable<Employee|null>{
          return from(this.authService.getUser()).pipe(
            switchMap((user) => {
              if (user && user.uid) {
                // Si el usuario está autenticado, obtenemos su rol
                return this.getUserById(user.uid).pipe(
                  map((employee)=>{return employee}),
                  catchError(()=>{return [null]})
                );
              } else {
                return [null];
              }
            }),
            catchError(() => {
              return [null];
            })
          );
    }
}
