import { Injectable } from '@angular/core';
import { child, Database, DataSnapshot, get, object, objectVal, push, ref, set } from '@angular/fire/database';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { user, User, UserCredential } from '@angular/fire/auth';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private database: Database) {}

    /**
     * Busca un usuario por su identificador empleando el objeto child
     * @param id identificador búsqueda
     * @returns una reserva o null si no existe
     */
     getUserById(id:string):Observable<Person>{
      const usersRef = ref(this.database,"users");
      const userRef = child(usersRef,id);
  
      return objectVal(userRef) as Observable<Person>
     }

         /**
     * Busca un usuario por su identificador empleando el objeto child
     * @param id identificador búsqueda
     * @returns una reserva o null si no existe
     */
     getUserByIdDataSnapshot(uid:string):Promise<DataSnapshot>{
      const usersRef = ref(this.database,"users");
      const userRef = child(usersRef,uid);
  
      return get(userRef) as Promise<DataSnapshot>
     }

     /**
     * Guarda o edita los datos de un nuevo usuario registrado.
     * @param employee reserva a guardar o editar
     */
    saveUser(employee:Person){
  
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
    

  /**
   * Crea un usuario si no existe cuando se realiza el login usando una cuenta de google
   * @param userCredentials 
   * @returns 
   */
  createIfNotExist(userCredentials:UserCredential): Promise<void>{
    return this.getUserByIdDataSnapshot(userCredentials.user.uid).then((data: DataSnapshot) => {
      if (!data.exists()) {
        // Si el usuario no existe, lo creamos
        const user = userCredentials.user;
        const email = user.email != null ? user.email : '';
        const displayName = user.displayName != null ? user.displayName : '';
  
        // Creamos un nuevo objeto Employee
        const newUser = new Person(user.uid, email, displayName, '', ['user'], new Date().toLocaleDateString());
  
        // Devolvemos la promesa devuelta por saveUser
        return this.saveUser(newUser);
      }
      // Si el usuario ya existe, devolvemos una promesa resuelta
      return Promise.resolve(); // Si ya existe, no es necesario hacer nada, simplemente resolvemos
    }).catch((error) => {
      // Si ocurre un error en cualquier parte, lo registramos y lo propagamos
      console.error('Error en createIfNotExist:', error);
      return Promise.reject(error); // Propaga el error
    });
  }
}
 