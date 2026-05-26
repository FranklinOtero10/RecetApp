import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FavoritosService } from '../services/favoritos.service';

@Component({
  selector: '[app-recipe-card]',
  standalone: false,
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard {

  @Input() recipe: any = null;
  @Output() detalle = new EventEmitter<number>();


  constructor(
    public authService: AuthService,
    public favoritosService: FavoritosService,
  ) { }


  verDetalle(): void {
    if (this.recipe) {
      this.detalle.emit(this.recipe.id);
    }
  }

  toggle(): void {
    if (this.recipe) {
      this.favoritosService.toggleFavorito(this.recipe);
    }
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating)) +
      '☆'.repeat(5 - Math.round(rating));
  }

}
