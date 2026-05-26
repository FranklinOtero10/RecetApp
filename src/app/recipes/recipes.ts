import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { FavoritosService } from '../services/favoritos.service';

@Component({
  selector: 'app-recipes',
  standalone: false,
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes implements OnInit {

  data: any = [];
  cargando: boolean = false;
  cargandoT: boolean = false;
  detalle: any = null;
  valor = '';
  busqueda = '';
  mealTypes: string[] = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snack',
    'Dessert'
  ];

  constructor( private recipeService: RecipeService, private favService: FavoritosService) {}

  ngOnInit(): void {

    this.favService.loadFavoritosForCurrentUser();

    this.cargando = true;
    this.recipeService.getRecipes().subscribe(
      (response) => { this.data = response.recipes; this.cargando = false;},
      (error) => { console.error('Error', error); this.cargando = false},
    );

  }

  //? Detalle de la receta
  detalleRecipe(recipeId: number): void {
    this.recipeService.getRecipeById(recipeId).subscribe(
      ( response ) => { this.detalle = response; },
      ( error ) => { console.error('Error: ', error); },
    );
  }


  //? Filtrado por categorias
  filtrarMealType(event: any): void {

    this.valor = event.target.value;
    this.cargandoT = true

    if (this.valor === 'all') {
      this.recipeService.getRecipes().subscribe(
        (response) => { this.data = response.recipes; this.cargandoT = false; },
        (error) => { console.error('Error', error);},
      );
    } else {
      this.recipeService.getRecipesByMealType(this.valor).subscribe(
        (response) => { this.data = response.recipes; this.cargandoT = false; },
        (error) => { console.error('Error', error);},
      ); 
    }
  }

  //? Busqueda de recetas
  searchRecipe(): void {

    this.valor = this.busqueda;
    
    if ( this.valor === '' ) {
      this.recipeService.getRecipes().subscribe(
        (response) => { this.data = response.recipes; },
        (error) => { console.error('Error', error);},
      );
    } else {
      this.recipeService.getRecipesbySearch(this.busqueda).subscribe(
        (response) => { this.data = response.recipes; },
        (error) => { console.error('Error', error);},
      );
    }

  }

}
