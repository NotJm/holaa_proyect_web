import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-olvidar-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Aquí importa ReactiveFormsModule
  templateUrl: './olvidar-password.component.html',
  styleUrls: ['./olvidar-password.component.css']
})
export class OlvidarPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Definir el formulario reactivo
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]] // Validación de email
    });
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;

      // Enviar solicitud al backend
      this.http.post('URL_DE_TU_BACKEND/forgot-password', { email }).subscribe({
        next: (response: any) => {
          this.message = response.message;
          this.error = null;
          // Redirigir al componente de verificación de OTP
          this.router.navigate(['/verificar-otp'], { queryParams: { email } });
        },
        error: (err) => {
          this.error = err.error.message || 'Ocurrió un error';
          this.message = null;
        }
      });
    }
  }
}
