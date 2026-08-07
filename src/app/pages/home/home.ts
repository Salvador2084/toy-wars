import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  productService = inject(ProductService);

  featuredProducts = computed(() =>
    this.productService.products().slice(0, 4)
  );

  offerProducts = computed(() =>
    this.productService.products().filter(p => p.oldPrice)
  );

  discountPercent(price: number, oldPrice: number): number {
    return Math.round((1 - price / oldPrice) * 100);
  }
}