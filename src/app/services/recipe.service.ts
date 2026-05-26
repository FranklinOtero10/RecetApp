import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  private apiUrl = 'https://dummyjson.com';

  constructor( private http: HttpClient) {}

  getRecipes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recipes?limit=20&skip=0`);
  }

  getRecipeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recipes/${id}`);
  }

  getRecipesbySearch(recipe: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recipes/search?q=${recipe}`);
  }

  getRecipesByMealType(type: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recipes/meal-type/${type}`);
  }

}
