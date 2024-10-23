import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notyf!: Notyf;

  constructor() {
    // Verificar si estamos en el navegador
    if (typeof document !== 'undefined') {
      this.notyf = new Notyf({
        position: {
          x: 'right',
          y: 'bottom',
        },
        types: [
          {
            type: 'info',
            background: '#3b82f6', 
            icon: {
              className: 'iconify w-6 h-6 text-white', 
              tagName: 'span', 
            },
          },
        ],
      });
    }
  }

  success(message: string): void {
    this.notyf.success({
      message,
    })
  }

  error(message: string): void {
    this.notyf.error({
      message,
    })
  }

  info(message: string): void {
    this.notyf.open({
      type: 'info',
      message: message
    })
  }

}
