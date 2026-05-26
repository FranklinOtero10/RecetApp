import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface favItem {
  userId: number,
  id: number,
  name: string,
  image: string,
  cuisine: string,
}

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {

  private favSubject = new BehaviorSubject<favItem[]>([]);
  favoritos$ = this.favSubject.asObservable();

  constructor() {
    this.loadFavoritosForCurrentUser();
  }

  private getUserId(): number | null {
    const raw = localStorage.getItem('currentUser');
    return raw ? JSON.parse(raw).id : null;
  }

  private getFavMap(): Record<string, favItem[]> {
    //const raw = localStorage.getItem('fav');
    const userId = this.getUserId();
    const raw = localStorage.getItem(`favoritos_${userId}`);
    return raw ? JSON.parse(raw) : {};
  }

  private saveFavMap(map: Record<string, any[]>): void {
    //localStorage.setItem('fav', JSON.stringify(map));
    const userId = this.getUserId();
    localStorage.setItem(`favoritos_${userId}`, JSON.stringify(map));
  }

  loadFavoritosForCurrentUser(): void {
    const userId = this.getUserId();
    if (!userId) { this.favSubject.next([]); return; }
    //const saved = localStorage.getItem(`favoritos_${userId}`);
    const saved = this.getFavMap();
    //this.favSubject.next(saved ? JSON.parse(saved) : []);
    this.favSubject.next(saved[userId] || []);
  }

  esFavorito(recipeId: number): boolean {
    // Verifica si la receta ya esta en la lista del usuario actual
    return this.favSubject.getValue().some(r => r.id === recipeId);
  }

  toggleFavorito(recipe: any): void {

    // Si ya esta, lo quita. Si no, lo agrega.
    // Completa esta logica: usa esFavorito(), filter() o push()
    // y guarda en localStorage["favoritos_userId"]

    const userId = this.getUserId();

    if (!userId) return;

    const current = [...this.favSubject.getValue()];

    if (this.esFavorito(recipe.id)) {

      const updated = current.filter(
        item => item.id !== recipe.id
      );

      this.persistCurrentUserFav(updated, userId);

    } else {

      current.push({

        userId,
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        cuisine: recipe.cuisine,

      });

      this.persistCurrentUserFav(current, userId);
    }
  }

  clearInMemory(): void {
    // Limpia la vista pero NO el localStorage
    this.favSubject.next([]);
  }

  private persistCurrentUserFav(items: favItem[], userId: number): void {

    const map = this.getFavMap();
    map[userId] = items;
    this.saveFavMap(map);
    this.favSubject.next(items);
  }

}
