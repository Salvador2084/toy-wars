import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  errorMessage = signal('');
  loading = signal(false);

  submit() {
    if (!this.email().trim() || !this.password().trim()) {
      this.errorMessage.set('Completa correo y contraseña.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.login(this.email().trim(), this.password()).subscribe({
      next: (user) => {
        this.authService.setCurrentUser(user);
        this.loading.set(false);
        this.router.navigateByUrl('/account');
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.error ?? 'Ocurrió un error al iniciar sesión.');
      }
    });
  }
}