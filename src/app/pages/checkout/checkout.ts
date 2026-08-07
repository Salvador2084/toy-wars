import { Component, inject, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
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

  // Datos de contacto
  firstName = signal('');
  lastName = signal('');
  email = signal('');
  phone = signal('');

  // Dirección
  street = signal('');
  neighborhood = signal('');
  city = signal('');
  state = signal('');
  zip = signal('');
  country = signal('México');
  reference = signal('');

  // Pago y confirmación
  paymentMethod = signal('paypal');
  acceptedTerms = signal(false);
  wantsNewsletter = signal(false);

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

    // TODO: aquí se conectará el endpoint PHP para guardar la orden (create_order.php)
    console.log('Orden confirmada', {
      contact: { firstName: this.firstName(), lastName: this.lastName(), email: this.email(), phone: this.phone() },
      address: { street: this.street(), neighborhood: this.neighborhood(), city: this.city(), state: this.state(), zip: this.zip(), country: this.country(), reference: this.reference() },
      paymentMethod: this.paymentMethod(),
      newsletter: this.wantsNewsletter(),
      items: this.cartService.cartItems(),
      total: this.total()
    });

    this.cartService.clearCart();
    this.router.navigateByUrl('/');
  }
}