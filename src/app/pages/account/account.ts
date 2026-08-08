import { Component, inject, signal, effect, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { WishlistService } from '../../services/wishlist.service';
import { ProductService } from '../../services/product.service';

interface Order {
  id: number;
  total: number;
  status: string;
  createdAt: string;
  itemCount: number;
}

@Component({
  selector: 'app-account',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {
  authService = inject(AuthService);
  wishlistService = inject(WishlistService);
  productService = inject(ProductService);
  private router = inject(Router);
  private http = inject(HttpClient);

  firstName = signal('');
  lastName = signal('');
  email = signal('');
  phone = signal('');
  orders = signal<Order[]>([]);

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.firstName.set(user.firstName);
        this.lastName.set(user.lastName);
        this.email.set(user.email);
        this.phone.set(user.phone);
        this.loadOrders();
      }
    });
  }

  loadOrders() {
    this.http.get<Order[]>('http://localhost/toy-wars-api/get_orders.php').subscribe({
      next: (orders) => this.orders.set(orders),
      error: () => this.orders.set([])
    });
  }

  statusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: 'Pendiente',
      transit: 'En tránsito',
      delivered: 'Entregado'
    };
    return labels[status] ?? status;
  }
  

wishedProducts = computed(() =>
    this.productService.products().filter(p =>
      this.wishlistService.isInWishlist(p.id)
    )
  );

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.setCurrentUser(null);
        this.router.navigateByUrl('/login');
      }
    });
  }
}