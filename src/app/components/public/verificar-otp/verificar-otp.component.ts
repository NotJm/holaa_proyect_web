import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-verificar-otp',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],  // Importar ReactiveFormsModule aquí
  templateUrl: './verificar-otp.component.html',
  styleUrls: ['./verificar-otp.component.css']
})
export class VerificarOtpComponent {
  otpForm: FormGroup;
  email: string = '';
  message: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Obtener el email desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });

    // Definir el formulario reactivo para el OTP
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  // Método para enviar el OTP al backend
  onSubmit() {
    if (this.otpForm.valid) {
      const otp = this.otpForm.value.otp;

      // Enviar solicitud al backend
      this.http.post('URL_DE_TU_BACKEND/verificar-otp', { email: this.email, otp }).subscribe({
        next: (response: any) => {
          this.message = response.message;
          this.error = null;
          // Redirigir al componente para cambiar la contraseña
          this.router.navigate(['/cambiar-password'], { queryParams: { token: response.token } });
        },
        error: (err) => {
          this.error = err.error.message || 'OTP incorrecto o expirado';
          this.message = null;
        }
      });
    }
  }
}
