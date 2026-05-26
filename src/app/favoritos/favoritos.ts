import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../services/favoritos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favoritos',
  standalone: false,
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos implements OnInit {

  items: any[] = [];

  constructor( private favService: FavoritosService ) { }

  ngOnInit(): void {
    this.favService.loadFavoritosForCurrentUser();
    this.favService.favoritos$.subscribe(r => this.items = r);
  }

  quitarFav(item: any): void { 
    Swal.fire({
      title: '¿Quitar receta?',
      text: `${item.name} será removido de favoritos`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {                            // solo elimina si el usuario confirma
        this.favService.toggleFavorito(item)
        Swal.fire('Eliminado', `${item.name} fue removido de favoritos`, 'success');
      }
    });
  }

}
