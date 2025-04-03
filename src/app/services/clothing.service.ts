import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClothingService {
  private apiUrl = 'http://localhost:5001/api/clothing'; 

  constructor(private http: HttpClient) {}

  // GET all clothing items
  getAllClothing(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // GET a single clothing item by ID
  getClothingById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // POST a new clothing item
  addClothing(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // PUT update an existing clothing item
  updateClothing(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // DELETE a clothing item
  deleteClothing(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}