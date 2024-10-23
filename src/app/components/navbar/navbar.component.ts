import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] 
})
export class NavbarComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean = false;
  private authSubscription: Subscription = new Subscription();
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.getIsAuthenticated().subscribe(
      (status) => {
        this.isAuthenticated = status
      }
    )
  }

  logoutEvent() {
    this.authService.logout();
  }


  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
