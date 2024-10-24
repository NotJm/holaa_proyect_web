import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para los formularios
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-incidencias-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incidencias-admin.component.html',
  styleUrls: ['./incidencias-admin.component.css']
})
export class IncidenciasAdminComponent {

  blockedUsers: any[] = [];

  constructor(private incidentService: AdminService) { }

  ngOnInit(): void {
    this.incidentService.getBlockedUsers(7).subscribe(
      (data) => {
        this.blockedUsers = data;
      },
      (error) => {
        console.error('Error al obtener usuarios bloqueados', error);
      }
    );
  }

  intentosFallidosMaximos: number = 5; // Número máximo de intentos fallidos antes de bloquear al usuario
  mensajeEmail: string = 'Este es un mensaje predeterminado de correo...'; // Mensaje del email
  tiempoToken: number = 60; // Tiempo de expiración del token en minutos

  // Lista de usuarios bloqueados


  filtroDias: number = 7; // Filtro inicial para los días (7 días)


}
