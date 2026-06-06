
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  //? "HttpRequest<any>" se usa con el tipo :any" porque el interceptor maneja todas las peticiones de la app
  //? representa cualquier petición HTTP que pase por el interceptor

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');

    if (token) {
      // Clonar la peticion y agregarle el header de autenticacion
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(cloned);
    }

    return next.handle(req);  // si no hay token, enviar sin modificar
  }
}