import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopifyGraphql } from '../../services/shopify-graphql';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-graphql-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './graphql-products.html',
  styleUrl: './graphql-products.css',
})
export class GraphqlProducts {
  displayedColumns = ['id', 'title', 'description', 'price', 'actions'];
  products: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private gql: ShopifyGraphql, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.error = null;

    this.gql.getProducts().subscribe({
      next: (res) => {
        this.products =
          res.data?.products?.edges?.map((e: any) => {
            const p = e.node;
            const variant = p.variants?.edges?.[0]?.node;
            return {
              ...p,
              price: variant?.price ?? '0.00',
              variantId: variant?.id ?? null,
            };
          }) ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }
  create() {
    this.router.navigate(['/graphql/create']);
  }
  edit(id: any) {
    this.router.navigate(['/graphql/edit', id]);
  }
  delete(id: any) {
    if (!confirm('¿Eliminar producto?')) return;

    this.gql.deleteProduct(id).subscribe({
      next: (res) => {
        const errors = res.data?.productDelete?.userErrors;
        if (errors && errors.length) {
          alert('Error: ' + errors.map((e: any) => e.message).join(', '));
          return;
        }
        this.loadProducts(); // refresca la tabla
        alert('Producto eliminado correctamente');  
      },
      error: (err) => alert('Error al eliminar: ' + err.message),
    });
  }
  goProducts() {
    this.router.navigate(['/home/products']);
  }
}
