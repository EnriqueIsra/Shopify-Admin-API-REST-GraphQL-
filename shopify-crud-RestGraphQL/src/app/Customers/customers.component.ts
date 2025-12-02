import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  templateUrl: './customers.html',
  styleUrls: ['./customers.css'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
})
export class CustomersComponent implements OnInit {
  displayedColumns = ['id', 'nombre', 'apellido', 'email', 'telefono', 'actions'];
  customers: Customer[] = [];
  loading = false;
  error: string | null = null;
  newCustomer: Customer = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  };

  editing: boolean = false;
  editingCustomerId: number | null = null;

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (res) => {
        console.log('CLIENTES RECIBIDOS: ', res);
        this.customers = res;
      },
      error: (err) => console.error(err),
    });
  }

  saveCustomer(): void {
    if (!this.editing) {
      this.customerService.createCustomer(this.newCustomer).subscribe({
        next: () => {
          this.loadCustomers();
          this.resetForm();
        },
        error: (err) => console.error(err),
      });
    } else {
      this.customerService.updateCustomer(this.editingCustomerId!, this.newCustomer).subscribe({
        next: () => {
          this.loadCustomers();
          this.resetForm();
        },
        error: (err) => console.error(err),
      });
    }
  }

  editCustomer(customer: Customer): void {
    this.editing = true;
    this.editingCustomerId = customer.id!;
    this.newCustomer = { ...customer };
  }

  deleteCustomer(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este cliente?')) return;

    this.customerService.deleteCustomer(id).subscribe({
      next: () => this.loadCustomers(),
      error: (err) => console.error(err),
    });
  }

  resetForm(): void {
    this.newCustomer = { first_name: '', last_name: '', email: '', phone: '' };
    this.editing = false;
    this.editingCustomerId = null;
  }

  addCustomer() {
    this.router.navigate(['/customer/create']);
  }
  goHome() {
    this.router.navigate(['/home']);
  }
}
