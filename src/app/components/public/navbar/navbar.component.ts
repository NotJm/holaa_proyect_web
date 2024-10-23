import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { SearchModalComponent } from '../../admin/search-modal/search-modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchModalComponent],  // Asegúrate de incluir SearchModalComponent
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
        console.log("Status ", status);
        this.isAuthenticated = status
      }
    )
  }

  logoutEvent() {
    this.authService.logout();
  }

  // Utilizando ViewChild para abrir el modal
  @ViewChild(SearchModalComponent) searchModal!: SearchModalComponent;

  openSearchModal() {
    if (this.searchModal) {
      this.searchModal.openModal();
    }
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}

