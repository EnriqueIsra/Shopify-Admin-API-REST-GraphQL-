import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ShopifyRest } from '../../services/shopify-rest';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-rest-product-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './rest-product-edit.html'
})
export class RestProductEdit {
  form!: FormGroup;
  loading = false;
  error: string | null = null;
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private api: ShopifyRest,
    private router: Router
  ) {}

  ngOnInit() {
    // Convierte el parámetro string → number
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      title: ['', Validators.required],
      descriptionHtml: ['']
    });

    this.loadProduct();
  }

  loadProduct() {
    this.loading = true;

    this.api.getProduct(this.productId).subscribe({
      next: (res: any) => {
        this.form.patchValue({
          title: res?.product?.title ?? '',
          descriptionHtml: res?.product?.body_html ?? ''
        });

        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar producto';
        this.loading = false;
      }
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const payload = {
      title: this.form.value.title,
      body_html: this.form.value.descriptionHtml
    };

    this.api.updateProduct(this.productId, payload).subscribe({
      next: () => {
        alert('Producto actualizado correctamente');
        this.router.navigate(['/rest']);
      },
      error: () => {
        this.error = 'Error al actualizar';
        this.loading = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/rest']);
  }
}
