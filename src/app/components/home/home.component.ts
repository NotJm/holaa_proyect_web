import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importa RouterModule

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,  // Componente standalone
  imports: [RouterModule],  // Importa RouterModule aquí
})
export class HomeComponent {}
