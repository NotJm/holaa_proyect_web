import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false; // Estado del menú

  toggleMenu(): void {
    alert('Click detectado');
    console.log("Mostrar menu");
    this.isMenuOpen = !this.isMenuOpen; // Alterna la visibilidad del menú
  }
}
