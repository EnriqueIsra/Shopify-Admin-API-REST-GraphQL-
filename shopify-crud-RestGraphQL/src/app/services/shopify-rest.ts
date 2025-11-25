import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopifyRest {
  private api = 'http://localhost:3000/api/rest/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.api}`);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(`${this.api}`, data);
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
