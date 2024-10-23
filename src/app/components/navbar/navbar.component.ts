import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';  // Asegúrate de importar ViewChild
import { RouterLink } from '@angular/router';
import { SearchModalComponent } from '../search-modal/search-modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchModalComponent],  // Asegúrate de incluir SearchModalComponent
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isModalOpen: boolean = false;
  isMenuOpen: boolean = false; 

  // Función para alternar el menú
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Utilizando ViewChild para abrir el modal
  @ViewChild(SearchModalComponent) searchModal!: SearchModalComponent;

  openSearchModal() {
    if (this.searchModal) {
      this.searchModal.openModal();
    }
  }

  toggleRegisterModal(): void {
    // Implementa lógica para el modal de registro si lo necesitas
  }
}

