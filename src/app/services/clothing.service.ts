// src/app/clothing.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ClothingItem {
  _id?: string;
  name: string;
  category: string;
  size: string;
  color: string;
  price: number;
  brand: string;
  reviews?: Review[];
}

export interface Review {
  username: string;
  rating: number;
  comment: string;
  postedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ClothingService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get all clothing items
  getClothingItems(): Observable<ClothingItem[]> {
    return this.http.get<ClothingItem[]>(this.baseUrl);
  }

  // Get a single clothing item by ID
  getClothingItem(id: string): Observable<ClothingItem> {
    return this.http.get<ClothingItem>(`${this.baseUrl}/${id}`);
  }

  // Add a new clothing item
  addClothingItem(item: ClothingItem): Observable<ClothingItem> {
    return this.http.post<ClothingItem>(this.baseUrl, item);
  }

  // Update an existing clothing item
  updateClothingItem(id: string, item: ClothingItem): Observable<ClothingItem> {
    return this.http.put<ClothingItem>(`${this.baseUrl}/${id}`, item);
  }

  // Delete a clothing item
  deleteClothingItem(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Add a review to a clothing item
  addReview(itemId: string, review: Review): Observable<ClothingItem> {
    return this.http.post<ClothingItem>(`${this.baseUrl}/${itemId}/reviews`, review);
  }
}