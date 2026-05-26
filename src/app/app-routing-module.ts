import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Recipes } from './recipes/recipes';
import { RecipeDetail } from './recipe-detail/recipe-detail';
import { Favoritos } from './favoritos/favoritos';
import { Perfil } from './perfil/perfil';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '',               redirectTo: '/recipes',  pathMatch: 'full' },
  { path: 'login',          component: Login                                  },
  { path: 'recipes',        component: Recipes                                },
  { path: 'recipe/:id',    component: RecipeDetail                           },
  { path: 'favoritos',     component: Favoritos,     canActivate: [AuthGuard] },
  { path: 'perfil',        component: Perfil,         canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
