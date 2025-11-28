import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-products',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './home-products.html',
})
export class HomeProducts {
  constructor(private router: Router) {}

  goRest() {
    this.router.navigate(['/rest']);
  }
  goGraphql() {
    this.router.navigate(['/graphql']);
  }
  goHome() {
    this.router.navigate(['/']);
  }
}
