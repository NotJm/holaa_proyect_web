import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  

// Declarar una interfaz que describe el método render del reCAPTCHA
interface Grecaptcha {
  render: (container: string, parameters: object) => void;
}

@Component({
  selector: 'app-conectate',
  templateUrl: './conectate.component.html',
  styleUrls: ['./conectate.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ConectateComponent implements AfterViewInit {
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

  // Usar ngAfterViewInit para asegurar que la vista esté lista antes de intentar renderizar el reCAPTCHA
  ngAfterViewInit() {
    const grecaptcha: Grecaptcha | undefined = (window as any)['grecaptcha'];
    if (grecaptcha) {
      grecaptcha.render('recaptcha-container', {
        sitekey: '6LcEH18qAAAAAIORRKnwSzz3FxwVcmVR48Tfj7cX',
        callback: (response: string) => this.resolved(response)
      });
    }
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

  resolved(token: string | null) {
    if (token) {
      console.log('Token reCAPTCHA:', token);
    } else {
      console.error('No se obtuvo token del reCAPTCHA.');
    }
  }
}
