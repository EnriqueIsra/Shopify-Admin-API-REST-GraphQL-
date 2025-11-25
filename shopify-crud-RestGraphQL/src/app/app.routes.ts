import { Routes } from '@angular/router';
import { RestProducts } from './REST/rest-products/rest-products';
import { Home } from './home/home';
import { RestProductCreate } from './REST/rest-product-create/rest-product-create';
import { RestProductEdit } from './REST/rest-product-edit/rest-product-edit';
import { GraphqlProducts } from './GraphQL/graphql-products/graphql-products';
import { GraphqlProductCreate } from './GraphQL/graphql-product-create/graphql-product-create';
import { GraphqlProductEdit } from './GraphQL/graphql-product-edit/graphql-product-edit';

export const routes: Routes = [
  { path: '', component: Home },

  // CRUD REST
  { path: 'rest', component: RestProducts },
  { path: 'rest/create', component: RestProductCreate },
  { path: 'rest/edit/:id', component: RestProductEdit },

  // CRUD GraphQL
  { path: 'graphql', component: GraphqlProducts },
  { path: 'graphql/create', component: GraphqlProductCreate },
  { path: 'graphql/edit/:id', component: GraphqlProductEdit },

  // fallback
  { path: '**', redirectTo: '' }, // opcional
];
