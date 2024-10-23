import { Component, Renderer2, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,  
  imports: [RouterModule, LoadingComponent, CommonModule], 
})
export class HomeComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Revisar si el modo oscuro estaba activado anteriormente
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      this.isDarkMode = true;
      this.renderer.addClass(document.body, 'dark');
    }
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
