import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router'; // Asegúrate de importar Router
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

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
      const token = this.cookieService.get('token');
      
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

  isAdmin(): boolean {
    const token = this.cookieService.get('token');
  
    if (token) {
      try {
        const payload: any = jwtDecode(token);
        return payload.role === 'admin'; 
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }
  
  logout() {
    // Cambiar el estado de autenticación a falso
    this.isAuthenticatedSubject.next(false);
  
    // Eliminar el token de las cookies
    this.cookieService.delete('token');
  
    // Verificar si el token ha sido eliminado correctamente
    const tokenExists = this.cookieService.get('token');
    if (!tokenExists) {
      console.log('Token eliminado correctamente');
    } else {
      console.error('Error: No se pudo eliminar el token');
    }
  
    // Redirigir al login
    this.router.navigate(['/auth/login']).then(navigated => {
      if (navigated) {
        console.log('Redirigido al login correctamente');
      } else {
        console.error('Error: No se pudo redirigir al login');
      }
    });
  }
}
