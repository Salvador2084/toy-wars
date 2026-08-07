import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  firstName = signal('');
  lastName = signal('');
  email = signal('');
  phone = signal('');
  password = signal('');
  confirmPassword = signal('');
  errorMessage = signal('');
  loading = signal(false);

  submit() {
    if (!this.firstName().trim() || !this.lastName().trim() || !this.email().trim() || !this.password().trim()) {
      this.errorMessage.set('Completa todos los campos obligatorios.');
      return;
    }

    if (this.password() !== this.confirmPassword()) {
      this.errorMessage.set('Las contraseñas no coinciden.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.register(
      this.firstName().trim(),
      this.lastName().trim(),
      this.email().trim(),
      this.password(),
      this.phone().trim()
    ).subscribe({
      next: (user) => {
        this.authService.setCurrentUser(user);
        this.loading.set(false);
        this.router.navigateByUrl('/account');
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.error ?? 'Ocurrió un error al crear la cuenta.');
      }
    });
  }
}