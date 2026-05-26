import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Recipes } from './recipes/recipes';
import { RecipeCard } from './recipe-card/recipe-card';
import { RecipeDetail } from './recipe-detail/recipe-detail';
import { Login } from './login/login';
import { Favoritos } from './favoritos/favoritos';
import { Perfil } from './perfil/perfil';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    App,
    Recipes,
    RecipeCard,
    RecipeDetail,
    Login,
    Favoritos,
    Perfil
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide:  HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:    true   // permite multiples interceptores en la misma app
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
