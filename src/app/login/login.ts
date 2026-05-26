import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FavoritosService } from '../services/favoritos.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username: string  = '';
  password: string  = '';
  error:    string  = '';
  loading:  boolean = false;

  constructor( 
    private authService: AuthService,
    private router: Router,
    private favService: FavoritosService,
  ) {}

  login(): void {

    this.loading = true;
    this.error = '';

    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        const session = {
           id: response.id,
           username: response.username,
           firstName: response.firstName
        };

        this.favService.loadFavoritosForCurrentUser();
        localStorage.setItem('currentUser', JSON.stringify(session));
        localStorage.setItem('token', response.accessToken);
        this.router.navigate(['/recipes']);
      },
      () => {
        this.error = 'Usuario o contrasena incorrectos.'
        this.loading = false;
      }
    )
  }
}
