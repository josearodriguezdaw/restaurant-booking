import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User, UserCredential } from '@angular/fire/auth';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { Person } from '../models/person.model';
import { PersonService } from './person.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private personService:PersonService) { 

  }
  register(data:{email:string,password:string}):Promise<UserCredential>{
    return createUserWithEmailAndPassword(this.auth, data.email,data.password)
  }

  login(data:{email:string,password:string}):Promise<UserCredential>{
    return signInWithEmailAndPassword(this.auth, data.email,data.password)
  }
  
  loginGoogle():Promise<UserCredential>{
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

  getUserAuthenticated(): Observable<User|null> {
    return new Observable((observer) => {
      onAuthStateChanged(
        this.auth,
        (user) => {
          observer.next(user);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

}
