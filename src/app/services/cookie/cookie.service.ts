import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private cookiesAcceptedSubject = new BehaviorSubject<boolean>(true);

  cookieAccept$ = this.cookiesAcceptedSubject.asObservable();

  acceptCookie(): void {
    this.cookiesAcceptedSubject.next(true);
  }

  hasAcceptedCookie(): boolean {
    return this.cookiesAcceptedSubject.value;
  }
}
