import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],  
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [CookieService]
})
export class NavbarComponent implements OnInit {

  constructor(
    public readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.checkTokenOnInit();
  }
  
  // Implementacion y funcionalidad de logout
  logout() {
    this.authService.logout();
  }

}

