import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  franchise: string;
  scale: string;
  brand: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items = signal<CartItem[]>([]);

  cartItems = computed(() => this.items());
  cartCount = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));
  cartTotal = computed(() => this.items().reduce((total, item) => total + (item.price * item.quantity), 0));

  addItem(item: Omit<CartItem, 'quantity'>) {
    const current = this.items();
    const existing = current.find(i => i.id === item.id);
    if (existing) {
      this.items.set(current.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      this.items.set([...current, { ...item, quantity: 1 }]);
    }
  }

  removeItem(id: number) {
    this.items.set(this.items().filter(i => i.id !== id));
  }

  updateQuantity(id: number, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(id);
      return;
    }
    this.items.set(this.items().map(i => i.id === id ? { ...i, quantity } : i));
  }

  clearCart() {
    this.items.set([]);
  }

}