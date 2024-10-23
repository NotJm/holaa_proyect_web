import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // O un AdminAuthService dedicado
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    const isAdmin = this.authService.isAdmin();
    if (!isAdmin) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
