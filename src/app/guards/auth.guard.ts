import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable, switchMap } from 'rxjs';

inject
export const authGuard: CanActivateFn = (route, state):Observable<boolean> => {
  const router = inject(Router)
  const authService = inject(AuthService)
  
  const requiredRole = route.data['role']; // Rol requerido para acceder a la ruta


  return authService.getUserDataAuth().pipe(
    map(({user,person})=>{
      if(user){
        if(person && person.role){
          if(person.role == requiredRole || requiredRole == "*"){
            return true;
          }else{
            router.navigate(['/dashboard/profile']);
            return false;
          }
  
        }else{
          router.navigate(['/home']);
          return false;
        }
      }else{
        router.navigate(['/login']);
        return false
      }
    }));
};
