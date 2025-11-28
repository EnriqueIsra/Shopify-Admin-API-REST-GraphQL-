import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopifyGraphql {
  private endpoint = 'http://localhost:3000/graphql';
  private apiCreate = 'http://localhost:3000/api/graphql/products';

  constructor(private http: HttpClient) {}

  query(query: string, variables?: any): Observable<any> {
    return this.http.post(this.endpoint, { query, variables });
  }

  getProducts(): Observable<any> {
    const query = `
    query {
      products(first: 20) {
        edges {
          node {
            id
            title
            descriptionHtml
            variants(first: 1) {
              edges {
                node {
                  id
                  price
                }
              }
            }
          }
        }
      }
    }
  `;
    return this.query(query);
  }

  /* createProduct(input: any): Observable<any> {
    const mutation = `
    mutation($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
          title
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
    // Endpoint proxy que recibe { query, variables }
    return this.query(mutation, { input });
  } */

  createProductWithPrice(title: string, description: string, price: string): Observable<any> {
    return this.http.post(this.apiCreate, { title, description, price });
  }

  updateProduct(id: string, input: any): Observable<any> {
    const mutation = `
    mutation($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
          title
          descriptionHtml
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

    return this.query(mutation, { input: { id, ...input } });
  }

  // PUT proxy para actualizar producto + precio
  updateProductWithPrice(
    productId: string,
    title: string,
    description: string,
    price: string,
    variantId: string
  ) {
    const url = `http://localhost:3000/api/graphql/products/${encodeURIComponent(productId)}`;
    return this.http.put(url, { title, description, price, variantId });
  }

  deleteProduct(id: string): Observable<any> {
    const mutation = `
    mutation($id: ID!) {
      productDelete(input: { id: $id }) {
        deletedProductId
        userErrors {
          field
          message
        }
      }
    }
  `;
    return this.query(mutation, { id });
  }

  getProductById(id: string): Observable<any> {
    const query = `
      query GetProduct($id: ID!) {
        product(id: $id) {
          id
          title
          descriptionHtml
          variants(first: 1){
            edges {
              node {
                id
                price
              }
            }
          }
        }
      }
    `;
    return this.http.post(this.endpoint, { query, variables: { id } });
  }
}
