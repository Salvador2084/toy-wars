import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private items = signal<number[]>([]);

  wishlist = this.items.asReadonly();

  toggle(productId: number) {
    this.items.update(current =>
      current.includes(productId)
        ? current.filter(id => id !== productId)
        : [...current, productId]
    );
  }

  isInWishlist(productId: number): boolean {
    return this.items().includes(productId);
  }
}