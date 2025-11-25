import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShopifyGraphql } from '../../services/shopify-graphql';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-graphql-product-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './graphql-product-create.html',
  styleUrl: './graphql-product-create.css',
})
export class GraphqlProductCreate {
  loading = false;
  error: string | null = null;

  form!: FormGroup;

  constructor(private fb: FormBuilder, private gql: ShopifyGraphql, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      descriptionHtml: [''],
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

    this.gql.createProduct(input).subscribe({
      next: () => {
        alert('Producto creado correctamente');
        this.loading = false;
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
