import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para los formularios
import { AdminService } from '../../../services/admin.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-incidencias-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incidencias-admin.component.html',
  styleUrls: ['./incidencias-admin.component.css']
})
export class IncidenciasAdminComponent {

  blockedUsers: any[] = [];

  constructor(private adminService: AdminService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadConfig();
    this.loadEmailMessage();
    this.getBlockedUsers(); 
  }

  getBlockedUsers() {
    this.adminService.getBlockedUsers(this.filtroDias).subscribe((response) => {
      this.blockedUsers = response;
    });
  }

  // Manejar cambios en la selección de días
  onDaysChange(event: any) {
    this.filtroDias = event.target.value;
    this.getBlockedUsers();
  }

  loadConfig() {
    this.adminService.getConfig().subscribe((config) => {
      if (config) {
        this.intentosFallidosMaximos = config.maxFailedAttempts;
        this.tiempoToken = config.blockDuration;
        // console.log('Configuración cargada:', config);
      }
    });
  }

  guardarIntentosFallidos() {
    this.adminService.updateFailedAttempts(this.intentosFallidosMaximos).subscribe(response => {
      this.notificationService.success('Cambios realizado con exito');
      
    });
  }

  loadEmailMessage() {
    this.adminService.getEmailMessage().subscribe((response) => {
      this.mensajeEmail = response.message;
    });
  }

  // Actualizar el mensaje de correo
  updateEmailMessage() {
    this.adminService.updateEmailMessage(this.mensajeEmail).subscribe((response) => {
      this.notificationService.success('Cambios realizado con exito') 
    });
  }

  intentosFallidosMaximos: number = 5; // Número máximo de intentos fallidos antes de bloquear al usuario
  mensajeEmail: string = 'Este es un mensaje predeterminado de correo...'; // Mensaje del email
  tiempoToken: number = 60; // Tiempo de expiración del token en minutos

  // Lista de usuarios bloqueados


  filtroDias: number = 7; // Filtro inicial para los días (7 días)


}
