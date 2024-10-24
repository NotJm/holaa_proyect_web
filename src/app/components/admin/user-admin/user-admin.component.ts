import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule para usar ngClass y otras directivas
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './user-admin.component.html',
  styleUrls: []
})
export class UserAdminComponent implements OnInit {

  usuarios: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.findAll().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }
}
