import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importa FormsModule para usar NgModel
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service'; // Servicio para hacer las peticiones HTTP

@Component({
  selector: 'app-documento-regulatorio',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Habilitamos el uso de formularios
  templateUrl: './documento-regulatorio.component.html',
  styleUrls: ['./documento-regulatorio.component.css']
})
export class DocumentoRegulatorioComponent implements OnInit {
  documentos: any[] = [];  // Lista de documentos obtenidos del backend
  selectedDocumento: any = null;  // Documento seleccionado para ver o editar
  isEditing: boolean = false;    // Estado de edición
  editMode: boolean = false;     // Controla si estamos en modo de agregar o editar
  documentoForm = { title: '', content: '', email: '', effective_date: '' };  // Almacena el formulario

  constructor(private documentService: AdminService) {}

  ngOnInit() {
    this.loadDocuments();  // Cargar todos los documentos cuando el componente se inicie
  }

  // Cargar todos los documentos desde el backend
  loadDocuments() {
    this.documentService.getAllDocuments().subscribe((data) => {
      this.documentos = data;
    }, error => {
      console.error('Error al cargar los documentos:', error);
    });
  }

  // Método para agregar un nuevo documento
  agregarDocumento(): void {
    this.documentoForm = { title: '', content: '', email: '', effective_date: '' };  // Reinicia el formulario
    this.editMode = true;  // Modo agregar
    this.selectedDocumento = null;
  }

  // Método para ver un documento
  verDocumento(documento: any): void {
    this.selectedDocumento = documento;
    this.isEditing = false;
  }

  // Método para editar un documento
  editarDocumento(documento: any): void {
    this.selectedDocumento = { ...documento };  // Clonamos el documento seleccionado
    this.documentoForm = { title: documento.title, content: documento.content, email: documento.email, effective_date: documento.effective_date };
    this.isEditing = true;
    this.editMode = true;
  }

  // Guardar nuevo documento o actualizar uno existente
  saveDocumento(): void {
    const formValues = {
      title: this.documentoForm.title,
      content: this.documentoForm.content,
      email: this.documentoForm.email,
      effective_date: new Date(this.documentoForm.effective_date)  // Convertimos a Date
    };

    if (this.isEditing && this.selectedDocumento) {
      // Actualizar documento existente
      this.documentService.updateDocument(this.selectedDocumento._id, formValues)
        .subscribe(() => {
          this.loadDocuments();  // Recargar los documentos después de actualizar
          this.cerrarModal();
        }, error => {
          console.error('Error al actualizar el documento:', error);
        });
    } else {
      // Crear nuevo documento
      this.documentService.createDocument(formValues)
        .subscribe(() => {
          this.loadDocuments();  // Recargar la lista de documentos para mostrar el nuevo
          this.cerrarModal();
        }, error => {
          console.error('Error al crear el documento:', error);
        });
    }
  }

  // Método para eliminar un documento
  deleteDocumento(id: string): void {
    this.documentService.deleteDocument(id).subscribe(() => {
      this.loadDocuments();  // Recargar la lista de documentos
    }, error => {
      console.error('Error al eliminar el documento:', error);
    });
  }

  // Método para cerrar el modal
  cerrarModal(): void {
    this.selectedDocumento = null;
    this.editMode = false;
    this.documentoForm = { title: '', content: '', email: '', effective_date: '' };  // Resetear el formulario
  }
}
