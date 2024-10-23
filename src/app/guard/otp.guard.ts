import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class OtpGuard implements CanActivate {

   otpPending!: string | null;

  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) {}

  canActivate(): boolean {
    // Verificar si el estado de OTP está pendiente
    this.otpPending = this.cookieService.get('verification-pending');

    if (this.otpPending === 'true') {
      this.cookieService.delete('verification-peding');
      return true; 
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
