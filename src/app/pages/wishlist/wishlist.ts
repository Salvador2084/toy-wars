import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist {
  wishlistService = inject(WishlistService);
  productService = inject(ProductService);
  cartService = inject(CartService);

  wishedProducts = computed(() =>
    this.productService.products().filter(p =>
      this.wishlistService.isInWishlist(p.id)
    )
  );
}