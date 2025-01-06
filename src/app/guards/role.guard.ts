import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/person.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    
    const requiredRole = route.data['role']; // Rol requerido para acceder a la ruta

  
    /***
     * En el siguiente guard se implementa el código para necesario para controlar
     * los roles del usuario autenticado, si es que lo está.
     * 
     * Este guard devolverá un Observable<boolean> que será usado desde el archivo
     * app.routes.ts y permitirá o denegará el acceso a la ruta dónde se use el guard
     * según el valor devuelto por el observable.
     * */

    return this.authService.getUserDataAuth().pipe(
      map(({user,person})=>{
        // Si el objeto user es diferente a nulo significa que el usuario está autenticado
        if(user){
          if (person && person.roles  && person.roles.includes(requiredRole)) {
            return true; // Permitir acceso si el rol coincide
          } else {
            this.router.navigate(['/home']); // Redirigir si el rol no coincide
            return false;
          }
        }else{
          this.router.navigate(['/login']); // Redirigir en caso de error
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']); // Redirigir en caso de error
        return of(false);
      })
    );


  }
}
