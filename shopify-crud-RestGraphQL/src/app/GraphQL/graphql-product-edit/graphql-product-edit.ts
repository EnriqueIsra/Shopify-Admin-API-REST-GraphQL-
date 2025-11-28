import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShopifyGraphql } from '../../services/shopify-graphql';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-graphql-product-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './graphql-product-edit.html',
  styleUrl: './graphql-product-edit.css',
})
export class GraphqlProductEdit {
  id!: string;
  variantId!: string;
  form!: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private gql: ShopifyGraphql,
    public router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    // Formulario (con price)
    this.form = this.fb.group({
      title: ['', Validators.required],
      descriptionHtml: [''],
      price: ['', Validators.required], 
    });

    this.loadProduct();
  }

  loadProduct() {
    this.loading = true;

    this.gql.getProductById(this.id).subscribe({
      next: (res) => {
        const p = res.data?.product;

        if (!p) {
          this.error = 'Producto no encontrado';
          this.loading = false;
          return;
        }
        
        // Extraer variantId y price
        const variantEdge = p.variants?.edges?.[0];
        if (variantEdge) {
          this.variantId = variantEdge.node.id;
        } 

        const price = variantEdge?.node?.price ?? '';

        // rellenar form
        this.form.patchValue({
          title: p.title,
          descriptionHtml: p.descriptionHtml,
          price: price,
        });

        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = null;

    const title = this.form.value.title;
    const description = this.form.value.descriptionHtml;
    const price = String(this.form.value.price);

    this.gql.updateProductWithPrice(this.id, title, description, price, this.variantId)
    .subscribe({
      next: (res) => {
        // Respuesta combinada del backend (productUpdate + variantUpdate)
        const productErrors = 
        (res as any)?.productUpdate?.data?.productUpdate?.userErrors ?? 
        (res as any)?.productUpdate?.userErrors ?? 
        [];
        
        const variantErrors = 
        (res as any)?.variantUpdate?.data?.productVariantsBulkUpdate?.userErrors ?? 
        (res as any)?.variantUpdate?.userErrors ?? 
        [];

        const allErrors = [...productErrors, ...variantErrors];

        if (allErrors.length) {
          this.error = allErrors.map((e: any) => e.message).join(', ');
          this.loading = false;
          return;
        }
        alert('Producto actualizado correctamente');
        this.router.navigate(['/graphql']);
      },
      error: (err) => {
        this.error = err?.message || 'Error al actualizar';
        this.loading = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/graphql']);
  }
}
