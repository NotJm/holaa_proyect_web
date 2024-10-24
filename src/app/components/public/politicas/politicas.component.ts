import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa el CommonModule

@Component({
  selector: 'app-politicas',
  standalone: true,
  imports: [CommonModule],  // Agrega CommonModule aquí
  templateUrl: './politicas.component.html'
})
export class PoliticasComponent {
  // Array que contiene las políticas dinámicas
  politicas = [
    {
      titulo: 'Política de Privacidad',
      descripcion: 'Esta política de privacidad describe cómo se recopila, utiliza y protege su información personal en este sitio web. Nos comprometemos a garantizar la confidencialidad de su información personal.'
    },
    {
      titulo: 'Términos y Condiciones',
      descripcion: 'Al acceder a este sitio web, usted acepta estar sujeto a estos términos y condiciones de uso, todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales.'
    },
    {
      titulo: 'Política de Cookies',
      descripcion: 'Utilizamos cookies para mejorar la experiencia de usuario en nuestro sitio web. Al continuar utilizando este sitio web, acepta el uso de cookies según nuestra política de cookies.'
    },
    {
      titulo: 'Política de Reembolso',
      descripcion: 'Nuestra política de reembolso garantiza que, bajo ciertas condiciones, puede solicitar un reembolso por productos o servicios adquiridos. Consulte las condiciones aplicables en nuestra política de reembolso.'
    }
  ];
}
