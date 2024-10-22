import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private timer: any;

  startTimer() {
    this.timer = setTimeout(() => {
      return true;
    }, 300000)
  }

  resetTimer() {
    clearTimeout(this.timer);
    this.startTimer();
  }

  
}
