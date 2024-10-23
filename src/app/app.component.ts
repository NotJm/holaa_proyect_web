import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { CookiebannerComponent } from './components/cookiebanner/cookiebanner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';

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
    StorageService,
    { provide: HTTP_INTERCEPTORS, useValue: JwtInterceptor, multi: true }
  ]
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;
  isDarkMode: boolean = false;
  darkMode!: string | null;

  constructor(
    private renderer: Renderer2,
    private storageService: StorageService,
  ) {
    if (this.storageService.isLocalStorageAvailable()) {
      this.darkMode = localStorage.getItem('darkMode');
    }
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 3000);
    
    
    if (this.darkMode === 'true') {
      this.isDarkMode = true;
      this.renderer.addClass(document.body, 'dark');
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark');
      if (this.storageService.isLocalStorageAvailable()) {
        this.storageService.setItem('darkMode', 'true');
      }
    } else {
      this.renderer.removeClass(document.body, 'dark');
      if (this.storageService.isLocalStorageAvailable()) {
        this.storageService.setItem('darkMode', 'false');
      }
    }
  }
}
