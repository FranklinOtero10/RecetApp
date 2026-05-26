import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { AuthService } from '../services/auth.service';
import { FavoritosService } from '../services/favoritos.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail implements OnInit {

  detalle: any = null;
  cargando: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    public authService: AuthService,
    public favService: FavoritosService
  ) {}

  ngOnInit(): void {

    this.favService.loadFavoritosForCurrentUser();

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.cargando = true;

    this.recipeService.getRecipeById( id ).subscribe(
      (response) => {
        this.detalle = response;
        this.cargando = false;
      },
      (error) => {
        console.error('Error', error);
        this.error = 'No se pudo cargar la receta.'
        this.cargando = false;
      }
    );
  }

  toggle(): void {
    if (this.detalle) {
      this.favService.toggleFavorito(this.detalle);
    }
  }

}
