import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  name: string;
  franchise: string;
  scale: string;
  brand: string;
  price: number;
  oldPrice?: number | null;
  stock: number;
  material: string;
  year: number;
  height: string;
  description: string;
  images: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost/toy-wars-api';

  private productsSignal = signal<Product[]>([]);
  products = this.productsSignal.asReadonly();

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<Product[]>(`${this.apiUrl}/get_products.php`).subscribe({
      next: (data) => this.productsSignal.set(data),
      error: (err) => console.error('Error cargando productos', err)
    });
  }

  getById(id: number): Product | undefined {
    return this.productsSignal().find(p => p.id === id);
  }
}