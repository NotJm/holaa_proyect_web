import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiRequest: string | undefined = process.env['API_REQUEST'];

  constructor(private readonly httpClient: HttpClient) {}

  login(userData: any): Observable<any> {
    return this.httpClient.post(`${this.apiRequest}/login`, userData);
  }

  register(userData: any): Observable<any> {
    return this.httpClient.post(`${this.apiRequest}/register`, userData);
  }


}
