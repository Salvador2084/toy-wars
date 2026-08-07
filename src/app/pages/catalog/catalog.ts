import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

interface Product {
  id: number;
  name: string;
  franchise: string;
  scale: string;
  brand: string;
  price: number;
}

@Component({
  selector: 'app-catalog',
  imports: [RouterLink, FormsModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog {
  cartService = inject(CartService);

  selectedFranchise = signal('Todos');
  selectedScale = signal('Todos');
  searchText = signal('');
  sortBy = signal('');
  searchValue = '';

  products: Product[] = [
    { id: 1, name: 'Lorem ipsum dolor', franchise: 'Star Wars', scale: '1:6', brand: 'Hot Toys', price: 999.99 },
    { id: 2, name: 'Lorem ipsum dolor', franchise: 'Warhammer', scale: '1:18', brand: 'Sideshow', price: 749.99 },
    { id: 3, name: 'Lorem ipsum dolor', franchise: 'Anime', scale: '1:8', brand: 'Bandai', price: 1299.99 },
    { id: 4, name: 'Lorem ipsum dolor', franchise: 'Halo', scale: '1:6', brand: 'McFarlane', price: 1099.99 },
    { id: 5, name: 'Lorem ipsum dolor', franchise: 'Transformers', scale: '1:12', brand: 'Hasbro', price: 849.99 },
    { id: 6, name: 'Lorem ipsum dolor', franchise: 'Star Trek', scale: '1:6', brand: 'NECA', price: 1199.99 },
    { id: 7, name: 'Lorem ipsum dolor', franchise: 'Star Wars', scale: '1:8', brand: 'Hot Toys', price: 899.99 },
    { id: 8, name: 'Lorem ipsum dolor', franchise: 'Anime', scale: '1:18', brand: 'Bandai', price: 649.99 },
  ];

  filteredProducts = computed(() => {
    let result = this.products.filter(p => {
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