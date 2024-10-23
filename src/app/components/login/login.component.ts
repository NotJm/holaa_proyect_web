import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  // providers: [StorageService]
})
export class LoginComponent {

  loginForm: FormGroup;

  isPasswordVisible: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router, 
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly cookieService: CookieService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      const loginData = { 
        username: username,
        password: password,
      }

      this.authService.login(loginData).subscribe({
        next: (response) => {

          this.notificationService.success(response.message);

          this.cookieService.set('token', response.token);

          this.router.navigate(['/']);

        },
        error: (err) => {
          this.notificationService.error(err.message);
        }
      })
    }
  }

  togglePasswordVisible(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  getPasswordFieldType(): string {
    return this.isPasswordVisible ? 'text' : 'password';
  }

  getPasswordIconEye(): string {
    return this.isPasswordVisible
      ? 'icon-[mdi--eye-closed]'
      : 'icon-[mdi--eye]';
  }
}
