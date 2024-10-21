import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { AuthService } from '../../services/auth/auth.service';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { CaptchaService } from '../../services/captcha/captcha.service';
import { passwordsMatchValidator } from '../../validators/password.matchs.validator';
import { DataService } from '../../services/data/data.service';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { passwordStrengthValidator } from '../../validators/password.strength.validator';
import {
  hasCapitalLetter,
  hasNumber,
  hasNoSpaces,
  hasSpecialCharacter,
  isValidLength,
} from '../../helpers/password.helpers';
import { NotificationService } from  '../../services/notification/notification.service';

// TODO: Informacion de componente
@Component({
  selector: 'app-conectate',
  templateUrl: './conectate.component.html',
  styleUrls: ['./conectate.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TooltipModule, InputTextModule],
  providers: [
    AuthService,
    WebsocketService,
    CaptchaService,
    NotificationService,
  ],
})
export class ConectateComponent implements OnInit {
  registerForm: FormGroup;

  passwordStrength: string = '';

  showTooltip: boolean = false;

  isPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private captchaService: CaptchaService,
    private dataService: DataService,
    private notificationService: NotificationService
  ) {
    // Validacion de entradas de registro
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          passwordStrengthValidator(),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatchValidator() }
  );

    // Evaluar la fuerza de contraseña
    this.registerForm.get('password')?.statusChanges.subscribe((password) => {
      const errors = this.registerForm.get('password')?.errors;

      if (errors?.['passwordStrength'] === 'weak') {
        this.passwordStrength = 'weak';
      } else if (errors?.['passwordStrength'] === 'medium') {
        this.passwordStrength = 'medium';
      } else if (errors?.['passwordStrength'] === 'strong') {
        this.passwordStrength = 'strong';
      } else {
        this.passwordStrength = ''; // Resetear si no hay errores
      }
    });
  }
  
  ngOnInit(): void {
    this.captchaService.renderReCaptcha();
  }

  // Maneja el envío del formulario de registro
  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, password, email } = this.registerForm.value;

      const userData = {
        username: username,
        password: password,
        email: email,
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.notificationService.success(response.message);

          this.dataService.setEmail(email);

          setTimeout(() => {
            this.router.navigate(['auth/verify/otp']);
          }, 5000);
        },
        error: (err) => {
          this.notificationService.error(err.message);
        },
      });
    } else {
      this.showFormErrors();
    }
  }

  // Maneja el estado del control, si esta bien o mal
  getClassStatusControl(idControl: string): any {
    const control = this.registerForm.get(idControl);

    if (!control) {
      return {};
    }

    return {
      'border-red-500 focus:ring-red-500 focus:border-red-500':
        control.invalid && control.dirty,
      'border-green-500 focus:ring-green-500 focus:border-green-500':
        control.valid && control.dirty,
    };
  }

  getStatusControl(idControl: string): boolean {
    const control = this.registerForm.get(idControl);

    if (!control) {
      return false;
    }

    return control.invalid && control.dirty ? true : false;
  }


  // Obtener el icono de la fortaleza de la contraseña
  getPasswordClasses(): { icon: string; border: string } {
    const classes = {
      weak: {
        icon: 'icon-[icon-park-solid--error] w-6 h-6 text-red-500',
        border: 'border-red-500 focus:ring-red-500 focus:border-red-500',
      },
      medium: {
        icon: 'icon-[material-symbols--warning] w-6 h-6 text-yellow-500',
        border:
          'border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500',
      },
      strong: {
        icon: 'icon-[mdi--check-circle] w-6 h-6 text-green-500',
        border: 'border-green-500 focus:ring-green-500 focus:border-green-500',
      },
    };

    const strength = this.passwordStrength as 'weak' | 'medium' | 'strong';

    if (!['weak', 'medium', 'strong'].includes(strength)) {
      return { icon: '', border: '' };
    }

    return classes[strength];
  }

  togglePasswordVisible(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Método para obtener el tipo de input (password o text)
  getPasswordFieldType(): string {
    return this.isPasswordVisible ? 'text' : 'password';
  }

  // Método para obtener el ícono dependiendo del estado
  getPasswordIconEye(): string {
    return this.isPasswordVisible
      ? 'icon-[mdi--eye-closed]'
      : 'icon-[mdi--eye]';
  }

  hasCapitalLetter(): boolean {
    const password = this.registerForm.get('password')?.value;
    return hasCapitalLetter(password);
  }

  hasNumber(): boolean {
    const password = this.registerForm.get('password')?.value;
    return hasNumber(password);
  }

  hasNoSpaces(): boolean {
    const password = this.registerForm.get('password')?.value;
    return hasNoSpaces(password);
  }

  hasSpecialCharacter(): boolean {
    const password = this.registerForm.get('password')?.value;
    return hasSpecialCharacter(password);
  }

  isValidLength(): boolean | string {
    const password = this.registerForm.get('password')?.value;
    return isValidLength(password);
  }

  passwordsMatch(): boolean {
    const errors = this.registerForm.errors;
    return errors?.['passwordsMismatch'] ? false : true;
  }

  onCaptchaResolved(token: string): void {
    this.registerForm.get('recaptcha')?.setValue(token);
  }

  showFormErrors(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const controlErrors = this.registerForm.get(key)?.errors;
      if (controlErrors) {
        console.log(`Errores en el campo ${key}:`, controlErrors);
      }
    });
  
    this.notificationService.error(
      "Por favor, ingrese los campos faltantes o corrija los errores"
    );
  }
}
