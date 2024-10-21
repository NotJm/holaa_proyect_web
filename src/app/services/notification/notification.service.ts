import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notyf!: Notyf;

  constructor() {
    if (typeof document !== 'undefined') {
      this.notyf = new Notyf();
    }
  }

  success(message: string): void {
    this.notyf.success({
      message,
      duration: 5000,
    })
  }

  error(message: string): void {
    this.notyf.error({
      message,
      duration: 5000,
    })
  }

}
