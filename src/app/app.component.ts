import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/public/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/public/loading/loading.component';
import { CookiebannerComponent } from './components/public/cookiebanner/cookiebanner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    CommonModule,
    LoadingComponent,
    CookiebannerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useValue: JwtInterceptor, multi: true }
  ]
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;
  isDarkMode: boolean = false;
  darkMode!: string | null;

  constructor(
    private readonly renderer: Renderer2,
    private readonly cookieService: CookieService,
  ) {
    this.darkMode = this.cookieService.get('darkMode');
  }

  ngOnInit(): void {
 
    
    if (this.darkMode === 'true') {
      this.isDarkMode = true;
      this.renderer.addClass(document.body, 'dark');
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark');
      this.cookieService.set('darkMode', 'true');
    } else {
      this.renderer.removeClass(document.body, 'dark');
      this.cookieService.set('darkMode', 'false');
    }
  }
}
