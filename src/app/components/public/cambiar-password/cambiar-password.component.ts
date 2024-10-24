import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Asegúrate de importar ReactiveFormsModule
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {
  changePasswordForm: FormGroup;
  token: string = '';
  message: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Obtener el token desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });

    // Definir el formulario reactivo para la nueva contraseña
    this.changePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatch });
  }

  // Método para verificar si las contraseñas coinciden
  passwordsMatch(form: FormGroup) {
    return form.controls['newPassword'].value === form.controls['confirmPassword'].value
      ? null
      : { mismatch: true };
  }

  // Método para cambiar la contraseña
  onSubmit() {
    if (this.changePasswordForm.valid) {
      const newPassword = this.changePasswordForm.value.newPassword;

      // Enviar solicitud al backend
      this.http.post('URL_DE_TU_BACKEND/reset-password', { token: this.token, new_password: newPassword }).subscribe({
        next: (response: any) => {
          this.message = response.message;
          this.error = null;
          this.router.navigate(['/login']); // Redirigir al login
        },
        error: (err) => {
          this.error = err.error.message || 'Ocurrió un error al cambiar la contraseña';
          this.message = null;
        }
      });
    }
  }
}
