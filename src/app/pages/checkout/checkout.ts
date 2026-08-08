import { Component, inject, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  cartService = inject(CartService);
  private router = inject(Router);
  private http = inject(HttpClient);

  firstName = signal('');
  lastName = signal('');
  email = signal('');
  phone = signal('');
  street = signal('');
  neighborhood = signal('');
  city = signal('');
  state = signal('');
  zip = signal('');
  country = signal('México');
  reference = signal('');
  paymentMethod = signal('paypal');
  acceptedTerms = signal(false);
  wantsNewsletter = signal(false);
  submitting = signal(false);
  errorMessage = signal('');

  shippingCost = 250.00;

  subtotal = computed(() => this.cartService.cartTotal());
  total = computed(() => this.subtotal() + this.shippingCost);

  canSubmit = computed(() =>
    this.cartService.cartItems().length > 0 &&
    this.acceptedTerms() &&
    this.firstName().trim() !== '' &&
    this.lastName().trim() !== '' &&
    this.email().trim() !== '' &&
    this.street().trim() !== '' &&
    this.city().trim() !== ''
  );

  setPaymentMethod(method: string) {
    this.paymentMethod.set(method);
  }

  confirmOrder() {
    if (!this.canSubmit()) return;

    this.submitting.set(true);
    this.errorMessage.set('');

    const payload = {
      contact: { firstName: this.firstName(), lastName: this.lastName(), email: this.email(), phone: this.phone() },
      address: { street: this.street(), neighborhood: this.neighborhood(), city: this.city(), state: this.state(), zip: this.zip(), country: this.country(), reference: this.reference() },
      paymentMethod: this.paymentMethod(),
      items: this.cartService.cartItems(),
      subtotal: this.subtotal(),
      shippingCost: this.shippingCost,
      total: this.total()
    };

    this.http.post<{ success: boolean; orderId: number }>('http://localhost/toy-wars-api/create_order.php', payload).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.submitting.set(false);
        this.router.navigateByUrl('/account');
      },
      error: (err) => {
        this.submitting.set(false);
        this.errorMessage.set(err.error?.error ?? 'Ocurrió un error al procesar tu pedido.');
      }
    });
  }
}