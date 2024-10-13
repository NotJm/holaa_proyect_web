import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-conectate',
  templateUrl: './conectate.component.html',
  styleUrls: ['./conectate.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]  // Asegúrate de incluir CommonModule
})
export class ConectateComponent {
  showRegister = true;

  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  showRegisterForm() {
    this.showRegister = true;
  }

  showLoginForm() {
    this.showRegister = false;
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      console.log('Registro exitoso:', this.registerForm.value);
    }
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      console.log('Inicio de sesión exitoso:', this.loginForm.value);
    }
  }
}
