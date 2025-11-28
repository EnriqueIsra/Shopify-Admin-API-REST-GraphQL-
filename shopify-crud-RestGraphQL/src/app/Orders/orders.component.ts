// src/app/components/orders/orders.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrdersService } from '../services/orders.service'; 
import { Order } from '../models/orders'; 
import { Observable } from 'rxjs';
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatCardTitle } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.html',
  styleUrl: './orders.css',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatCard,
    MatCardTitle,
    MatCardContent
]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private router: Router, private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.loading = true;
    this.ordersService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener órdenes:', err);
        this.error = 'No se pudieron cargar las órdenes.';
        this.loading = false;
      }
    });
  }
  goHome() {
    this.router.navigate(['/']);
  }
  goCreate() {
    this.router.navigate(['/order/create']);
  }
}
