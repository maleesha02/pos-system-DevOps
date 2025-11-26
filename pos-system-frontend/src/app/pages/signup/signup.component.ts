import {Component, inject} from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel, MatPrefix} from '@angular/material/form-field';
import {NgIf} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-signup',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatFormField,
    MatPrefix,
    MatError,
    MatLabel,
    NgIf,
    MatCheckbox,
    MatButton,
    MatIconButton,
    MatInput,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;


  form = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z\s]+$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ]),
    acceptTerms: new FormControl(false, [
      Validators.requiredTrue
    ])
    // @ts-ignore
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  signup() {
    if (this.form.valid) {
      this.isLoading = true;
      const fullName = this.form.value.fullName!;
      const email = this.form.value.email!;
      const password = this.form.value.password!;

      this.authService.signup(fullName, email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Signup successful:', response.message);
          alert('Account created successfully! Please login.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Signup failed:', error);

          if (error.status === 409) {
            alert('User already exists with this email.');
          } else if (error.status === 500) {
            alert('Server error. Please try again later.');
          } else {
            alert('Signup failed. Please try again.');
          }
        }
      });
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
