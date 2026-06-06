import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface LoginResponse {
  id: number,
  username: string,
  firstName: string,
  accessToken: string,
  expiresInMins?: number,
}

export interface ProfileUser {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  age: number,
  phone: string,
  birthDate: string,
  image: string,
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly api: string = 'https://dummyjson.com';

  private readonly loginUrl: string = `${this.api}/auth/login`;

  constructor(
    private http: HttpClient,
  ) { }

  login(username: string, password: string, expiresInMins?: number): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, {
      username,
      password,
      expiresInMins: expiresInMins   // DummyJSON acepta este parametro opcional
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

  getProfileUser(): Observable<ProfileUser> {

    const userAuth: string = `${this.api}/auth/me`;
    return this.http.get<ProfileUser>(userAuth);

  }

}
