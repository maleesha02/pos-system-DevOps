import {Component, inject} from '@angular/core';
import {MatInput} from '@angular/material/input';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {CookieManagerService} from '../../services/cookie-manager.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private authService = inject(AuthService);
  private cookieManager = inject(CookieManagerService);
  private router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  login() {
    if (this.form.valid) {
      const email = this.form.value.email;
      const password = this.form.value.password;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          // Store token in cookie
          this.cookieManager.setToken(response.token, 'token');

          // Optional: Show success message
          console.log('Login successful:', response.message);

          // Redirect to dashboard or home page
          this.router.navigate(['/dashboard/customers']); // Change to your desired route
        },
        error: (error) => {
          // Handle error
          console.error('Login failed:', error);

          // Optional: Show error message to user
          if (error.status === 404) {
            alert('User not found. Please check your email.');
          } else if (error.status === 401) {
            alert('Invalid password. Please try again.');
          } else {
            alert('Login failed. Please try again later.');
          }
        }
      });
    }
  }

}
