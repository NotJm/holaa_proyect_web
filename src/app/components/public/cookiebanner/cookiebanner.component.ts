import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookiebanner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookiebanner.component.html',
  styleUrls: ['./cookiebanner.component.css']
})
export class CookiebannerComponent {

  constructor(
    private readonly cookieService: CookieService,
  ) {}

  cookiesAccepted: boolean = false;
  showBanner: boolean = true

  ngOnInit(): void {
    const accepted = this.cookieService.get('cookiesAccepted');
    this.cookiesAccepted = accepted === 'true';

  }

  acceptCookies(): void {
    this.cookieService.set('cookiesAccepted', 'true');
    this.cookiesAccepted = true;
  }
}
