import { TestBed } from '@angular/core/testing';

import { ShopifyGraphql } from './shopify-graphql';

describe('ShopifyGraphql', () => {
  let service: ShopifyGraphql;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopifyGraphql);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
