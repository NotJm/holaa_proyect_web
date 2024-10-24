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
  ) {}

  
  login(userData: any): Observable<any> {
    return this.httpClient.post(`${this.api}/auth/login`, userData, {
      withCredentials: true,
    })
    .pipe(
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

    verification(): void {
      this.httpClient.get(`${this.api}/auth/verify`, { withCredentials: true }).subscribe({
        next: (response: any) => {
          console.log("Auth:", response.authenticate);
        }
      })
    }


  logout(): void {
  }

}
