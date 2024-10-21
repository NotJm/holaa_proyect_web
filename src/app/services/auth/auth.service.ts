import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
  
})
export class AuthService {

  private readonly apiRequest: string = "http://localhost:3000"

  constructor(private readonly httpClient: HttpClient) {}

  login(userData: any): Observable<any> {
    return this.httpClient.post(`${this.apiRequest}/auth/login`, userData).pipe(
      catchError(error => {
        return throwError(() => new Error(error.error.message) || 'Excepcion desconocida');
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.httpClient.post(`${this.apiRequest}/auth/register`, userData).pipe(
      catchError(error => {
        return throwError(() => new Error(error.error.message) || 'Excepcion desconocida');
      })
    );
  }

  verify_otp(optData: any): Observable<any> {
    return this.httpClient.post(`${this.apiRequest}/auth/verify/otp/code`, optData).pipe(
      catchError(error => {
        return throwError(() => new Error(error.error.message) || 'Excepcion desconocida');
      })
    );
  }



}
