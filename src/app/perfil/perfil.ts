import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {

  data: any = {};
  cargando: boolean = false;

  constructor(
    private authService: AuthService
  ) {}


  ngOnInit(): void {
    this.cargando = true;
    this.authService.getProfileUser().subscribe(
      (response) => {
        this.data = response;
        this.cargando = false;
      },
      (error) => { console.error('Error categories:', error); }
    );
  }

}
