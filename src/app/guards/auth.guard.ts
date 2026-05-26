import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router:      Router
  ) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;  // hay token — puede entrar
    }
    // No hay token — redirigir al login
    this.router.navigate(['/login']);
    return false;
  }
}