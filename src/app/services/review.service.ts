import { Injectable, signal } from '@angular/core';

export interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews = signal<Review[]>([
    { id: 1, productId: 1, author: 'Lorem Ipsum', rating: 5, comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatem.' },
    { id: 2, productId: 1, author: 'Lorem Ipsum', rating: 4, comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatem.' },
  ]);

  all = this.reviews.asReadonly();

  add(productId: number, author: string, rating: number, comment: string) {
    const newReview: Review = {
      id: Date.now(),
      productId,
      author,
      rating,
      comment
    };
    this.reviews.update(current => [...current, newReview]);
  }
}