import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule para usar ngClass y otras directivas

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [CommonModule],  // Aquí agregamos CommonModule para poder usar ngClass
  templateUrl: './user-admin.component.html',
  styleUrls: []
})
export class UserAdminComponent {

  // Simulación de usuarios que viene desde el backend
  usuarios = [
    { nombre: 'Juan Hernandez', correo: 'juan@example.com', activo: true },
    { nombre: 'Luis Vargas', correo: 'luisvargas@example.com', activo: false },
    { nombre: 'Karim Yaffar', correo: 'karimyaffar@example.com', activo: true },
    { nombre: 'Pedro Rivas', correo: 'pedrorivas@example.com', activo: false },
  ];

  constructor() {}

}
