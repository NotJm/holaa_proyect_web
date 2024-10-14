import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Declaración de la interfaz de reCAPTCHA
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
export class ConectateComponent implements OnInit, AfterViewInit, AfterViewChecked {
  showRegister = true; // Controla qué formulario se muestra
  registerForm: FormGroup; // Formulario de registro
  loginForm: FormGroup; // Formulario de inicio de sesión
  passwordStrength = ''; // Variable para la fortaleza de la contraseña
  recaptchaRendered = false; // Control del estado del reCAPTCHA

  constructor(private fb: FormBuilder) {
    // Inicializamos los formularios
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator() });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Suscripción a los cambios en el campo de contraseña
    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.passwordStrength = this.evaluatePasswordStrength(value || '');
      console.log('Fortaleza de la contraseña:', this.passwordStrength); // Verificar en consola
    });
  }

  // Se ejecuta después de que la vista ha sido inicializada
  ngAfterViewInit() {
    this.renderRecaptcha();
  }

  // Re-renderiza reCAPTCHA si es necesario
  ngAfterViewChecked() {
    if (this.showRegister && !this.recaptchaRendered) {
      this.renderRecaptcha();
    }
  }

  // Renderiza el reCAPTCHA
  renderRecaptcha() {
    const grecaptcha: Grecaptcha | undefined = (window as any)['grecaptcha'];
    if (grecaptcha) {
      grecaptcha.render('recaptcha-container', {
        sitekey: '6LcEH18qAAAAAIORRKnwSzz3FxwVcmVR48Tfj7cX',
        callback: (response: string) => this.resolved(response)
      });
      this.recaptchaRendered = true;
    }
  }

  // Cambia al formulario de registro
  showRegisterForm() {
    this.showRegister = true;
    this.recaptchaRendered = false;
  }

  // Cambia al formulario de inicio de sesión
  showLoginForm() {
    this.showRegister = false;
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

  // Callback del reCAPTCHA
  resolved(token: string | null) {
    if (token) {
      console.log('Token reCAPTCHA:', token);
    } else {
      console.error('No se obtuvo token del reCAPTCHA.');
    }
  }

  // Valida que las contraseñas coincidan
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
