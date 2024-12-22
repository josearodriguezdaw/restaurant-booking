import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { 

  }
  register(data:{email:string,password:string}){
    return createUserWithEmailAndPassword(this.auth, data.email,data.password)
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

  /**
   * Obtiene el UID del usuario autenticado.
   * @returns Promesa que resuelve con el UID o `null` si no hay usuario autenticado.
   */
  getUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user: User | null) => {
        if (user) {
          resolve(user); // UID del usuario autenticado
        } else {
          resolve(null); // No hay usuario autenticado
        }
      }, reject);
    });
  }


}
