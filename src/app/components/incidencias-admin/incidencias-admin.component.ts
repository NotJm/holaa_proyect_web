import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para los formularios

@Component({
  selector: 'app-incidencias-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incidencias-admin.component.html',
  styleUrls: ['./incidencias-admin.component.css']
})
export class IncidenciasAdminComponent {
  intentosFallidosMaximos: number = 5; // Número máximo de intentos fallidos antes de bloquear al usuario
  mensajeEmail: string = 'Este es un mensaje predeterminado de correo...'; // Mensaje del email
  tiempoToken: number = 60; // Tiempo de expiración del token en minutos

  // Lista de usuarios bloqueados
  usuariosBloqueados = [
    { nombre: 'Juan Perez', bloqueadoDesde: new Date(Date.now() - 86400000 * 2), razon: 'Exceso de intentos fallidos' }, // 2 días bloqueado
    { nombre: 'Ana Garcia', bloqueadoDesde: new Date(Date.now() - 86400000 * 10), razon: 'Exceso de intentos fallidos' }, // 10 días bloqueado
    { nombre: 'Luis Hernandez', bloqueadoDesde: new Date(Date.now() - 86400000 * 5), razon: 'Exceso de intentos fallidos' } // 5 días bloqueado
  ];

  filtroDias: number = 7; // Filtro inicial para los días (7 días)

  // Filtrar usuarios bloqueados por el tiempo que han estado bloqueados
  getUsuariosFiltrados() {
    const ahora = new Date();
    return this.usuariosBloqueados.filter(usuario => {
      const diferenciaDias = (ahora.getTime() - usuario.bloqueadoDesde.getTime()) / (1000 * 3600 * 24);
      return diferenciaDias <= this.filtroDias;
    });
  }
}
