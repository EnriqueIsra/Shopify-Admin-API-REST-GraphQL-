import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopifyGraphql {
  private endpoint = 'http://localhost:3000/graphql';

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
          }
        }
      }
    }
  `;
    return this.query(query);
  }

  createProduct(input: any): Observable<any> {
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
        }
      }
    `;
    return this.http.post(this.endpoint, {query, variables: {id}});
  }
  
}
