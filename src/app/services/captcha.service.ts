import { Injectable } from '@angular/core';

declare var grecaptcha: any;

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {


  constructor() { }

  renderReCaptcha(): void {
    try {
      if (typeof grecaptcha !== 'undefined') {
        grecaptcha.render(
          'recaptcha-container',
          {
            siteKey: '6LcEH18qAAAAAIORRKnwSzz3FxwVcmVR48Tfj7cX'
          }
        )
      } else {
        console.warn('Excepcion contenida, reCAPTCHA no disponible');
      }
    } catch (err) {
      console.warn('Excepcion contenida', err);
    }
  }


}
