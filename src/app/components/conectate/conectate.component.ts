import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Notyf } from 'notyf';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { CaptchaService } from '../../services/captcha/captcha.service';
import { passwordsMatchValidator } from '../../validators/password.matchs.validator';

// Variables globales
declare var grecaptcha: any;

// TODO: Informacion de componente
@Component({
  selector: 'app-conectate',
  templateUrl: './conectate.component.html',
  styleUrls: ['./conectate.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [AuthService, WebsocketService, CaptchaService],
})
export class ConectateComponent implements OnInit, OnDestroy {
  // Declaracion de variables
  private notyf!: Notyf;

    registerForm: FormGroup;
  loginForm: FormGroup;

  passwordStrength: string = "";

  showRegister: boolean = true;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private webSocketService: WebsocketService,
    private captchaService: CaptchaService,
  ) {
    // Inicializacion de formularios

    // Validacion de entradas de registro
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordsMatchValidator() }
    );

    // Validacion de entradas de login
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // Condicion para reparacion de error NO TOCAR
    if (typeof document !== 'undefined') {
      this.notyf = new Notyf();
    }
  }

  // Inicializador de componentes
  ngOnInit(): void {
    // Conexion a socket
    this.webSocketService.connect();

    // Evaluar la fuerza de contraseña
    this.registerForm.get('password')?.valueChanges.subscribe((password) => {
      this.passwordStrength = this.evaluatePasswordStrength(password);
    });

    // Recargar el captcha
    this.captchaService.renderReCaptcha();
  }

  ngOnDestroy(): void {
    this.webSocketService.discconect();
  }

  // Maneja el envío del formulario de registro
  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      const { username, password, email } = this.registerForm.value;

      const userData = {
        username: username,
        password: password,
        email: email,
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.notyf.success({
            message: `${response.message}`,
            duration: 5000,
          });

          this.webSocketService.onEmailVerified().subscribe({
            next: (response) => {

              if (document.hidden) {
                window.focus();
              }

              this.notyf.success({
                message: response,
                duration: 5000,
              });

              console.log(response);
            },
            error: (err) => {
              this.notyf.error({
                message: `${err.message}`,
                duration: 5000,
              });
            },
          });
        },
        error: (err) => {
          this.notyf.error({
            message: `${err.message}`,
            duration: 5000,
          });
        },
      });
    }
  }

  // Maneja el envío del formulario de inicio de sesión
  onLoginSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      const userData = {
        username: username,
        password: password
      }

      this.authService.login(userData).subscribe({
        next: (response) => {
          this.notyf.success({
            message: response.message,
            duration: 5000,
          });
        },
        error: (err) => {
          this.notyf.error({
            message: `${err.message}`,
            duration: 5000,
          });
        }
      })
    }
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
