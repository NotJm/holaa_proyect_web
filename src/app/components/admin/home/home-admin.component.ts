import { Component } from '@angular/core';
import { MenubarComponent } from '../menubar/menubar.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [MenubarComponent, RouterOutlet, CommonModule],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {
  constructor(private readonly router: Router) {}

  isRootAdminRoute(): boolean {
    return this.router.url === '/admin';
  }
}
