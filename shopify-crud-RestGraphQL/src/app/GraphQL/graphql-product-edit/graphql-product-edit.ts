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

    this.form = this.fb.group({
      title: ['', Validators.required],
      descriptionHtml: [''],
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

        this.form.patchValue({
          title: p.title,
          descriptionHtml: p.descriptionHtml,
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

    const input = {
      title: this.form.value.title,
      descriptionHtml: this.form.value.descriptionHtml,
    };

    this.gql.updateProduct(this.id, input).subscribe({
      next: (res) => {
        const errors = res.data?.productUpdate?.userErrors;

        if (errors && errors.length) {
          this.error = errors.map((e: any) => e.message).join(', ');
          this.loading = false;
          return;
        }

        this.router.navigate(['/graphql']);
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }
  cancel() {
    this.router.navigate(['/graphql']);
  }
}
