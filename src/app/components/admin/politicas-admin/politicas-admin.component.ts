import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Para los formularios en el modal

@Component({
  selector: 'app-politicas-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Importamos CommonModule y FormsModule
  templateUrl: './politicas-admin.component.html',
  styleUrls: ['./politicas-admin.component.css']
})
export class PoliticasAdminComponent {
  politicas = [
    { num: 1, titulo: 'Compromiso con la Calidad', politica: 'En cada detalle, reflejamos nuestro compromiso inquebrantable con la calidad...', completo: 'En cada detalle, reflejamos nuestro compromiso inquebrantable con la calidad. Cada puerta que sale de nuestro taller es una obra maestra cuidadosamente elaborada, fusionando artesanía tradicional con las últimas tendencias.' },
    { num: 2, titulo: 'Servicio Personalizado', politica: 'En DoorCraft, entendemos que cada hogar es único...', completo: 'En DoorCraft, entendemos que cada hogar es único. Por eso, ofrecemos un servicio personalizado que va más allá de la simple venta. Nuestro equipo de expertos está aquí para guiarte en la elección de la puerta perfecta.' },
    { num: 3, titulo: 'Sostenibilidad y Responsabilidad', politica: 'Nos preocupamos por el medio ambiente y trabajamos activamente...', completo: 'Nos preocupamos por el medio ambiente y trabajamos activamente para reducir nuestro impacto en el planeta mediante prácticas sostenibles.' },
    { num: 4, titulo: 'Innovación y Creatividad', politica: 'En DoorCraft, nos esforzamos por impulsar la innovación...', completo: 'En DoorCraft, nos esforzamos por impulsar la innovación y la creatividad en cada aspecto de nuestro trabajo, buscando siempre las soluciones más efectivas y modernas.' }
  ];

  selectedPolitica: any = null;  // Almacena la política seleccionada para ver o editar
  isEditing: boolean = false;    // Controla si estamos editando la política

  // Método para mostrar el modal de ver
  verPolitica(politica: any): void {
    this.selectedPolitica = politica;
    this.isEditing = false;
  }

  // Método para mostrar el modal de editar
  editarPolitica(politica: any): void {
    this.selectedPolitica = { ...politica };  // Creamos una copia de la política
    this.isEditing = true;
  }

  // Método para guardar los cambios después de editar
  guardarCambios(): void {
    const index = this.politicas.findIndex(p => p.num === this.selectedPolitica.num);
    if (index > -1) {
      this.politicas[index] = this.selectedPolitica;
    }
    this.selectedPolitica = null;
  }

  // Método para cerrar el modal
  cerrarModal(): void {
    this.selectedPolitica = null;
  }
}
