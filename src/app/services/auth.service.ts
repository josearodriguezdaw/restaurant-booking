import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { UserService } from './person.service';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth,private userService:UserService) { 

  }
  register(person:Person,password:string){

    return createUserWithEmailAndPassword(this.auth, person.email,password);
  }

  login(data:{email:string,password:string}){
    return signInWithEmailAndPassword(this.auth, data.email,data.password)
  }
  
  loginGoogle(){
    return signInWithPopup(this.auth,new GoogleAuthProvider());
  }

  logout(){
    return signOut(this.auth)
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable((observer) => {
      onAuthStateChanged(
        this.auth,
        (user) => {
          observer.next(!!user); // true si hay usuario, false si no
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }


  /*** 
   * Para trabajar de manera más eficiente con los observables en este ejemplo se está 
   * haciendo uso de la librería RXjs que nos permitirá gestionar de manera eficiente flujos
   * de datos. Concretamente, se están usando los siguientes métodos:
   * 
   *  - FROM ->  convierte algo (un array, una promesa, un conjunto de valores, etc.) en un observable.
   *  - PIPE -> es un encadenador de transformaciónes. Nos permitirá aplicar funciones de transformación
   *            a los valores emitidos por un observable. Es como si tuvieramos una cadena de operaciones.
   *            que se aplican una tras otra.
   *  - MAP -> transforma los valores que llegan de un observable. Recibe un valor, lo procesa y lo devuelve transformado.
   * 
   *  - SwitchMap -> es un operador más avanzado que Map. También transforma los valores, pero la diferencia es que si se
   *                 emiten nuevos valores antes de que termine la transformación anterior, cancela la transformación 
   *                 anterior y solo usa la nueva.
   */
 /**
  * Función que devuelve la información del usuario autenticado, así como los datos de su persona.
  * En caso de no existir o no estar autenticado devolverá null.
  * @returns 
  */
  getUserDataAuth(): Observable<{user:User|null,person:Person|null}>{
    return from(this.getUser()).pipe(
      switchMap((usuario)=>{
        if(usuario && usuario.uid){
          return this.userService.getUserById(usuario.uid).pipe(
            map((persona)=>{
              if(persona){
                return {user:usuario,person:persona}
              }else{
                return {user:null,person:null}
              }
            }),
            catchError(()=>{
              return of({user:null,person:null})
            })
          )
        }else{
          return of({user:null,person:null})
        }
      }),
      catchError(()=>{
        return of({user:null,person:null})
      })
    )
  }

  /**
   * Obtiene del usuario autenticado.
   * @returns Promesa que resuelve con el obetjo User o `null` si no hay usuario autenticado.
   */
  getUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user: User | null) => {
        if (user) {
          resolve(user); //usuario autenticado
        } else {
          resolve(null); // No hay usuario autenticado
        }
      }, reject);
    });
  }


}
