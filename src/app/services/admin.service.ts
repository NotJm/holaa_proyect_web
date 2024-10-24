import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

   private readonly api = 'http://localhost:3000'

  constructor(private readonly httpClient: HttpClient) { }


  findAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.api}/users/get/all`);
  }

  getBlockedUsers(days: number): Observable<any> {
    return this.httpClient.get(`${this.api}/incidents/blocked-users?days=${days}`);
  }
  

}
