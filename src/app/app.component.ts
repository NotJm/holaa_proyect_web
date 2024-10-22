import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { CookiebannerComponent } from './components/cookiebanner/cookiebanner.component';

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
  styleUrls: ['./app.component.css'], // Estaba mal escrito, lo corregí a "styleUrls"
})
export class AppComponent implements OnInit {
<<<<<<< HEAD
  
  // isLoading: boolean = true;

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 3000);
=======
  isLoading: boolean = true;
  isDarkMode: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Simular una carga inicial
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);

    // Revisar si el modo oscuro estaba activado anteriormente
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      this.isDarkMode = true;
      this.renderer.addClass(document.body, 'dark');
    }
>>>>>>> 618e0dd0ff3f1b252bbc97f4a430b5ac6c0490bc
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      this.renderer.removeClass(document.body, 'dark');
      localStorage.setItem('darkMode', 'false');
    }
  }
}
