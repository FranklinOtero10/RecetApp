import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private api: String = 'https://dummyjson.com';

  private loginUrl = `${this.api}/auth/login`;

  constructor(
    private http: HttpClient,
  ) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, {
      username,
      password,
      //expiresInMins: 60   // DummyJSON acepta este parametro opcional
    });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();  // true si hay token, false si no
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  getProfileUser(): Observable<any> {

    const userAuth: string = `${this.api}/auth/me`;
    return this.http.get<any>(userAuth);

  }

}
