import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importa FormsModule para usar NgModel
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-politicas-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Habilitamos el uso de formularios
  templateUrl: './politicas-admin.component.html',
  styleUrls: ['./politicas-admin.component.css']
})
export class PoliticasAdminComponent implements OnInit {
  politicas: any[] = [];  // Lista de políticas obtenidas del backend
  selectedPolitica: any = null;  // Política seleccionada para ver o editar
  isEditing: boolean = false;    // Estado de edición
  editMode: boolean = false;     // Controla si estamos en modo de agregar o editar
  policyForm = { title: '', description: '' };  // Almacena el formulario

  constructor(private policyService: AdminService) {}

  ngOnInit() {
    this.loadPolicies();  // Cargar todas las políticas cuando el componente se inicie
  }

  // Cargar todas las políticas desde el backend
  loadPolicies() {
    this.policyService.getAllPolicies().subscribe((data) => {
      this.politicas = data;
    });
  }

  // Método para agregar una nueva política
  agregarPolitica(): void {
    // Reinicia el formulario para asegurarse de que esté vacío
    this.policyForm = { title: '', description: '' };
    
    // Cambia el modo de edición a false, ya que estamos agregando una nueva política
    this.isEditing = false;
    
    // Habilitamos el modo de agregar (editMode true) para mostrar el formulario
    this.editMode = true;
    
    // Asegúrate de que no haya ninguna política seleccionada (esto es para edición)
    this.selectedPolitica = null;
  }
  

  // Método para ver una política
  verPolitica(politica: any): void {
    this.selectedPolitica = politica;
    this.isEditing = false;
    this.editMode = false;  // Aseguramos que no se muestre el formulario de edición
  }

  // Método para editar una política
  editarPolitica(politica: any): void {
    this.selectedPolitica = { ...politica };  // Clonamos la política seleccionada para editar
    this.policyForm = { title: politica.title, description: politica.description };  // Rellenamos el formulario
    this.isEditing = true;
    this.editMode = true;  // Muestra el formulario para editar
  }
  

  savePolicy(): void {
    if (this.isEditing && this.selectedPolitica) {
      // Si estamos editando una política existente
      this.policyService.updatePolicy(this.selectedPolitica._id, {
        title: this.policyForm.title,
        description: this.policyForm.description
      }).subscribe(() => {
        this.loadPolicies();  // Recargar las políticas después de actualizar
        this.cerrarModal();
      });
    } else {
      // Aquí estamos AGREGANDO una nueva política
      this.policyService.createPolicy({
        title: this.policyForm.title,        // Título de la política desde el formulario
        description: this.policyForm.description  // Descripción de la política desde el formulario
      }).subscribe(() => {
        // Una vez agregada la política, recargamos la lista y cerramos el modal
        this.loadPolicies();  // Recargar la lista de políticas para mostrar la nueva
        this.cerrarModal();    // Cerrar el modal o formulario
      }, error => {
        console.log(error)  // Manejar errores si algo falla;
      });
    }
  }

  // Método para eliminar una política
  deletePolicy(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta política?')) {
      this.policyService.deletePolicy(id).subscribe(() => {
        this.loadPolicies();  // Recarga las políticas después de eliminar
      }, error => {
        console.error('Error al eliminar la política:', error);
      });
    }
  }
  
  // Método para cerrar el modal
  cerrarModal(): void {
    this.selectedPolitica = null;  // Desselecciona cualquier política
    this.editMode = false;  // Desactiva el modo de edición/agregar
    this.policyForm = { title: '', description: '' };  // Resetea el formulario
  }
  
}
