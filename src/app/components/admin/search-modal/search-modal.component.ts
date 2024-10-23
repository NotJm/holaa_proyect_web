import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa el CommonModule

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CommonModule],  // Añade CommonModule a los imports
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
