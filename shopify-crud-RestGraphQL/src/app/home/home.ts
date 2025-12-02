import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router) {}

  goProducts() {
    this.router.navigate(['/home/products']);
  }
  goGraphql() {
    this.router.navigate(['/orders']);
  }
  goCustomers() {
    this.router.navigate(['/customers']);
  }
}
