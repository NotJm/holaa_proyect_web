import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly api: string = 'http://localhost:3000';
  isAuthenticated = signal(false);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly cookieService: CookieService
  ) {}

  isAuth(): boolean {
    // Obtenemos el token
    const token = this.cookieService.get('token');

    // Si existe el token true en caso contrario false
    if (token) {
      this.isAuthenticated.set(true);
      return true;
    } else {
      this.isAuthenticated.set(false);
      return false;
    }
  }

  checkTokenOnInit(): void {
    debugger;
    const token = this.cookieService.get('token');
    if (token) {
      this.isAuthenticated.set(true);  // Si el token existe, autenticado
    } else {
      this.isAuthenticated.set(false);  // Si no hay token, no autenticado
    }
  }

  isAdmin(): boolean {
    // Obtenemos el token JWT
    const token = this.cookieService.get('token');

    // Primero verificamos si el token JWT esta presente
    if (!token) {
      return false; // Regresamos falso
    }

    // Decodificamos el token
    const user: any = jwtDecode(token);

    // Condiciamos si es administrador o no
    return user.role === 'admin' ? true : false;
  }

  login(userData: any): Observable<any> {
    return this.httpClient.post(`${this.api}/auth/login`, userData, {
      withCredentials: true,
    })
    .pipe(
      tap((response) => this.isAuthenticated.set(true)),
      catchError((error) => {
        return throwError(
          () => new Error(error.error.message)
        )
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.httpClient
      .post(`${this.api}/auth/register`, userData, {
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error(error.error.message) || 'Excepción desconocida'
          );
        })
      );
  }

  verify_otp(optData: any): Observable<any> {
    return this.httpClient
      .post(`${this.api}/auth/verify/otp/code`, optData, {
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error(error.error.message) || 'Excepción desconocida'
          );
        })
      );
  }

  refresh_token(token: string): Observable<any> {
    return this.httpClient.post(`${this.api}/refresh/token`,{ token },{
          withCredentials: true,
        }
      )
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error(error.error.message) || 'Excepción desconocida'
          );
        })
      );
  }

  logout(): void {
    this.isAuthenticated.set(false);
    this.cookieService.delete('token');
  }
}
