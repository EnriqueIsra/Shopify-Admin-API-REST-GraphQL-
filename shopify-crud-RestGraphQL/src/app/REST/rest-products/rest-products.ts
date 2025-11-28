import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShopifyRest } from '../../services/shopify-rest';

@Component({
  selector: 'app-rest-products',
  imports: [
    CommonModule,
    MatCardModule, 
    MatTableModule, 
    MatButtonModule, 
    MatProgressSpinnerModule
  ],
  standalone: true,
  templateUrl: './rest-products.html',
  styleUrl: './rest-products.css',
})
export class RestProducts {
  displayedColumns = ['id', 'title', 'description', 'price', 'actions'];
  products: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private shopifyRest: ShopifyRest, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.error = null;
    this.shopifyRest.getProducts().subscribe({
      next: (res: any) => {
        const raw = res.products ?? res;

        this.products = raw.map((p: any) => ({
          ...p,
          price: p.variants?.[0]?.price ?? '0.00',
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando productos REST', err);
        this.error = err?.message || 'Error al cargar productos';
        this.loading = false;
      },
    });
  }

  goCreate() {
    this.router.navigate(['/rest/create']);
  }

  edit(id: any) {
    this.router.navigate(['/rest/edit', id]);
  }

  deleteProduct(id: any) {
    if (!confirm('¿Eliminar producto?')) return;
    this.shopifyRest.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
        alert('Producto eliminado correctamente');
      },

      error: (err) => alert('Error al eliminar: ' + (err?.message || err)),
    });
  }
  goProducts() {
    this.router.navigate(['/home/products']);
  }
}
