import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly api = 'http://localhost:3000';

  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.api}/users/get/all`);
  }

  getBlockedUsers(days: number): Observable<any> {
    return this.httpClient.get(
      `${this.api}/incidents/blocked-users?days=${days}`
    );
  }

  // Actualizar solo los intentos fallidos (maxFailedAttempts)
  updateFailedAttempts(maxAttempts: number): Observable<any> {
    return this.httpClient.post(
      `${this.api}/incidents/update-failed-attempts`,
      { maxAttempts }
    );
  }

  // Actualizar solo la duración del bloqueo (blockDuration)
  updateBlockDuration(blockDuration: number): Observable<any> {
    return this.httpClient.post(`${this.api}/incidents/update-block-duration`, {
      blockDuration,
    });
  }

  getConfig(): Observable<any> {
    return this.httpClient.get<any>(`${this.api}/incidents/config`);
  }

   getEmailMessage(): Observable<any> {
    return this.httpClient.get(`${this.api}/incidents/email-message`);
  }

  updateEmailMessage(newMessage: string): Observable<any> {
    return this.httpClient.post(`${this.api}/incidents/update-email-message`, { message: newMessage });
  }

  getAllPolicies(): Observable<any> {
    return this.httpClient.get(`${this.api}/policies/get/all`);
  }

  createPolicy(policy: any): Observable<any> {
    return this.httpClient.post(`${this.api}/policies/create`, policy);
  }

  updatePolicy(id: string, policy: any): Observable<any> {
    return this.httpClient.patch(`${this.api}/policies/update/${id}`, policy);
  }

  deletePolicy(id: string): Observable<any> {
    return this.httpClient.delete(`${this.api}/policies/delete/${id}`);
  }

   // Obtener todos los documentos regulatorios
   getAllDocuments(): Observable<any> {
    return this.httpClient.get<any>(`${this.api}/dt/get/all`);
  }

  // Crear nuevo documento
  createDocument(document: any): Observable<any> {
    return this.httpClient.post(`${this.api}/dt/create/dr`, document);
  }

  // Actualizar documento existente
  updateDocument(id: string, document: any): Observable<any> {
    return this.httpClient.put(`${this.api}/dt/update/dr/${id}`, document);
  }

  // Eliminar documento
  deleteDocument(id: string): Observable<any> {
    return this.httpClient.delete(`${this.api}/dt/delete/dr/${id}`);
  }
  
}
