import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '@angular/fire/auth';
import { Employee } from '../models/user.model';

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
     * 
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


    return from(this.authService.getUser()).pipe(
      switchMap((user) => {
        if (user && user.uid) {
          // Si el usuario está autenticado, obtenemos su rol
          return this.userService.getUserById(user.uid).pipe(
            map((employee) => {
              if (employee!=null && employee.roles != null && employee.roles.includes(requiredRole)) {
                return true; // Permitir acceso si el rol coincide
              } else {
                this.router.navigate(['/home']); // Redirigir si el rol no coincide
                return false;
              }
            })
          );
        } else {
          this.router.navigate(['/login']); // Redirigir al login si no hay usuario
          return of(false);
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']); // Redirigir en caso de error
        return of(false);
      })
    );
  }
}
