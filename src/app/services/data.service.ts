import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private emailSignal = signal<string>('');
  private cookiesAccept = signal<boolean>(false);

  setEmail(email: string) {
    this.emailSignal.set(email);
  }

  getEmail(): Signal<string> {
    return this.emailSignal;
  }

  setCookiesAccept(state: boolean) {
    this.cookiesAccept.set(state);
  }

  getCookiesAccept(): Signal<boolean> {
    return this.cookiesAccept;
  }

}
