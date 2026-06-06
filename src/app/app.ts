import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { FavoritosService } from './services/favoritos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {

  contadorFavoritos: number = 0;
  //currentUser: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private favoritosService: FavoritosService,
  ) { }

  ngOnInit(): void {

    this.favoritosService.loadFavoritosForCurrentUser();

    //this.userActive();
    this.favoritosService.favoritos$.subscribe(items => {
      this.contadorFavoritos = items.length;
    })
  }

  logout(): void {
    this.authService.logout();
    this.favoritosService.clearInMemory();
    this.router.navigate(['/login']);
  }

  userActive(): string {
    //const user = JSON.parse(localStorage.getItem('currentUser')!);
    //this.currentUser = user.firstName;

    const user: string | null  = localStorage.getItem('currentUser');

    return user
      ? JSON.parse(user).firstName
      : '';
  }

}
