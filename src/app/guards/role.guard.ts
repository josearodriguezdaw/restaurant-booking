import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

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

    return from(this.authService.getUser()).pipe(
      switchMap((user) => {
        if (user && user.uid) {
          // Si el usuario está autenticado, obtenemos su rol
          return this.userService.getUserById(user.uid).pipe(
            map((employee) => {
              if (employee!=null && employee.role != null && employee.role.includes(requiredRole)) {
                return true; // Permitir acceso si el rol coincide
              } else {
                this.router.navigate(['/home']); // Redirigir si el rol no coincide
                return false;
              }
            })
          );
        } else {
          this.router.navigate(['/login']); // Redirigir al login si no hay usuario
          return [false];
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']); // Redirigir en caso de error
        return [false];
      })
    );
  }
}
