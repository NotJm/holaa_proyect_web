import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cookiebanner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookiebanner.component.html',
  styleUrl: './cookiebanner.component.css'
})
export class CookiebannerComponent {
  cookiesAccepted: boolean = false;

  ngOnInit(): void {
    // Verifica si estamos en el navegador
    if (typeof window !== 'undefined') {
      const accepted = localStorage.getItem('cookiesAccepted');
      this.cookiesAccepted = accepted === 'true';
    }
  }

  acceptCookies(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookiesAccepted', 'true');
      this.cookiesAccepted = true;
    }
  }
}
