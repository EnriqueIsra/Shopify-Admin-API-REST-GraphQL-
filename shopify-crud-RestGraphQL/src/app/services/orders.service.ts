// src/app/services/orders.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../models/orders';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = 'http://localhost:3000/api/rest/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    // pedimos any[] porque el backend devuelve objetos sin el tipado TS
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((orders: any[]) =>
        orders.map((o: any) => {
          // usar el campo formateado si existe, si no fallback a created_at
          const createdFormatted =
            o.created_at_formatted ??
            (o.created_at ? new Date(o.created_at).toLocaleString() : 'Sin fecha');

          // asegurarse que items exista como array
          const items = Array.isArray(o.items) ? o.items : o.line_items ?? [];

          return {
            id: o.id,
            order_number: o.order_number,
            total_price: Number(o.total_price),
            tags: o.tags ?? '',
            financial_status: o.financial_status ?? '',
            created_at: o.created_at ?? null,
            created_at_formatted: createdFormatted,
            customer:
              typeof o.customer === 'string'
                ? o.customer
                : o.customer
                ? `${o.customer.first_name ?? ''} ${o.customer.last_name ?? ''}`.trim()
                : 'Sin cliente',
            total_items:
              typeof o.total_items === 'number'
                ? o.total_items
                : items.reduce((sum: number, i: any) => sum + (Number(i.quantity) || 0), 0),
            items: items.map((item: any) => ({
              title: item.title,
              quantity: Number(item.quantity) || 0,
              price: Number(item.price) || 0,
              sku: item.sku ?? null,
              variant_id: item.variant_id ?? null,
            })),
          } as Order;
        })
      )
    );
  }
  createOrder(order: any): Observable<any> {
    const url = `${this.apiUrl}`; 
    return this.http.post(url, order);
  }
}
