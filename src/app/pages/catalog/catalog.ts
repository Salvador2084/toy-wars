import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-catalog',
  imports: [RouterLink, FormsModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog {
  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  productService = inject(ProductService);

  selectedFranchise = signal('Todos');
  selectedScale = signal('Todos');
  searchText = signal('');
  sortBy = signal('');
  searchValue = '';

  filteredProducts = computed(() => {
    let result = this.productService.products().filter(p => {
      const franchiseMatch = this.selectedFranchise() === 'Todos' || p.franchise === this.selectedFranchise();
      const scaleMatch = this.selectedScale() === 'Todos' || p.scale === this.selectedScale();
      const searchMatch = p.name.toLowerCase().includes(this.searchText().toLowerCase()) ||
                          p.franchise.toLowerCase().includes(this.searchText().toLowerCase()) ||
                          p.brand.toLowerCase().includes(this.searchText().toLowerCase());
      return franchiseMatch && scaleMatch && searchMatch;
    });

    switch (this.sortBy()) {
      case 'price-asc': return result.sort((a, b) => a.price - b.price);
      case 'price-desc': return result.sort((a, b) => b.price - a.price);
      case 'name-asc': return result.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc': return result.sort((a, b) => b.name.localeCompare(a.name));
      default: return result;
    }
  });

  setFranchise(franchise: string) {
    this.selectedFranchise.set(franchise);
  }

  setScale(scale: string) {
    this.selectedScale.set(scale);
  }

  setSearch(value: string) {
    this.searchText.set(value);
  }

  setSort(value: string) {
    this.sortBy.set(value);
  }
}