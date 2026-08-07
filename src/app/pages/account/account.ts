import { Component, inject, signal, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account',
  imports: [RouterLink, FormsModule],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {
  authService = inject(AuthService);
  private router = inject(Router);

  firstName = signal('');
  lastName = signal('');
  email = signal('');
  phone = signal('');

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.firstName.set(user.firstName);
        this.lastName.set(user.lastName);
        this.email.set(user.email);
        this.phone.set(user.phone);
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.setCurrentUser(null);
        this.router.navigateByUrl('/login');
      }
    });
  }
}