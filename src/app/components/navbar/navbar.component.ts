import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConectateComponent } from '../conectate/conectate.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] 
})
export class NavbarComponent {
  isModalOpen: boolean = false;
  isMenuOpen: boolean = false; 

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; 
  }


  toggleRegisterModal(): void {

  }
}
