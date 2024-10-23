import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
  providers: [AuthService]
})
export class LoginAdminComponent {

  loginForm: FormGroup;
  isPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const loginData = { username, password };

      this.authService.login(loginData).subscribe({
        next: (response) => {
          this.notificationService.success(response.message);
          this.router.navigate(['/admin-dashboard']); // Redirigir a un dashboard admin si es necesario
        },
        error: (err) => {
          this.notificationService.error(err.message);
        }
      });
    }
  }

  togglePasswordVisible(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  getPasswordFieldType(): string {
    return this.isPasswordVisible ? 'text' : 'password';
  }

  getPasswordIconEye(): string {
    return this.isPasswordVisible ? 'icon-[mdi--eye-closed]' : 'icon-[mdi--eye]';
  }
}
