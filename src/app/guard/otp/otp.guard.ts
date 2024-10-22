import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OtpGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verificar si el estado de OTP está pendiente
    const otpPending = localStorage.getItem('otpVerificationPending');

    if (otpPending === 'true') {
      return true; // Permitir el acceso
    } else {
      // Redirigir a una página diferente (registro, por ejemplo)
      this.router.navigate(['/auth/signin']);
      return false;
    }
  }
}
