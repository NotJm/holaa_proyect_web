import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket!: Socket;

  constructor(@Inject(PLATFORM_ID) private plataformID: Object) {}

  connect(): void {
    if (isPlatformBrowser(this.plataformID)) {
      this.socket = io('http://localhost:3000/', { transports: ['websocket'] });

      this.socket.on('connect', () => {
        console.log('Conectado al WebSocket con ID:', this.socket.id);
      });

      this.socket.on('connect_error', (error) => {
        console.log('Error de conexión:', error.message);
      });
    }
  }

  onEmailVerified(): Observable<any> {
    return new Observable((subscribe) => {
      this.socket.on('verification_successfully', (data) => {
        if (data) {
          subscribe.next('Correo Verificado Exitosamente');
        } else {
          subscribe.next('El link de activacion de cuenta caduco');
        }
      });
    });
  }

  discconect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
