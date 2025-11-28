import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './order-create.html',
  styleUrl: './order-create.css',
})
export class OrderCreate {
  // Modelo EXACTO que el backend espera
  order = {
    first_name: '',
    last_name: '',
    variantId: '',
    quantity: 1,
  };

  loading = false;
  createdOrder = false;
  errorMessage = '';

  constructor(private ordersService: OrdersService, private router: Router) {}

  createOrder() {
    if (
      !this.order.first_name ||
      !this.order.last_name ||
      !this.order.variantId ||
      this.order.quantity <= 0
    ) {
      this.errorMessage = 'Todos los campos obligatorios deben estar llenos.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.createdOrder = false;

    this.ordersService.createOrder(this.order).subscribe({
      next: (res) => {
        alert('Pedido creado correctamente');
        this.createdOrder = true;
        this.loading = false;

        setTimeout(() => {
          this.router.navigate(['/orders']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage = 'No se pudo crear la orden.';
        this.loading = false;
      },
    });
  }
}
