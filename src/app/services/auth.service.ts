import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost/toy-wars-api';

  private currentUserSignal = signal<User | null>(null);
  currentUser = this.currentUserSignal.asReadonly();

  private checkedSignal = signal(false);
  checked = this.checkedSignal.asReadonly();

  constructor() {
    this.checkSession();
  }

  checkSession() {
    this.http.get<User>(`${this.apiUrl}/me.php`).subscribe({
      next: (user) => {
        this.currentUserSignal.set(user);
        this.checkedSignal.set(true);
      },
      error: () => {
        this.currentUserSignal.set(null);
        this.checkedSignal.set(true);
      }
    });
  }

  register(firstName: string, lastName: string, email: string, password: string, phone: string) {
    return this.http.post<User>(`${this.apiUrl}/register.php`, {
      firstName, lastName, email, password, phone
    });
  }

  login(email: string, password: string) {
    return this.http.post<User>(`${this.apiUrl}/login.php`, { email, password });
  }

  logout() {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/logout.php`, {});
  }

  setCurrentUser(user: User | null) {
    this.currentUserSignal.set(user);
  }
}