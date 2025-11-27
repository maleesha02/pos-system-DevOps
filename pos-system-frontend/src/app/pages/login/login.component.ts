import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieManagerService } from '../../services/cookie-manager.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private authService = inject(AuthService);
  private cookieManager = inject(CookieManagerService);
  private router = inject(Router);

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
  });

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.value.email!;
    const password = this.form.value.password!;

    this.authService.login(email, password).subscribe({
      next: (response) => {

        this.cookieManager.setToken(response.token, 'token');
        console.log('Login successful:', response.message);

        this.router.navigate(['/dashboard/customers']);
      },

      error: (error) => {
        console.error('Login failed:', error);

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
