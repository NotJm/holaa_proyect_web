import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { config } from '../../../config';

// TODO: Declaracion de variable
declare var grecaptcha: any;

// TODO: Informacion de componente
@Component({
  selector: 'app-conectate',
  templateUrl: './conectate.component.html',
  styleUrls: ['./conectate.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class ConectateComponent implements OnInit {
  // TODO: Declaracion de variables
  registerForm: FormGroup;
  loginForm: FormGroup;

  recaptchaToken: string | null = null;
  passwordStrength = ''; 

  showRegister = true;
  recaptchaRendered = false; 

  constructor(private fb: FormBuilder) {
    // TODO: Inicializacion de formularios    
    this.registerForm = this.fb.group(
      {
        // TODO: Validacion de entradas
        username: ['', Validators.required, Validators.minLength(6)],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator() }
    );

    this.loginForm = this.fb.group({
      // TODO: Validacion de entradas en login
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  // TODO: Inicializador de componentes
  ngOnInit(): void {
    // TODO: Evaluar la fuersa de la contraseña
    this.registerForm.get('password')?.valueChanges.subscribe((value) => {
      this.passwordStrength = this.evaluatePasswordStrength(value || '');
    });

    //TODO: Recargar captcha
    this.loadRecaptcha();
  }

  // TODO: Cargar Captcha
  private loadRecaptcha(): void {
    setTimeout(() => {
      if (typeof grecaptcha !== 'undefined') {
        grecaptcha.render('recaptcha-container', {
          sitekey: config.GOOGLE_KEY,
          callback: (response: string) => this.onCaptchaResolved(response),
        });
      }
    }, 500);
  }

  // TODO: Token de Captcha
  private onCaptchaResolved(token: string): void { this.recaptchaToken = token; }

  // TODO: Cambio de formulario
  changeForm(state: boolean): void {
    console.log(`Estado recibido: ${state}`);
    if (state) {
      this.showRegister = true;
      console.log("Cambio a registro");
    } else {
      this.showRegister = false
      console.log("Cambio a login");
    }
  }

  // Maneja el envío del formulario de registro
  onRegisterSubmit() {
    if (this.registerForm.valid) {
      console.log('Registro exitoso:', this.registerForm.value);
    }
  }

  // Maneja el envío del formulario de inicio de sesión
  onLoginSubmit() {
    if (this.loginForm.valid) {
      console.log('Inicio de sesión exitoso:', this.loginForm.value);
    }
  }


  //TODO: Valida que las contraseñas coincidan
  private passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordsMismatch: true };
    };
  }

  getPasswordIcon(): string {
    switch (this.passwordStrength) {
      case 'weak':
        return 'fa-solid fa-times-circle text-red-500'; // Ícono rojo para débil
      case 'medium':
        return 'fa-solid fa-exclamation-circle text-yellow-500'; // Ícono amarillo para media
      case 'strong':
        return 'fa-solid fa-check-circle text-green-500'; // Ícono verde para fuerte
      default:
        return ''; // Sin ícono si no hay evaluación
    }
  }

  // Evalúa la fortaleza de la contraseña ingresada
  private evaluatePasswordStrength(password: string): string {
    let strength = 0;

    if (password.length >= 6) strength++; // Longitud mínima
    if (/[A-Z]/.test(password)) strength++; // Al menos una mayúscula
    if (/[0-9]/.test(password)) strength++; // Al menos un número
    if (/[^A-Za-z0-9]/.test(password)) strength++; // Al menos un carácter especial

    // Devuelve la fortaleza según el puntaje
    switch (strength) {
      case 0:
      case 1:
        return 'weak'; // Débil
      case 2:
        return 'medium'; // Media
      case 3:
      case 4:
        return 'strong'; // Fuerte
      default:
        return '';
    }
  }
}
