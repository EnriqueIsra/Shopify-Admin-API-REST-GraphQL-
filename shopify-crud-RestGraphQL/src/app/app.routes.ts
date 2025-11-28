import { Routes } from '@angular/router';
import { RestProducts } from './REST/rest-products/rest-products';
import { Home } from './home/home';
import { RestProductCreate } from './REST/rest-product-create/rest-product-create';
import { RestProductEdit } from './REST/rest-product-edit/rest-product-edit';
import { GraphqlProducts } from './GraphQL/graphql-products/graphql-products';
import { GraphqlProductCreate } from './GraphQL/graphql-product-create/graphql-product-create';
import { GraphqlProductEdit } from './GraphQL/graphql-product-edit/graphql-product-edit';
import { HomeProducts } from './home/home-products/home-products';
import { OrdersComponent } from './Orders/orders.component';
import { OrderCreate } from './Orders/order-create/order-create';

export const routes: Routes = [
  { path: '', component: Home },

  // Opciones
  { path: 'home/products', component: HomeProducts },

  // CRUD REST de productos
  { path: 'rest', component: RestProducts },
  { path: 'rest/create', component: RestProductCreate },
  { path: 'rest/edit/:id', component: RestProductEdit },

  // CRUD GraphQL de productos
  { path: 'graphql', component: GraphqlProducts },
  { path: 'graphql/create', component: GraphqlProductCreate },
  { path: 'graphql/edit/:id', component: GraphqlProductEdit },

  // Orders
  { path: 'orders', component: OrdersComponent },
  { path: 'order/create', component: OrderCreate },

  // fallback
  { path: '**', redirectTo: '' }, // opcional
];
