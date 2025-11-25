import { Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterOutlet } from "@angular/router";
import { Router } from '@angular/router';



@Component({
  standalone: true, 
  selector: 'app-root',
  imports: [UpperCasePipe, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  mode: 'rest' | 'graphql' | null = null;

  selectMode(tipo: 'rest' | 'graphql') {
    this.mode = tipo;
  }
  constructor(private router: Router) {}

  goRest() {
    this.router.navigate(['/rest']);
  }

  goGraphql() {
    this.router.navigate(['/graphql/products']);
  }
}
