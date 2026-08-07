import { Component, inject, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-product',
  imports: [RouterLink, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {
  private route = inject(ActivatedRoute);
  productService = inject(ProductService);
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);
  reviewService = inject(ReviewService);

  productId = Number(this.route.snapshot.paramMap.get('id'));

  product = computed(() => this.productService.getById(this.productId));

  relatedProducts = computed(() =>
    this.productService.products()
      .filter(p => p.franchise === this.product()?.franchise && p.id !== this.productId)
      .slice(0, 4)
  );

  productReviews = computed(() =>
    this.reviewService.all().filter(r => r.productId === this.productId)
  );

  get discountPercent(): number | null {
    const p = this.product();
    if (!p?.oldPrice) return null;
    return Math.round((1 - p.price / p.oldPrice) * 100);
  }

  reviewAuthor = signal('');
  reviewRating = signal(5);
  reviewComment = signal('');

  setRating(value: number) {
    this.reviewRating.set(value);
  }

  submitReview() {
    if (!this.reviewAuthor().trim() || !this.reviewComment().trim()) return;

    this.reviewService.add(
      this.productId,
      this.reviewAuthor().trim(),
      this.reviewRating(),
      this.reviewComment().trim()
    );

    this.reviewAuthor.set('');
    this.reviewRating.set(5);
    this.reviewComment.set('');
  }

  addToCart() {
    const p = this.product();
    if (!p) return;
    this.cartService.addItem(p);
  }

  toggleWishlist() {
    const p = this.product();
    if (!p) return;
    this.wishlistService.toggle(p.id);
  }
}