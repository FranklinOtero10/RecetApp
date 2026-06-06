import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface RecipesR {
  id: number,
  name: string,
  ingredients: string[],
  instructions: string[],
  prepTimeMinutes: string,
  cookTimeMinutes: string,
  servings: string,
  difficulty: string,
  cuisine: string,
  caloriesPerServing: string
  tags: String[],
  image: string,
  rating: number,
  reviewCount: number,
  mealType: string[],
}

export interface RecipesResponse{
  recipes: RecipesR[]
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  private readonly apiUrl = 'https://dummyjson.com';

  constructor( private http: HttpClient) {}

  getRecipes(): Observable<RecipesResponse> {
    return this.http.get<RecipesResponse>(`${this.apiUrl}/recipes?limit=20&skip=0`);
  }

  getRecipeById(id: number): Observable<RecipesR> {
    return this.http.get<RecipesR>(`${this.apiUrl}/recipes/${id}`);
  }

  getRecipesbySearch(recipe: string): Observable<RecipesResponse> {
    return this.http.get<RecipesResponse>(`${this.apiUrl}/recipes/search?q=${recipe}`);
  }

  getRecipesByMealType(type: String): Observable<RecipesResponse> {
    return this.http.get<RecipesResponse>(`${this.apiUrl}/recipes/meal-type/${type}`);
  }

}
