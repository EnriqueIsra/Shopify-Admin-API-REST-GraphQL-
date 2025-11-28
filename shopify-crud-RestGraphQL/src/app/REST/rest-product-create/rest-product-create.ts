import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ShopifyRest } from '../../services/shopify-rest';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-rest-product-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './rest-product-create.html',
  styleUrl: './rest-product-create.css',
})
export class RestProductCreate {
  loading = false;
  error: string | null = null;

  form!: FormGroup;

  constructor(private fb: FormBuilder, private api: ShopifyRest, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      descriptionHtml: [''],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const { title, descriptionHtml, price } = this.form.value;

    const payload = {
      title,
      body_html: descriptionHtml,
      variants: [{ price: String(price) }],
    };

    console.log("Payload enviado:", JSON.stringify({ product: payload }, null, 2));

    this.api.createProduct({ product: payload }).subscribe({
      next: () => {
        alert('Producto creado correctamente');
        this.loading = false;
        this.router.navigate(['/rest']);
      },
      error: (err) => {
        this.error = err?.message || 'Error al crear';
        this.loading = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/rest']);
  }
}
