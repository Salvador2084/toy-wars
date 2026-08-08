import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private http = inject(HttpClient);

  newsletterEmail = signal('');
  subscribed = signal(false);
  subscribing = signal(false);

  subscribe() {
    if (!this.newsletterEmail().trim()) return;

    this.subscribing.set(true);
    this.http.post('http://localhost/toy-wars-api/subscribe.php', { email: this.newsletterEmail().trim() }).subscribe({
      next: () => {
        this.subscribing.set(false);
        this.subscribed.set(true);
        this.newsletterEmail.set('');
      },
      error: () => this.subscribing.set(false)
    });
  }
}