import { Injectable } from '@angular/core';

declare var grecaptcha: any;

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  

  recaptchaToken: string = "";

  

  constructor() { }

  renderReCaptcha(): void {
    try {
      if (typeof grecaptcha !== 'undefined') {
        grecaptcha.render(
          'recaptcha-container',
          {
            siteKey: '6LcEH18qAAAAAIORRKnwSzz3FxwVcmVR48Tfj7cX',
            callback: (response: string) => {
              this.onCaptchaResolved(response);
            },
            
          }
        )
      } else {
        console.warn('Excepcion contenida, reCAPTCHA no disponible');
      }
    } catch (err) {
      console.warn('Excepcion contenida', err);
    }
  }

  private onCaptchaResolved(token: string): void { 
    this.recaptchaToken = token;
    console.log('Produccion:', token);
  }

}
