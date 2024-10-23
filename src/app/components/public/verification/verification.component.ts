import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notyf } from 'notyf';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css',
})
export class VerificationComponent implements OnInit {
  // Declaracion de variables
  private notyf!: Notyf;

  otpForm: FormGroup;

  email!: Signal<string>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly dataService: DataService,
    private readonly notificationService: NotificationService
  ) {
    this.otpForm = this.fb.group({
      otp1: ['', [Validators.required, Validators.maxLength(1)]],
      otp2: ['', [Validators.required, Validators.maxLength(1)]],
      otp3: ['', [Validators.required, Validators.maxLength(1)]],
      otp4: ['', [Validators.required, Validators.maxLength(1)]],
      otp5: ['', [Validators.required, Validators.maxLength(1)]],
      otp6: ['', [Validators.required, Validators.maxLength(1)]]
    })

    if (typeof document !== 'undefined') {
      this.notyf = new Notyf();
    }
  }

  ngOnInit(): void { this.email = this.dataService.getEmail(); }

  onSubmit(): void {
    if (this.otpForm.valid) {
      const otp = Object.values(this.otpForm.value).join('');
      
      const otpData = {
        email: this.email(),
        otp: otp
      }

      this.authService.verify_otp(otpData).subscribe({
        next: (response) => {
          this.notificationService.success(response.message);

          this.router.navigate(['auth/login']);
          
        },
        error: (err) => {
          this.notificationService.error(err.message);
        }
      })

      
    }
  }

  moveToNextField(event: any, nextInputId: string): void {
    if (event.target.value.length === 1 && nextInputId) {
      const nextInput = document.getElementById(nextInputId);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
}
