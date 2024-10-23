import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router'; // Asegúrate de importar Router
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiRequest: string = 'http://localhost:3000';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly cookieService: CookieService
  ) {}

  private hasToken(): boolean {
    if(this.cookieService){
      const token = this.cookieService.get('auth_token');
      
      if (!token) {
        return false;
      }

      return true;
    } else {
      return false;
    }
    
  }

  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(userData: any): Observable<any> {
    return this.httpClient
      .post(`${this.apiRequest}/auth/login`, userData, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.isAuthenticatedSubject.next(true);
        }),
        catchError((error) => {
          return throwError(
            () => new Error(error.error.message) || 'Excepción desconocida'
          );
        })
      );
  }

  register(userData: any): Observable<any> {
    return this.httpClient
      .post(`${this.apiRequest}/auth/register`, userData, {
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
      .post(`${this.apiRequest}/auth/verify/otp/code`, optData, {
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
    return this.httpClient
      .post(
        `${this.apiRequest}/refresh/token`,
        { token },
        {
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

  logout() {
    this.isAuthenticatedSubject.next(false);
    this.cookieService.delete('auth_token');
    this.cookieService.delete('refresh_token');
    this.router.navigate(['/auth/login']);
  }
}
