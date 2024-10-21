import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notyf } from 'notyf';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data/data.service';

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
    private fb: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
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
          this.notyf.success({
            message: `${response.message}`,
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

  moveToNextField(event: any, nextInputId: string): void {
    if (event.target.value.length === 1 && nextInputId) {
      const nextInput = document.getElementById(nextInputId);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
}
